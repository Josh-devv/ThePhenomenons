namespace EClinic.Api.Models;

public class CheckInSession
{
    public int Id { get; set; }
    public string PatientId { get; set; } = default!;
    public SessionStatus Status { get; set; } = SessionStatus.Active;

    public DateTime CreatedAtUtc { get; set; } = DateTime.UtcNow;
    public DateTime? SubmittedAtUtc { get; set; }
    public DateTime? ClosedAtUtc { get; set; }

    // For “AI noticed worsening—doctor should review”
    public bool EscalationFlag { get; set; } = false;

    public List<ChatMessage> Messages { get; set; } = new();
    public AIReport? Report { get; set; }
    public Consultation? Consultation { get; set; }
}