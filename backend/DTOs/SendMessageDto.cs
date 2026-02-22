namespace EClinic.Api.DTOs;

public class SendMessageDto
{
    public string PatientId { get; set; } = string.Empty; 
    public string Text { get; set; } = default!;
}