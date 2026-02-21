using EClinic.Api.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Reflection.Emit;

namespace EClinic.Api.Data;

public class AppDbContext : IdentityDbContext<ApplicationUser>
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<CheckInSession> CheckInSessions => Set<CheckInSession>();
    public DbSet<ChatMessage> ChatMessages => Set<ChatMessage>();
    public DbSet<AIReport> AIReports => Set<AIReport>();
    public DbSet<Consultation> Consultations => Set<Consultation>();
    public DbSet<PreventivePlanItem> PreventivePlanItems => Set<PreventivePlanItem>();
    public DbSet<FollowUpTask> FollowUpTasks => Set<FollowUpTask>();

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<CheckInSession>()
            .HasOne(s => s.Report)
            .WithOne()
            .HasForeignKey<AIReport>(r => r.CheckInSessionId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.Entity<CheckInSession>()
            .HasOne(s => s.Consultation)
            .WithOne()
            .HasForeignKey<Consultation>(c => c.CheckInSessionId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.Entity<ChatMessage>()
            .HasIndex(m => new { m.CheckInSessionId, m.CreatedAtUtc });

        builder.Entity<FollowUpTask>()
            .HasIndex(f => new { f.PatientId, f.DueAtUtc });
    }
}