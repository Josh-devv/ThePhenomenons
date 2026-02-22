using EClinic.Api.DTOs;
using EClinic.Api.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace EClinic.Api.Controllers;

[ApiController]
[Route("api/patient/checkins")]
// [Authorize] removed for rapid testing
public class PatientCheckInsController : ControllerBase
{
    private readonly ICheckInService _checkIn;

    public PatientCheckInsController(ICheckInService checkIn) => _checkIn = checkIn;

    [HttpPost("start")]
    public async Task<IActionResult> Start([FromBody] string patientId)
    {
        // Frontend sends the ID directly now since we aren't using Claims
        var session = await _checkIn.StartAsync(patientId);
        return Ok(new { sessionId = session.Id });
    }

    [HttpPost("{sessionId:int}/message")]
    public async Task<IActionResult> Message(int sessionId, [FromBody] SendMessageDto dto)
    {
        // dto.PatientId will now be recognized by the compiler
        var reply = await _checkIn.SendMessageAsync(sessionId, dto.PatientId, dto.Text);
        return Ok(new { reply });
    }

    [HttpPost("{sessionId:int}/submit")]
    public async Task<IActionResult> Submit(int sessionId, [FromQuery] string patientId)
    {
        var report = await _checkIn.SubmitAsync(sessionId, patientId);
        return Ok(report);
    }
}