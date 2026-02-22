import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Stethoscope } from "lucide-react";
import logo from "@/assets/logo.png";
import { useAuth } from "@/contexts/AuthContext";

export default function LandingPage() {
  const [role, setRole] = useState<"patient" | "professional">("patient");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();

    // Extract name from email input (e.g., 'john.doe@email.com' -> 'John doe')
    const emailInput = (e.target as HTMLFormElement).elements.namedItem(
      "email",
    ) as HTMLInputElement;
    const emailStr = emailInput.value;
    const namePart = emailStr.split("@")[0];
    const extractedName =
      namePart.charAt(0).toUpperCase() + namePart.slice(1).replace(".", " ");

    login({
      name: extractedName || "User",
      email: emailStr,
      role: role,
    });

    if (role === "patient") {
      navigate("/patient");
    } else {
      navigate("/professional");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] p-4 font-sans">
      <div className="w-full max-w-[400px] flex flex-col items-center">
        {/* Logo */}
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#eff6ff] mb-4 overflow-hidden p-1 shadow-sm border border-primary/10">
          <img
            src={logo}
            alt="WellSync Logo"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Title */}
        <h1 className="text-[26px] font-bold text-slate-900 mb-1">WellSync</h1>
        <p className="text-slate-500 text-[15px] mb-8">Your health companion</p>

        {/* Role Toggle */}
        <div className="w-full bg-[#f1f5f9] rounded-xl p-1.5 flex mb-6">
          <button
            type="button"
            onClick={() => setRole("patient")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-lg transition-all ${role === "patient" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
          >
            <Heart className="w-4 h-4" /> Patient
          </button>
          <button
            type="button"
            onClick={() => setRole("professional")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-lg transition-all ${role === "professional" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
          >
            <Stethoscope className="w-4 h-4" /> Professional
          </button>
        </div>

        {/* Login Form Container */}
        <div className="w-full bg-white rounded-xl border border-slate-200 shadow-[0_2px_10px_rgba(0,0,0,0.03)] p-6">
          <form onSubmit={handleSignIn} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-[14px] font-medium text-slate-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                required
                className="w-full px-3 py-2.5 rounded-lg border border-slate-200 bg-slate-50/50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-[15px]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="password"
                className="text-[14px] font-medium text-slate-700"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="********"
                required
                className="w-full px-3 py-2.5 rounded-lg border border-slate-200 bg-slate-50/50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-[15px]"
              />
            </div>
            <button
              type="submit"
              className="w-full mt-2 bg-primary hover:bg-primary/90 text-white font-medium py-[10px] rounded-lg transition-colors text-[15px]"
            >
              Sign In
            </button>
          </form>
          <div className="mt-5 text-center text-sm">
            <span className="text-slate-500">Don't have an account? </span>
            <a
              href="#"
              className="text-primary hover:text-primary/90 hover:underline font-medium"
            >
              Register
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
