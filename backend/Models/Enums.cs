namespace EClinic.Api.Models;

public enum SessionStatus { Active, Submitted, Closed }
public enum ConsultationStatus { Open, Closed }

public enum SeverityLevel
{
    NotSet = 0,
    Mild = 1,
    Moderate = 2,
    CloseMonitoring = 3,
    UrgentFollowUp = 4
}

public enum FollowUpFrequency { Daily, Every2Days, Weekly }