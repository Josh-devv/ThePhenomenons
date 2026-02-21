namespace EClinic.Api.Models;

public class AIReport
{
    public int Id { get; set; }
    public int CheckInSessionId { get; set; }

    public string Summary { get; set; } = default!;
    public string? SymptomsJson { get; set; }
    public string? TriggersJson { get; set; }
    public DateTime GeneratedAtUtc { get; set; } = DateTime.UtcNow;
}