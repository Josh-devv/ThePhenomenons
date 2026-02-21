import { User, Mail, Phone, Calendar, MapPin, Shield } from "lucide-react";

export default function PatientProfile() {
  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-foreground">My Profile</h1>
        <p className="mt-1 text-body text-muted-foreground">
          Manage your account and health information
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Profile Card */}
        <div className="rounded-xl bg-card p-6 shadow-card lg:col-span-1">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
              <User className="h-12 w-12 text-primary" />
            </div>
            <h3 className="mt-4 text-foreground">Sarah Johnson</h3>
            <p className="mt-1 text-body text-muted-foreground">
              Patient since Jan 2026
            </p>
            <div className="mt-4 w-full space-y-3">
              <div className="flex items-center gap-3 text-body text-muted-foreground">
                <Mail className="h-4 w-4" /> sarah.johnson@email.com
              </div>
              <div className="flex items-center gap-3 text-body text-muted-foreground">
                <Phone className="h-4 w-4" /> +1 (555) 123-4567
              </div>
              <div className="flex items-center gap-3 text-body text-muted-foreground">
                <Calendar className="h-4 w-4" /> Born March 15, 1990
              </div>
              <div className="flex items-center gap-3 text-body text-muted-foreground">
                <MapPin className="h-4 w-4" /> San Francisco, CA
              </div>
            </div>
          </div>
        </div>

        {/* Health Info */}
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-xl bg-card p-6 shadow-card">
            <h3 className="text-foreground">Health Information</h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {[
                { label: "Blood Type", value: "O+" },
                { label: "Height", value: "5'6\" (168 cm)" },
                { label: "Weight", value: "135 lbs (61 kg)" },
                { label: "Primary Doctor", value: "Dr. Sarah Chen" },
                { label: "Allergies", value: "Penicillin, Peanuts" },
                { label: "Conditions", value: "None reported" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-lg border border-border p-4"
                >
                  <p className="text-small text-muted-foreground">
                    {item.label}
                  </p>
                  <p className="mt-1 text-body font-medium text-foreground">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl bg-card p-6 shadow-card">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <h3 className="text-foreground">Privacy & Security</h3>
            </div>
            <div className="mt-4 space-y-4">
              <div className="flex items-center justify-between rounded-lg border border-border p-4">
                <div>
                  <p className="text-body font-medium text-foreground">
                    Two-Factor Authentication
                  </p>
                  <p className="text-small text-muted-foreground">
                    Add extra security to your account
                  </p>
                </div>
                <button className="rounded-lg bg-primary px-4 py-2 text-small font-medium text-primary-foreground">
                  Enable
                </button>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border p-4">
                <div>
                  <p className="text-body font-medium text-foreground">
                    Data Sharing
                  </p>
                  <p className="text-small text-muted-foreground">
                    Control who can see your health data
                  </p>
                </div>
                <button className="rounded-lg border border-border bg-card px-4 py-2 text-small font-medium text-foreground hover:bg-muted">
                  Manage
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
