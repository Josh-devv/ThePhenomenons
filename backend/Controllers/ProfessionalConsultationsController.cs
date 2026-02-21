using System.Security.Claims;
using EClinic.Api.DTOs;
using EClinic.Api.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EClinic.Api.Controllers;

[ApiController]
[Route("api/professional/consultations")]
[Authorize(Roles = "Professional")]
public class ProfessionalConsultationsController : ControllerBase
{
    private readonly IConsultationService _consultations;

    public ProfessionalConsultationsController(IConsultationService consultations)
        => _consultations = consultations;

    private string UserId => User.FindFirstValue(ClaimTypes.NameIdentifier)!;

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateConsultationDto dto)
    {
        var c = await _consultations.CreateAsync(dto, UserId);
        return Ok(c);
    }



    [HttpPost("{consultationId:int}/end")]
    public async Task<IActionResult> End(int consultationId)
    {
        await _consultations.EndSessionAsync(consultationId, UserId);
        return Ok(new { message = "Session ended and follow-ups scheduled." });
    }
}