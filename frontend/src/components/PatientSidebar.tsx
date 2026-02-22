import { Home, ClipboardList, FileText, Settings, LogOut } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.png";

const mainLinks = [
  { icon: Home, label: "Overview", to: "/patient" },
  { icon: ClipboardList, label: "AI Assistant", to: "/patient/ai-assistant" },
  { icon: FileText, label: "My Plan", to: "/patient/plan" },
];

export function PatientSidebar({ isMobile }: { isMobile?: boolean }) {
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
          <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/50 p-3 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-sm shadow-sm">
                SJ
              </div>
              <div className="flex flex-col">
                <span className="text-[14px] font-semibold text-slate-800 leading-tight">
                  Sarah J.
                </span>
                <span className="text-[12px] text-slate-500">
                  Patient Profile
                </span>
              </div>
            </div>

            <button
              className="group flex h-9 w-9 items-center justify-center rounded-lg hover:bg-slate-200/50 transition-colors"
              title="Logout"
            >
              <LogOut className="h-4 w-4 text-slate-400 group-hover:text-slate-700 transition-colors" />
            </button>
          </div>
        </div>
      </nav>
    </aside>
  );
}
