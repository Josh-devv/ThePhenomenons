import { Activity, ClipboardList, Shield, TrendingUp } from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { RiskBadge } from "@/components/RiskBadge";

const recentCheckins = [
  { date: "Today", symptoms: "Mild headache, fatigue", risk: "low" as const },
  { date: "Yesterday", symptoms: "No symptoms reported", risk: "low" as const },
  {
    date: "Feb 19",
    symptoms: "Joint pain, low energy",
    risk: "moderate" as const,
  },
];

const upcomingTasks = [
  { task: "Complete daily check-in", time: "Now", priority: "high" },
  {
    task: "Review preventive plan updates",
    time: "2:00 PM",
    priority: "medium",
  },
  { task: "Schedule follow-up appointment", time: "Tomorrow", priority: "low" },
];

export default function PatientDashboard() {
  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-foreground">Good morning, Sarah 👋</h1>
        <p className="mt-1 text-body-lg text-muted-foreground">
          Here's your health overview for today.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Health Score"
          value="85"
          icon={Activity}
          trend="5% from last week"
          trendUp
          className="bg-primary/5 shadow-lg hover:shadow-xl transition-shadow"
        />
        <StatCard
          title="Check-in Streak"
          value="12 days"
          icon={ClipboardList}
          className="bg-primary/5 shadow-lg hover:shadow-xl transition-shadow"
        />
        <StatCard
          title="Risk Level"
          value="Low"
          icon={Shield}
          trend="Stable"
          trendUp
          className="bg-primary/5 shadow-lg hover:shadow-xl transition-shadow"
        />
        <StatCard
          title="Plan Progress"
          value="67%"
          icon={TrendingUp}
          trend="On track"
          trendUp
          className="bg-primary/5 shadow-lg hover:shadow-xl transition-shadow"
        />
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        {/* Recent Check-ins */}
        <div className="rounded-xl bg-card p-6 shadow-card">
          <h3 className="text-foreground">Recent Check-ins</h3>
          <div className="mt-4 space-y-3">
            {recentCheckins.map((checkin, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-lg border border-border p-4"
              >
                <div>
                  <p className="text-body font-medium text-foreground">
                    {checkin.date}
                  </p>
                  <p className="mt-0.5 text-small text-muted-foreground">
                    {checkin.symptoms}
                  </p>
                </div>
                <RiskBadge level={checkin.risk} />
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Tasks */}
        <div className="rounded-xl bg-card p-6 shadow-card">
          <h3 className="text-foreground">Upcoming Tasks</h3>
          <div className="mt-4 space-y-3">
            {upcomingTasks.map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-lg border border-border p-4"
              >
                <div>
                  <p className="text-body font-medium text-foreground">
                    {item.task}
                  </p>
                  <p className="mt-0.5 text-small text-muted-foreground">
                    {item.time}
                  </p>
                </div>
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-small font-medium ${
                    item.priority === "high"
                      ? "bg-destructive/10 text-destructive"
                      : item.priority === "medium"
                        ? "bg-warning/10 text-warning"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {item.priority}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
