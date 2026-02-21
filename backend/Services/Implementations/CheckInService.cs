using EClinic.Api.Models;
using EClinic.Api.Repositories.Interfaces;
using EClinic.Api.Services.Interfaces;
using System.Text.Json;

namespace EClinic.Api.Services.Implementations;

public class CheckInService : ICheckInService
{
    private readonly IUnitOfWork _uow;

    public CheckInService(IUnitOfWork uow)
    {
        _uow = uow;
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

        // Save patient message
        await _uow.ChatMessages.AddAsync(new ChatMessage
        {
            CheckInSessionId = sessionId,
            Sender = "Patient",
            Text = text
        });

        // ✅ TEMP: until your colleague’s Python API is ready
        // Later: call IAiClient.SendAsync(...)
        var aiReply = "Thanks for sharing. Can you tell me what symptoms you noticed today?";

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

        // ✅ TEMP summary until Python report endpoint is ready
        var report = new AIReport
        {
            CheckInSessionId = sessionId,
            Summary = "Patient reported feeling unwell today. Symptoms/triggers captured in chat. Professional review recommended.",
            SymptomsJson = JsonSerializer.Serialize(new[] { "unspecified" }),
            TriggersJson = JsonSerializer.Serialize(new[] { "unspecified" })
        };

        await _uow.Reports.AddAsync(report);
        await _uow.SaveAsync();

        return report;
    }
}