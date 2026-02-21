import { Bell, Shield, Globe } from "lucide-react";

const settingSections = [
  {
    title: "Notifications",
    icon: Bell,
    settings: [
      { label: "Daily check-in reminders", enabled: true },
      { label: "Plan updates from your doctor", enabled: true },
      { label: "Weekly health summary", enabled: false },
    ],
  },
  {
    title: "Privacy & Security",
    icon: Shield,
    settings: [
      { label: "Two-factor authentication", enabled: false },
      { label: "Share health data with professionals", enabled: true },
    ],
  },
  {
    title: "Preferences",
    icon: Globe,
    settings: [
      { label: "Dark mode", enabled: false },
      { label: "Compact view", enabled: false },
    ],
  },
];

export default function PatientSettings() {
  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-foreground">Settings</h1>
        <p className="mt-1 text-body-lg text-muted-foreground">Manage your account preferences</p>
      </div>

      <div className="space-y-6">
        {settingSections.map((section, i) => (
          <div key={i} className="rounded-xl bg-card p-6 shadow-card">
            <div className="flex items-center gap-2">
              <section.icon className="h-5 w-5 text-primary" />
              <h3 className="text-foreground">{section.title}</h3>
            </div>
            <div className="mt-4 divide-y divide-border">
              {section.settings.map((setting, j) => (
                <div key={j} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
                  <p className="text-body text-foreground">{setting.label}</p>
                  <button
                    className={`relative h-6 w-11 rounded-full transition-colors ${
                      setting.enabled ? "bg-primary" : "bg-muted"
                    }`}
                  >
                    <span
                      className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
                        setting.enabled ? "translate-x-5" : ""
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
