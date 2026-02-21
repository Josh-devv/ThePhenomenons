using EClinic.Api.Models;

namespace EClinic.Api.Services.Interfaces;

public interface ICheckInService
{
    Task<CheckInSession> StartAsync(string patientId);
    Task<string> SendMessageAsync(int sessionId, string patientId, string text);
    Task<AIReport> SubmitAsync(int sessionId, string patientId);
}