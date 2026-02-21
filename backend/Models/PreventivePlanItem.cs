namespace EClinic.Api.Models;

public class PreventivePlanItem
{
    public int Id { get; set; }
    public int ConsultationId { get; set; }

    public string Title { get; set; } = default!;
    public string? Description { get; set; }

    public bool IsCompleted { get; set; } = false;
    public DateTime? CompletedAtUtc { get; set; }
}