namespace EClinic.Api.Models;

public class FollowUpTask
{
    public int Id { get; set; }
    public int ConsultationId { get; set; }

    public string PatientId { get; set; } = default!;
    public DateTime DueAtUtc { get; set; }

    public bool IsDone { get; set; } = false;
    public string? OutcomeNote { get; set; }
}