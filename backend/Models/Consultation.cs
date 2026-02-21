namespace EClinic.Api.Models;

public class Consultation
{
    public int Id { get; set; }
    public int CheckInSessionId { get; set; }

    public string ProfessionalId { get; set; } = default!;
    public ConsultationStatus Status { get; set; } = ConsultationStatus.Open;

    // Doctor decides this (no AI risk scoring)
    public SeverityLevel Severity { get; set; } = SeverityLevel.NotSet;

    public string? Notes { get; set; }
    public FollowUpFrequency FollowUpFrequency { get; set; } = FollowUpFrequency.Daily;

    public DateTime CreatedAtUtc { get; set; } = DateTime.UtcNow;
    public DateTime? EndedAtUtc { get; set; }

    public List<PreventivePlanItem> PlanItems { get; set; } = new();
}