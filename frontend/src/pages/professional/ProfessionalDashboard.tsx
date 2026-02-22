import { Users, FileText, AlertTriangle, TrendingUp, Star } from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { RiskBadge } from "@/components/RiskBadge";
import { useAuth } from "@/contexts/AuthContext";

const recentPatients = [
  {
    name: "Sarah Johnson",
    age: 36,
    lastCheckin: "Today",
    risk: "low" as const,
    status: "Active",
  },
];

const pendingReports = [
  {
    patient: "Michael Chen",
    type: "Risk Assessment",
    generated: "2 hours ago",
    risk: "high" as const,
  },
];

export default function ProfessionalDashboard() {
  const { user } = useAuth();

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-foreground">Dashboard</h1>
        <p className="mt-1 text-body-lg text-muted-foreground">
          Welcome back, Dr. {user?.name || "Chen"}
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Patients"
          value={148}
          icon={Users}
          trend="12 new this month"
          trendUp
          className="bg-primary/5 shadow-lg hover:shadow-xl transition-shadow"
        />
        <StatCard
          title="Pending Reviews"
          value={8}
          icon={FileText}
          trend="Needs attention"
          className="bg-primary/5 shadow-lg hover:shadow-xl transition-shadow"
        />
        <StatCard
          title="New Reviews"
          value={14}
          icon={Star}
          trend="Submitted recently"
          className="bg-primary/5 shadow-lg hover:shadow-xl transition-shadow"
        />
        <StatCard
          title="Plans Active"
          value={92}
          icon={TrendingUp}
          trend="85% adherence"
          trendUp
          className="bg-primary/5 shadow-lg hover:shadow-xl transition-shadow"
        />
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        {/* Recent Patients */}
        <div className="rounded-xl bg-card p-6 shadow-card lg:col-span-2">
          <h3 className="text-foreground">Recent Patient Activity</h3>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="pb-3 text-left text-small font-medium text-muted-foreground">
                    Patient
                  </th>
                  <th className="pb-3 text-left text-small font-medium text-muted-foreground">
                    Age
                  </th>
                  <th className="pb-3 text-left text-small font-medium text-muted-foreground">
                    Last Check-in
                  </th>
                  <th className="pb-3 text-left text-small font-medium text-muted-foreground">
                    Risk
                  </th>
                  <th className="pb-3 text-left text-small font-medium text-muted-foreground">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentPatients.map((patient, i) => (
                  <tr key={i} className="border-b border-border last:border-0">
                    <td className="py-3 text-body font-medium text-foreground">
                      {patient.name}
                    </td>
                    <td className="py-3 text-body text-muted-foreground">
                      {patient.age}
                    </td>
                    <td className="py-3 text-body text-muted-foreground">
                      {patient.lastCheckin}
                    </td>
                    <td className="py-3">
                      <RiskBadge level={patient.risk} />
                    </td>
                    <td className="py-3 text-body text-muted-foreground">
                      {patient.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-xl bg-card p-6 shadow-card">
          <h3 className="text-foreground">Pending Reports</h3>
          <div className="mt-4 space-y-3">
            {pendingReports.map((report, i) => (
              <div key={i} className="rounded-lg border border-border p-4">
                <div className="flex items-center justify-between">
                  <p className="text-body font-medium text-foreground">
                    {report.patient}
                  </p>
                  <RiskBadge level={report.risk} />
                </div>
                <p className="mt-1 text-small text-muted-foreground">
                  {report.type}
                </p>
                <p className="mt-0.5 text-small text-muted-foreground">
                  {report.generated}
                </p>
                <button className="mt-3 w-full rounded-lg bg-primary px-4 py-2 text-small font-medium text-primary-foreground transition-colors hover:bg-primary/90">
                  Review
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
