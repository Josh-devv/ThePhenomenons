using EClinic.Api.Data;
using EClinic.Api.Models;
using EClinic.Api.Repositories.Interfaces;

namespace EClinic.Api.Repositories.Implementations;

public class UnitOfWork : IUnitOfWork
{
    private readonly AppDbContext _db;

    public UnitOfWork(AppDbContext db)
    {
        _db = db;
        CheckIns = new GenericRepository<CheckInSession>(_db);
        ChatMessages = new GenericRepository<ChatMessage>(_db);
        Reports = new GenericRepository<AIReport>(_db);
        Consultations = new GenericRepository<Consultation>(_db);
        PlanItems = new GenericRepository<PreventivePlanItem>(_db);
        FollowUps = new GenericRepository<FollowUpTask>(_db);
    }

    public IGenericRepository<CheckInSession> CheckIns { get; }
    public IGenericRepository<ChatMessage> ChatMessages { get; }
    public IGenericRepository<AIReport> Reports { get; }
    public IGenericRepository<Consultation> Consultations { get; }
    public IGenericRepository<PreventivePlanItem> PlanItems { get; }
    public IGenericRepository<FollowUpTask> FollowUps { get; }

    public Task<int> SaveAsync() => _db.SaveChangesAsync();
}