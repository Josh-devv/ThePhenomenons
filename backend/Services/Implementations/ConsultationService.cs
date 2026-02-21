using EClinic.Api.DTOs;
using EClinic.Api.Models;
using EClinic.Api.Repositories.Interfaces;
using EClinic.Api.Services.Interfaces;

namespace EClinic.Api.Services.Implementations;

public class ConsultationService : IConsultationService
{
    private readonly IUnitOfWork _uow;

    public ConsultationService(IUnitOfWork uow) => _uow = uow;

    public async Task<Consultation> CreateAsync(CreateConsultationDto dto, string professionalId)
    {
        var consultation = new Consultation
        {
            CheckInSessionId = dto.SessionId,
            ProfessionalId = professionalId,
            Severity = dto.Severity,
            Notes = dto.Notes,
            FollowUpFrequency = dto.FollowUpFrequency,
            PlanItems = dto.PlanItems.Select(p => new PreventivePlanItem
            {
                Title = p.Title,
                Description = p.Description
            }).ToList()
        };

        await _uow.Consultations.AddAsync(consultation);
        await _uow.SaveAsync();
        return consultation;
    }

    public async Task EndSessionAsync(int consultationId, string professionalId)
    {
        var consult = await _uow.Consultations.GetByIdAsync(consultationId)
            ?? throw new InvalidOperationException("Consultation not found.");

        if (consult.ProfessionalId != professionalId) throw new UnauthorizedAccessException();

        consult.Status = ConsultationStatus.Closed;
        consult.EndedAtUtc = DateTime.UtcNow;
        _uow.Consultations.Update(consult);

        // Create follow-up tasks for next 7 days (hackathon-friendly)
        var dueDates = consult.FollowUpFrequency switch
        {
            FollowUpFrequency.Daily => Enumerable.Range(1, 7).Select(d => DateTime.UtcNow.Date.AddDays(d)),
            FollowUpFrequency.Every2Days => new[] { 2, 4, 6 }.Select(d => DateTime.UtcNow.Date.AddDays(d)),
            FollowUpFrequency.Weekly => new[] { DateTime.UtcNow.Date.AddDays(7) },
            _ => Enumerable.Range(1, 7).Select(d => DateTime.UtcNow.Date.AddDays(d))
        };

        // NOTE: patientId is not stored on Consultation; easiest is to fetch session
        var session = await _uow.CheckIns.GetByIdAsync(consult.CheckInSessionId)
            ?? throw new InvalidOperationException("Session not found.");

        foreach (var due in dueDates)
        {
            await _uow.FollowUps.AddAsync(new FollowUpTask
            {
                ConsultationId = consult.Id,
                PatientId = session.PatientId,
                DueAtUtc = due
            });
        }

        await _uow.SaveAsync();
    }
}