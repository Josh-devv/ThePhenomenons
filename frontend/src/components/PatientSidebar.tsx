import { Home, ClipboardList, FileText, User, Settings, LogOut } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

const mainLinks = [
  { icon: Home, label: "Home", to: "/patient" },
  { icon: ClipboardList, label: "Daily Check-in", to: "/patient/checkin" },
  { icon: FileText, label: "My Plan", to: "/patient/plan" },
];

const bottomLinks = [
  { icon: User, label: "Profile", to: "/patient/profile" },
  { icon: Settings, label: "Settings", to: "/patient/settings" },
];

export function PatientSidebar() {
  return (
    <aside className="flex h-screen w-64 flex-col border-r border-border bg-sidebar">
      <div className="flex items-center gap-2 px-6 py-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
          <span className="text-sm font-bold text-primary-foreground">W</span>
        </div>
        <span className="text-lg font-bold text-foreground">WellSync</span>
      </div>

      <nav className="flex flex-1 flex-col px-3">
        <div className="flex-1 space-y-1">
          {mainLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/patient"}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-[15px] font-medium transition-colors",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )
              }
            >
              <link.icon className="h-5 w-5" />
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="mb-4 space-y-1 border-t border-border pt-4">
          {bottomLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-[15px] font-medium transition-colors",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )
              }
            >
              <link.icon className="h-5 w-5" />
              {link.label}
            </NavLink>
          ))}
          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-[15px] font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </div>
      </nav>
    </aside>
  );
}
