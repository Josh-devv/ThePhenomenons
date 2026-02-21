import { AlertTriangle, Bell, Clock } from "lucide-react";
import { RiskBadge } from "@/components/RiskBadge";

const alerts = [
  {
    patient: "Michael Chen",
    type: "Vital Signs Alert",
    message: "Blood pressure reading 160/100 mmHg — significantly above target range. Three consecutive elevated readings in past week.",
    time: "30 minutes ago",
    risk: "high" as const,
    unread: true,
  },
  {
    patient: "Lisa Thompson",
    type: "Missed Check-ins",
    message: "Patient has missed 3 consecutive daily check-ins. Last known symptoms included increasing pain levels.",
    time: "2 hours ago",
    risk: "high" as const,
    unread: true,
  },
  {
    patient: "Robert Wilson",
    type: "Symptom Escalation",
    message: "Reported symptoms have escalated from mild to moderate. AI risk score increased from 70 to 55.",
    time: "5 hours ago",
    risk: "moderate" as const,
    unread: false,
  },
  {
    patient: "Anna Kowalski",
    type: "Medication Adherence",
    message: "Medication adherence dropped below 60%. Patient reported side effects in last check-in.",
    time: "Yesterday",
    risk: "moderate" as const,
    unread: false,
  },
  {
    patient: "Emily Davis",
    type: "Plan Completion",
    message: "Patient has completed 90% of current preventive plan milestones. Ready for plan review and update.",
    time: "Yesterday",
    risk: "low" as const,
    unread: false,
  },
];

export default function ProfessionalAlerts() {
  return (
    <div className="animate-fade-in">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-foreground">Alerts</h1>
          <p className="mt-1 text-body-lg text-muted-foreground">High-risk notifications requiring attention</p>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-destructive/10 px-4 py-2 text-small font-medium text-destructive">
          <Bell className="h-4 w-4" />
          {alerts.filter(a => a.unread).length} unread
        </div>
      </div>

      <div className="space-y-4">
        {alerts.map((alert, i) => (
          <div
            key={i}
            className={`rounded-xl bg-card p-6 shadow-card transition-all ${
              alert.unread ? "border-l-4 border-l-destructive" : ""
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className={`mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                  alert.risk === "high" ? "bg-destructive/10" : alert.risk === "moderate" ? "bg-warning/10" : "bg-success/10"
                }`}>
                  <AlertTriangle className={`h-5 w-5 ${
                    alert.risk === "high" ? "text-destructive" : alert.risk === "moderate" ? "text-warning" : "text-success"
                  }`} />
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-[16px] font-semibold text-foreground">{alert.patient}</h3>
                    <RiskBadge level={alert.risk} />
                    {alert.unread && (
                      <span className="h-2 w-2 rounded-full bg-destructive" />
                    )}
                  </div>
                  <p className="mt-0.5 text-small font-medium text-muted-foreground">{alert.type}</p>
                  <p className="mt-2 text-body text-muted-foreground">{alert.message}</p>
                  <div className="mt-3 flex items-center gap-2 text-small text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {alert.time}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 flex gap-3 pl-14">
              <button className="rounded-lg bg-primary px-4 py-2 text-small font-medium text-primary-foreground hover:bg-primary/90">
                Take Action
              </button>
              <button className="rounded-lg border border-border px-4 py-2 text-small font-medium text-foreground hover:bg-muted">
                View Patient
              </button>
              {alert.unread && (
                <button className="rounded-lg px-4 py-2 text-small font-medium text-muted-foreground hover:text-foreground">
                  Mark as Read
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
