namespace EClinic.Api.Models;

public enum SessionStatus
{
    Active,
    Submitted,
    Closed
}

public enum ConsultationStatus
{
    Open,
    Closed
}

public enum SeverityLevel
{
    NotSet,
    Mild,
    Moderate,
    CloseMonitoring,
    UrgentFollowUp
}

public enum FollowUpFrequency
{
    Daily,
    Every2Days,
    Weekly
}