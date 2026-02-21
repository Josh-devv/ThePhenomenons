import { Search, Filter, MessageSquare } from "lucide-react";
import { RiskBadge } from "@/components/RiskBadge";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const patients: Array<{
  name: string;
  email: string;
  age: number;
  risk: "low" | "moderate" | "high";
  lastCheckin: string;
  plan: string;
  adherence: string;
}> = [
  {
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    age: 36,
    risk: "low",
    lastCheckin: "Today",
    plan: "Active",
    adherence: "92%",
  },
  {
    name: "Michael Chen",
    email: "m.chen@email.com",
    age: 52,
    risk: "high",
    lastCheckin: "Today",
    plan: "Needs Update",
    adherence: "65%",
  },
  {
    name: "Emily Davis",
    email: "e.davis@email.com",
    age: 28,
    risk: "low",
    lastCheckin: "Yesterday",
    plan: "Active",
    adherence: "88%",
  },
  {
    name: "Robert Wilson",
    email: "r.wilson@email.com",
    age: 65,
    risk: "moderate",
    lastCheckin: "Today",
    plan: "Active",
    adherence: "75%",
  },
  {
    name: "Lisa Thompson",
    email: "l.thompson@email.com",
    age: 44,
    risk: "high",
    lastCheckin: "2 days ago",
    plan: "Inactive",
    adherence: "45%",
  },
  {
    name: "James Martinez",
    email: "j.martinez@email.com",
    age: 38,
    risk: "low",
    lastCheckin: "Today",
    plan: "Active",
    adherence: "95%",
  },
  {
    name: "Anna Kowalski",
    email: "a.kowalski@email.com",
    age: 57,
    risk: "moderate",
    lastCheckin: "Yesterday",
    plan: "Active",
    adherence: "70%",
  },
  {
    name: "David Park",
    email: "d.park@email.com",
    age: 41,
    risk: "low",
    lastCheckin: "Today",
    plan: "Active",
    adherence: "85%",
  },
];

type RiskFilter = "all" | "low" | "moderate" | "high";

export default function ProfessionalPatients() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [riskFilter, setRiskFilter] = useState<RiskFilter>("all");

  const filtered = patients.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesRisk = riskFilter === "all" || p.risk === riskFilter;
    return matchesSearch && matchesRisk;
  });

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-foreground">Patients</h1>
        <p className="mt-1 text-body-lg text-muted-foreground">
          Manage and monitor your patients
        </p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search patients..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-input bg-card py-2.5 pl-10 pr-4 text-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div className="flex gap-2">
          {(["all", "low", "moderate", "high"] as RiskFilter[]).map((level) => (
            <button
              key={level}
              onClick={() => setRiskFilter(level)}
              className={`rounded-full px-4 py-2 text-small font-medium capitalize transition-colors ${
                riskFilter === level
                  ? "bg-primary text-primary-foreground"
                  : "border border-border bg-card text-foreground hover:bg-muted"
              }`}
            >
              {level === "all" ? "All" : level}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl bg-card shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-6 py-4 text-left text-small font-medium text-muted-foreground">
                  Patient
                </th>
                <th className="px-6 py-4 text-left text-small font-medium text-muted-foreground">
                  Age
                </th>
                <th className="px-6 py-4 text-left text-small font-medium text-muted-foreground">
                  Risk Level
                </th>
                <th className="px-6 py-4 text-left text-small font-medium text-muted-foreground">
                  Last Check-in
                </th>
                <th className="px-6 py-4 text-left text-small font-medium text-muted-foreground">
                  Plan Status
                </th>
                <th className="px-6 py-4 text-left text-small font-medium text-muted-foreground">
                  Adherence
                </th>
                <th className="px-6 py-4 text-left text-small font-medium text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((patient, i) => (
                <tr
                  key={i}
                  className="border-b border-border last:border-0 hover:bg-muted/50"
                >
                  <td className="px-6 py-4">
                    <p className="text-body font-medium text-foreground">
                      {patient.name}
                    </p>
                    <p className="text-small text-muted-foreground">
                      {patient.email}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-body text-muted-foreground">
                    {patient.age}
                  </td>
                  <td className="px-6 py-4">
                    <RiskBadge level={patient.risk} />
                  </td>
                  <td className="px-6 py-4 text-body text-muted-foreground">
                    {patient.lastCheckin}
                  </td>
                  <td className="px-6 py-4 text-body text-muted-foreground">
                    {patient.plan}
                  </td>
                  <td className="px-6 py-4 text-body font-medium text-foreground">
                    {patient.adherence}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() =>
                        navigate(
                          `/professional/chat/${patient.name.toLowerCase().replace(/\s+/g, "-")}`,
                        )
                      }
                      className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-small font-medium text-primary-foreground hover:bg-primary/90"
                    >
                      <MessageSquare className="h-3.5 w-3.5" />
                      Chat
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
