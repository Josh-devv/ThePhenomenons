using EClinic.Api.Models;
using EClinic.Api.Repositories.Interfaces;
using EClinic.Api.Services.Interfaces;
using System.Text.Json;
using System.Net.Http.Json; // Required for ReadFromJsonAsync

namespace EClinic.Api.Services.Implementations;

public class CheckInService : ICheckInService
{
    private readonly IUnitOfWork _uow;
    private readonly IHttpClientFactory _httpClientFactory;

    // Set this to your Python developer's IP address and Port
    private readonly string _pythonAiBaseUrl = "http://192.168.x.x:8000";

    public CheckInService(IUnitOfWork uow, IHttpClientFactory httpClientFactory)
    {
        _uow = uow;
        _httpClientFactory = httpClientFactory;
    }

    public async Task<CheckInSession> StartAsync(string patientId)
    {
        var session = new CheckInSession { PatientId = patientId, Status = SessionStatus.Active };
        await _uow.CheckIns.AddAsync(session);
        await _uow.SaveAsync();
        return session;
    }

    public async Task<string> SendMessageAsync(int sessionId, string patientId, string text)
    {
        var session = await _uow.CheckIns.GetByIdAsync(sessionId)
            ?? throw new InvalidOperationException("Session not found.");

        if (session.PatientId != patientId) throw new UnauthorizedAccessException();

        // 1. Save patient message
        await _uow.ChatMessages.AddAsync(new ChatMessage
        {
            CheckInSessionId = sessionId,
            Sender = "Patient",
            Text = text
        });

        // 2. Call the Python AI API (/chat)
        using var client = _httpClientFactory.CreateClient();
        var aiRequest = new { user_id = patientId, message = text };

        var response = await client.PostAsJsonAsync($"{_pythonAiBaseUrl}/chat", aiRequest);
        response.EnsureSuccessStatusCode(); // Will throw if Python returns 500 or 404

        // Extract the reply string from the JSON response
        var aiResponseData = await response.Content.ReadFromJsonAsync<AiChatResponse>();
        var aiReply = aiResponseData?.Reply ?? "I'm having trouble connecting to my cognitive core.";

        // 3. Save AI message
        await _uow.ChatMessages.AddAsync(new ChatMessage
        {
            CheckInSessionId = sessionId,
            Sender = "AI",
            Text = aiReply
        });

        await _uow.SaveAsync();
        return aiReply;
    }

    public async Task<AIReport> SubmitAsync(int sessionId, string patientId)
    {
        var session = await _uow.CheckIns.GetByIdAsync(sessionId)
            ?? throw new InvalidOperationException("Session not found.");

        if (session.PatientId != patientId) throw new UnauthorizedAccessException();

        session.Status = SessionStatus.Submitted;
        session.SubmittedAtUtc = DateTime.UtcNow;
        _uow.CheckIns.Update(session);

        // Call the Python AI API (/report) to get the final generated data
        using var client = _httpClientFactory.CreateClient();
        var reportRequest = new { user_id = patientId };

        var response = await client.PostAsJsonAsync($"{_pythonAiBaseUrl}/report", reportRequest);
        response.EnsureSuccessStatusCode();

        var aiReportData = await response.Content.ReadFromJsonAsync<AiReportResponse>();

        // Create the actual report using the data from Python
        var report = new AIReport
        {
            CheckInSessionId = sessionId,
            Summary = aiReportData?.Summary ?? "Summary unavailable.",
            SymptomsJson = JsonSerializer.Serialize(aiReportData?.Symptoms ?? new List<string>()),
            TriggersJson = JsonSerializer.Serialize(aiReportData?.Triggers ?? new List<string>())
        };

        await _uow.Reports.AddAsync(report);
        await _uow.SaveAsync();

        return report;
    }

    // Private classes to deserialize the Python JSON responses cleanly
    private class AiChatResponse { public string Reply { get; set; } }
    private class AiReportResponse
    {
        public string Summary { get; set; }
        public List<string> Symptoms { get; set; }
        public List<string> Triggers { get; set; }
    }
}