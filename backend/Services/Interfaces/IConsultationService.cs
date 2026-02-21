using EClinic.Api.DTOs;
using EClinic.Api.Models;

namespace EClinic.Api.Services.Interfaces;

public interface IConsultationService
{
    Task<Consultation> CreateAsync(CreateConsultationDto dto, string professionalId);
    Task EndSessionAsync(int consultationId, string professionalId);
}