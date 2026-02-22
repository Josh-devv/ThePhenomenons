import {
  BarChart3,
  Users,
  FileText,
  ClipboardList,
  User,
  Settings,
  LogOut,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.png";
import { useAuth } from "@/contexts/AuthContext";

const mainLinks = [
  { icon: BarChart3, label: "Dashboard", to: "/professional" },
  { icon: Users, label: "Patients", to: "/professional/patients" },
  { icon: FileText, label: "Reports", to: "/professional/reports" },
  {
    icon: ClipboardList,
    label: "Plan Templates",
    to: "/professional/templates",
  },
];

const bottomLinks = [
  { icon: User, label: "Profile", to: "/professional/profile" },
  { icon: Settings, label: "Settings", to: "/professional/settings" },
];

export function ProfessionalSidebar({ isMobile }: { isMobile?: boolean }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <aside
      className={cn(
        "flex flex-col",
        isMobile ? "h-full w-full" : "h-screen w-64",
      )}
      style={{ backgroundColor: "hsl(220, 26%, 14%)" }}
    >
      <div className="flex items-center gap-3 px-6 py-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/20 p-1">
          <img
            src={logo}
            alt="WellSync Logo"
            className="w-full h-full object-contain"
          />
        </div>
        <span className="text-lg font-bold text-primary-foreground">
          WellSync Pro
        </span>
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
                    : "text-primary-foreground/70 hover:text-primary-foreground",
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
                    : "text-primary-foreground/70 hover:text-primary-foreground",
                )
              }
            >
              <link.icon className="h-5 w-5" />
              {link.label}
            </NavLink>
          ))}
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-[15px] font-medium text-primary-foreground/70 transition-colors hover:text-primary-foreground"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </div>
      </nav>
    </aside>
  );
}
