import { Home, ClipboardList, FileText, Settings, LogOut } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.png";
import { useAuth } from "@/contexts/AuthContext";

const mainLinks = [
  { icon: Home, label: "Overview", to: "/patient" },
  { icon: ClipboardList, label: "Health Partner", to: "/patient/ai-assistant" },
  { icon: FileText, label: "My Plan", to: "/patient/plan" },
];

export function PatientSidebar({ isMobile }: { isMobile?: boolean }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Helper to generate initials from name (e.g., 'John Doe' => 'JD')
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };
  const initials = user?.name ? getInitials(user.name) : "U";

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <aside
      className={cn(
        "flex flex-col border-r border-border bg-white shadow-[1px_0_15px_rgba(0,0,0,0.02)]",
        isMobile ? "h-full w-full" : "h-screen w-[260px]",
      )}
    >
      {/* Logo Section */}
      <div className="flex items-center gap-3 px-6 py-[22px] border-b border-slate-100">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/5 p-1">
          <img
            src={logo}
            alt="WellSync Logo"
            className="w-full h-full object-contain"
          />
        </div>
        <span className="text-[19px] font-bold text-slate-800 tracking-tight">
          WellSync
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col px-4 pt-6 pb-4 overflow-y-auto">
        <div className="flex-1 space-y-1.5">
          {mainLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/patient"}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-xl px-3.5 py-3 text-[15px] font-medium transition-all duration-200",
                  isActive
                    ? "bg-primary/10 text-primary shadow-sm"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                )
              }
            >
              <link.icon className="h-5 w-5" />
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Bottom Profile Card */}
        <div className="mt-8 border-t border-slate-100 pt-4">
          <div className="flex flex-col gap-3 rounded-xl border border-slate-100 bg-slate-50/50 p-3 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-sm shadow-sm">
                {initials}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[14px] font-semibold text-slate-800 leading-tight truncate">
                  {user?.name || "Patient Name"}
                </span>
                <span className="text-[12px] text-slate-500 truncate">
                  Patient Profile
                </span>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-white border border-slate-200 px-3 py-2 text-[14px] font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-sm"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </nav>
    </aside>
  );
}
