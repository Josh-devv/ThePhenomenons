import { RiskBadge } from "@/components/RiskBadge";
import { FileText, Clock, CheckCircle, ArrowLeft, Bot } from "lucide-react";
import { useState } from "react";

type TabKey = "pending" | "reviewed";

interface Report {
  patient: string;
  type: string;
  risk: "low" | "moderate" | "high";
  generated: string;
  summary: string;
  details?: string;
}

const reports: Record<TabKey, Report[]> = {
  pending: [
    { patient: "Michael Chen", type: "Risk Assessment", risk: "high", generated: "2 hours ago", summary: "Elevated cardiovascular risk markers. BP trending upward over 2 weeks.", details: "Patient reported persistent chest tightness and dizziness over the past 3 days. Blood pressure readings have been consistently above 140/90. Heart rate elevated at rest (92 bpm avg). Family history of cardiovascular disease. Recommended immediate consultation and potential medication adjustment." },
    { patient: "Lisa Thompson", type: "Weekly Summary", risk: "high", generated: "4 hours ago", summary: "Missed 3 check-ins. Pain levels increasing. Non-adherent to medication schedule.", details: "Patient has missed 3 of 7 daily check-ins this week. When checking in, reported increasing lower back pain (6/10 → 8/10). Medication adherence dropped to 40%. Sleep quality deteriorated significantly. Mood indicators suggest potential depression screening needed." },
    { patient: "Robert Wilson", type: "Risk Assessment", risk: "moderate", generated: "Yesterday", summary: "Mild respiratory symptoms persisting. Possible seasonal trigger.", details: "Patient reports persistent dry cough for 10 days. No fever. Slight wheezing noted during breathing exercises. Oxygen levels normal (98%). Symptoms correlate with seasonal allergen data. Previous history of mild asthma. Current inhaler usage increased from 1x to 3x daily." },
    { patient: "Anna Kowalski", type: "Monthly Review", risk: "moderate", generated: "Yesterday", summary: "Blood sugar levels slightly elevated. Diet adherence dropped to 60%.", details: "Average blood glucose readings: 145 mg/dL (up from 120 mg/dL last month). HbA1c estimated at 7.2%. Diet log shows increased carbohydrate intake. Exercise frequency maintained at 3x/week. Weight stable. Patient reports difficulty maintaining diet during work travel." },
  ],
  reviewed: [
    { patient: "Sarah Johnson", type: "Risk Assessment", risk: "low", generated: "2 days ago", summary: "All metrics within normal range. Continue current plan." },
    { patient: "James Martinez", type: "Weekly Summary", risk: "low", generated: "3 days ago", summary: "Excellent adherence. Health score improved by 8 points." },
    { patient: "David Park", type: "Risk Assessment", risk: "low", generated: "4 days ago", summary: "Recovery on track. Cleared for increased exercise intensity." },
  ],
};

export default function ProfessionalReports() {
  const [tab, setTab] = useState<TabKey>("pending");
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  if (selectedReport) {
    return (
      <div className="animate-fade-in">
        <button
          onClick={() => setSelectedReport(null)}
          className="mb-6 flex items-center gap-2 text-body font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Reports
        </button>

        <div className="rounded-xl bg-card p-8 shadow-card">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-foreground">{selectedReport.patient}</h1>
              <p className="mt-1 text-body text-muted-foreground">{selectedReport.type} · Generated {selectedReport.generated}</p>
            </div>
            <RiskBadge level={selectedReport.risk} />
          </div>

          <div className="mt-8">
            <h3 className="text-foreground">AI-Generated Report</h3>
            <div className="mt-4 rounded-lg border border-border bg-muted/50 p-6">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary">
                  <Bot className="h-4 w-4 text-secondary-foreground" />
                </div>
                <div>
                  <p className="text-body font-semibold text-foreground">AI Health Assessment</p>
                  <p className="mt-2 text-body leading-relaxed text-muted-foreground">{selectedReport.summary}</p>
                  {selectedReport.details && (
                    <p className="mt-4 text-body leading-relaxed text-foreground">{selectedReport.details}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex gap-3">
            <button
              onClick={() => setSelectedReport(null)}
              className="rounded-lg bg-success px-6 py-3 text-body font-medium text-success-foreground hover:bg-success/90"
            >
              Approve Report
            </button>
            <button
              onClick={() => setSelectedReport(null)}
              className="rounded-lg bg-destructive px-6 py-3 text-body font-medium text-destructive-foreground hover:bg-destructive/90"
            >
              Reject Report
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-foreground">AI Reports</h1>
        <p className="mt-1 text-body-lg text-muted-foreground">Review AI-generated patient assessments</p>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex gap-1 rounded-lg bg-muted p-1">
        <button
          onClick={() => setTab("pending")}
          className={`flex items-center gap-2 rounded-md px-4 py-2.5 text-body font-medium transition-colors ${
            tab === "pending" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Clock className="h-4 w-4" />
          Pending ({reports.pending.length})
        </button>
        <button
          onClick={() => setTab("reviewed")}
          className={`flex items-center gap-2 rounded-md px-4 py-2.5 text-body font-medium transition-colors ${
            tab === "reviewed" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <CheckCircle className="h-4 w-4" />
          Reviewed ({reports.reviewed.length})
        </button>
      </div>

      {/* Reports */}
      <div className="space-y-4">
        {reports[tab].map((report, i) => (
          <div key={i} className="rounded-xl bg-card p-6 shadow-card">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-[16px] font-semibold text-foreground">{report.patient}</h3>
                  <p className="text-small text-muted-foreground">{report.type} · {report.generated}</p>
                </div>
              </div>
              <RiskBadge level={report.risk} />
            </div>
            <p className="mt-4 text-body text-muted-foreground">{report.summary}</p>
            <div className="mt-4">
              {tab === "pending" ? (
                <button
                  onClick={() => setSelectedReport(report)}
                  className="rounded-lg bg-primary px-4 py-2 text-small font-medium text-primary-foreground hover:bg-primary/90"
                >
                  Review
                </button>
              ) : (
                <button className="rounded-lg border border-border px-4 py-2 text-small font-medium text-foreground hover:bg-muted">
                  View Details
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
