import { BarChart3, Users, FileText, ClipboardList, User, Settings, LogOut } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

const mainLinks = [
  { icon: BarChart3, label: "Dashboard", to: "/professional" },
  { icon: Users, label: "Patients", to: "/professional/patients" },
  { icon: FileText, label: "Reports", to: "/professional/reports" },
  { icon: ClipboardList, label: "Plan Templates", to: "/professional/templates" },
];

const bottomLinks = [
  { icon: User, label: "Profile", to: "/professional/profile" },
  { icon: Settings, label: "Settings", to: "/professional/settings" },
];

export function ProfessionalSidebar() {
  return (
    <aside className="flex h-screen w-64 flex-col" style={{ backgroundColor: "hsl(220, 26%, 14%)" }}>
      <div className="flex items-center gap-2 px-6 py-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
          <span className="text-sm font-bold text-primary-foreground">W</span>
        </div>
        <span className="text-lg font-bold text-primary-foreground">WellSync Pro</span>
      </div>

      <nav className="flex flex-1 flex-col px-3">
        <div className="flex-1 space-y-1">
          {mainLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/professional"}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-[15px] font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-primary-foreground/70 hover:text-primary-foreground"
                )
              }
            >
              <link.icon className="h-5 w-5" />
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="mb-4 space-y-1 border-t border-primary-foreground/10 pt-4">
          {bottomLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-[15px] font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-primary-foreground/70 hover:text-primary-foreground"
                )
              }
            >
              <link.icon className="h-5 w-5" />
              {link.label}
            </NavLink>
          ))}
          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-[15px] font-medium text-primary-foreground/70 transition-colors hover:text-primary-foreground">
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </div>
      </nav>
    </aside>
  );
}
