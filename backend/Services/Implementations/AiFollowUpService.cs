using EClinic.Api.Repositories.Interfaces;
using EClinic.Api.Services.Interfaces;
using EClinic.Api.DTOs;

namespace EClinic.Api.Services.Implementations;

public class AiFollowUpService : IAiFollowUpService
{
    private readonly IUnitOfWork _uow;
    private readonly IAiClient _ai;

    public AiFollowUpService(IUnitOfWork uow, IAiClient ai)
    {
        _uow = uow;
        _ai = ai;
    }

    public async Task<object> GetNextPromptAsync(string patientId)
    {
        var now = DateTime.UtcNow;
        var tasks = await _uow.FollowUps.FindAsync(f => f.PatientId == patientId && !f.IsDone && f.DueAtUtc <= now);
        var next = tasks.OrderBy(t => t.DueAtUtc).FirstOrDefault();

        if (next == null)
            return new { hasFollowUp = false, message = "No follow-up due right now." };

        // Pull latest consultation plan for context
        var consult = (await _uow.Consultations.FindAsync(c => c.Id == next.ConsultationId)).FirstOrDefault();
        var planItems = consult == null ? new List<string>() :
            (await _uow.PlanItems.FindAsync(p => p.ConsultationId == consult.Id))
            .Select(p => p.Title).ToList();

        string prompt;
        try
        {
            var res = await _ai.NextFollowUpPromptAsync(new AiFollowUpRequest
            {
                PatientId = patientId,
                DoctorNotes = consult?.Notes,
                PlanItems = planItems
            });
            prompt = res.Prompt;
        }
        catch
        {
            prompt = "Hi 😊 Quick check-in: did you follow the doctor’s plan today? How do you feel now?";
        }

        return new { hasFollowUp = true, followUpTaskId = next.Id, dueAtUtc = next.DueAtUtc, prompt };
    }

    public async Task<object> RespondAsync(string patientId, int followUpTaskId, string text)
    {
        var task = await _uow.FollowUps.GetByIdAsync(followUpTaskId)
            ?? throw new InvalidOperationException("Follow-up task not found.");

        if (task.PatientId != patientId)
            throw new UnauthorizedAccessException("Not your follow-up.");

        string reply;
        try
        {
            var res = await _ai.FollowUpRespondAsync(new AiFollowUpRequest
            {
                PatientId = patientId,
                LastPatientUpdate = text
            });
            reply = res.Reply ?? "Thanks for the update. Keep following the plan.";
        }
        catch
        {
            reply = "Thanks for sharing. Keep following the plan—I'll check on you again.";
        }

        task.IsDone = true;
        task.OutcomeNote = $"Patient: {text} | AI: {reply}";
        _uow.FollowUps.Update(task);
        await _uow.SaveAsync();

        return new { reply, completed = true };
    }
}