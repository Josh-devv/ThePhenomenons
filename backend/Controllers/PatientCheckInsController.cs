using System.Security.Claims;
using EClinic.Api.DTOs;
using EClinic.Api.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EClinic.Api.Controllers;

[ApiController]
[Route("api/patient/checkins")]
[Authorize(Roles = "Patient")]
public class PatientCheckInsController : ControllerBase
{
    private readonly ICheckInService _checkIn;

    public PatientCheckInsController(ICheckInService checkIn) => _checkIn = checkIn;

    private string UserId => User.FindFirstValue(ClaimTypes.NameIdentifier)!;

    [HttpPost("start")]
    public async Task<IActionResult> Start()
    {
        var session = await _checkIn.StartAsync(UserId);
        return Ok(new { sessionId = session.Id });
    }

    [HttpPost("{sessionId:int}/message")]
    public async Task<IActionResult> Message(int sessionId, [FromBody] SendMessageDto dto)
    {
        var reply = await _checkIn.SendMessageAsync(sessionId, UserId, dto.Text);
        return Ok(new { reply });
    }

    [HttpPost("{sessionId:int}/submit")]
    public async Task<IActionResult> Submit(int sessionId)
    {
        var report = await _checkIn.SubmitAsync(sessionId, UserId);
        return Ok(report);
    }
}