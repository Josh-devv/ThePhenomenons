import { User, Mail, Phone, MapPin, Award, Building } from "lucide-react";

export default function ProfessionalProfile() {
  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-foreground">Profile</h1>
        <p className="mt-1 text-body-lg text-muted-foreground">Manage your professional profile</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="rounded-xl bg-card p-6 shadow-card lg:col-span-1">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-accent text-2xl font-bold text-accent-foreground">
              DR
            </div>
            <h3 className="mt-4 text-foreground">Dr. Rachel Adams</h3>
            <p className="text-body text-muted-foreground">Internal Medicine</p>
            <span className="mt-2 inline-flex rounded-full bg-success/10 px-3 py-1 text-small font-medium text-success">
              Verified Professional
            </span>
          </div>
        </div>

        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-xl bg-card p-6 shadow-card">
            <h3 className="text-foreground">Personal Information</h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {[
                { icon: User, label: "Full Name", value: "Dr. Rachel Adams" },
                { icon: Mail, label: "Email", value: "r.adams@wellsync.com" },
                { icon: Phone, label: "Phone", value: "+1 (555) 234-5678" },
                { icon: MapPin, label: "Location", value: "San Francisco, CA" },
                { icon: Award, label: "License No.", value: "MD-2024-78901" },
                { icon: Building, label: "Institution", value: "Bay Area Medical Center" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <item.icon className="mt-0.5 h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-small text-muted-foreground">{item.label}</p>
                    <p className="text-body font-medium text-foreground">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-6 rounded-lg bg-primary px-4 py-2 text-small font-medium text-primary-foreground hover:bg-primary/90">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
