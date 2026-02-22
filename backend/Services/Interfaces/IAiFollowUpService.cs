namespace EClinic.Api.Services.Interfaces;

public interface IAiFollowUpService
{
    /// <summary>
    /// Returns the next AI follow-up prompt if any follow-up task is due now.
    /// </summary>
    Task<object> GetNextPromptAsync(string patientId);

    /// <summary>
    /// Patient responds to a due follow-up task; AI replies and the task is marked done.
    /// </summary>
    Task<object> RespondAsync(string patientId, int followUpTaskId, string text);
}