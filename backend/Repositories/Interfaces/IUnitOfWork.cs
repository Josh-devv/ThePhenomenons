using EClinic.Api.Models;

namespace EClinic.Api.Repositories.Interfaces;

public interface IUnitOfWork
{
    IGenericRepository<CheckInSession> CheckIns { get; }
    IGenericRepository<ChatMessage> ChatMessages { get; }
    IGenericRepository<AIReport> Reports { get; }
    IGenericRepository<Consultation> Consultations { get; }
    IGenericRepository<PreventivePlanItem> PlanItems { get; }
    IGenericRepository<FollowUpTask> FollowUps { get; }

    Task<int> SaveAsync();
}