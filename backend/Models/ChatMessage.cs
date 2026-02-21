namespace EClinic.Api.Models;

public class ChatMessage
{
    public int Id { get; set; }
    public int CheckInSessionId { get; set; }

    public string Sender { get; set; } = default!; // "Patient" | "AI"
    public string Text { get; set; } = default!;
    public DateTime CreatedAtUtc { get; set; } = DateTime.UtcNow;
}