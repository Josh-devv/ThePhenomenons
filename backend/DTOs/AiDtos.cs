namespace EClinic.Api.DTOs;

public class AiChatRequest
{
    public int SessionId { get; set; }
    public string PatientId { get; set; } = default!;
    public List<AiChatMessage> Messages { get; set; } = new();
}

public class AiChatMessage
{
    public string Role { get; set; } = default!; // "patient" | "ai" | "system"
    public string Content { get; set; } = default!;
    public DateTime? TimestampUtc { get; set; }
}

public class AiChatResponse
{
    public string Reply { get; set; } = default!;
}

public class AiReportRequest
{
    public int SessionId { get; set; }
    public string PatientId { get; set; } = default!;
    public List<AiChatMessage> Messages { get; set; } = new();
}

public class AiReportResponse
{
    public string Summary { get; set; } = default!;
    public List<string>? Symptoms { get; set; }
    public List<string>? Triggers { get; set; }
}

public class AiFollowUpRequest
{
    public string PatientId { get; set; } = default!;
    public string? DoctorNotes { get; set; }
    public List<string>? PlanItems { get; set; }
    public string? LastPatientUpdate { get; set; }
}

public class AiFollowUpResponse
{
    public string Prompt { get; set; } = default!;
    public string? Reply { get; set; } // optional for respond endpoint
}