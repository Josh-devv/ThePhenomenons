using EClinic.Api.Models;

namespace EClinic.Api.DTOs;

public class CreateConsultationDto
{
    public int SessionId { get; set; }
    public SeverityLevel Severity { get; set; }
    public string? Notes { get; set; }
    public FollowUpFrequency FollowUpFrequency { get; set; }
    public List<PlanItemDto> PlanItems { get; set; } = new();
}

public class PlanItemDto
{
    public string Title { get; set; } = default!;
    public string? Description { get; set; }
}