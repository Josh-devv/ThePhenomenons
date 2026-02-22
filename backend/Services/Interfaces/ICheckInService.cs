using EClinic.Api.Models;

namespace EClinic.Api.Services.Interfaces;

public interface ICheckInService
{
    Task<CheckInSession> StartAsync(string patientId);

    // Sends a message to FastAPI and returns the AI response string
    Task<string> SendMessageAsync(int sessionId, string patientId, string text);

    // Finalizes the session and generates the AI Report for the professional
    Task<AIReport> SubmitAsync(int sessionId, string patientId);
}