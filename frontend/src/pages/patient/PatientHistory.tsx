import { RiskBadge } from "@/components/RiskBadge";
import { Calendar, Filter } from "lucide-react";

const historyData = [
  {
    date: "Feb 21, 2026",
    symptoms: "Mild headache, fatigue",
    risk: "low" as const,
    score: 85,
    notes: "Recommended rest and hydration",
  },
  {
    date: "Feb 20, 2026",
    symptoms: "No symptoms reported",
    risk: "low" as const,
    score: 90,
    notes: "All clear - keep it up!",
  },
  {
    date: "Feb 19, 2026",
    symptoms: "Joint pain, low energy",
    risk: "moderate" as const,
    score: 72,
    notes: "Monitor joint pain, consider anti-inflammatory diet",
  },
  {
    date: "Feb 18, 2026",
    symptoms: "Chest tightness, dizziness",
    risk: "high" as const,
    score: 55,
    notes: "Urgent: Schedule appointment with cardiologist",
  },
  {
    date: "Feb 17, 2026",
    symptoms: "Slight cough, runny nose",
    risk: "low" as const,
    score: 80,
    notes: "Possible seasonal allergies",
  },
  {
    date: "Feb 16, 2026",
    symptoms: "Back pain after exercise",
    risk: "moderate" as const,
    score: 70,
    notes: "Reduce intensity, stretching recommended",
  },
];

export default function PatientHistory() {
  return (
    <div className="animate-fade-in">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-foreground">Check-in History</h1>
          <p className="mt-1 text-body text-muted-foreground">
            Review your past check-ins and health trends
          </p>
        </div>
        <div className="flex gap-3">
          <button className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-body font-medium text-foreground hover:bg-muted">
            <Calendar className="h-4 w-4" />
            Date Range
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-body font-medium text-foreground hover:bg-muted">
            <Filter className="h-4 w-4" />
            Filter
          </button>
        </div>
      </div>

      <div className="rounded-xl bg-card shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-6 py-4 text-left text-small font-medium text-muted-foreground">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-small font-medium text-muted-foreground">
                  Symptoms
                </th>
                <th className="px-6 py-4 text-left text-small font-medium text-muted-foreground">
                  Risk Level
                </th>
                <th className="px-6 py-4 text-left text-small font-medium text-muted-foreground">
                  Score
                </th>
                <th className="px-6 py-4 text-left text-small font-medium text-muted-foreground">
                  AI Notes
                </th>
              </tr>
            </thead>
            <tbody>
              {historyData.map((row, i) => (
                <tr
                  key={i}
                  className="border-b border-border last:border-0 hover:bg-muted/50"
                >
                  <td className="px-6 py-4 text-body font-medium text-foreground">
                    {row.date}
                  </td>
                  <td className="px-6 py-4 text-body text-muted-foreground">
                    {row.symptoms}
                  </td>
                  <td className="px-6 py-4">
                    <RiskBadge level={row.risk} />
                  </td>
                  <td className="px-6 py-4 text-body font-medium text-foreground">
                    {row.score}/100
                  </td>
                  <td className="px-6 py-4 text-body text-muted-foreground">
                    {row.notes}
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
