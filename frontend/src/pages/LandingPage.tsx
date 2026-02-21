import { Link } from "react-router-dom";
import { ClipboardList, Shield, FileText, MessageSquare, ArrowRight, Heart } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const features = [
  {
    icon: ClipboardList,
    title: "Daily Check-ins",
    description: "AI-powered symptom tracking with intelligent follow-up questions tailored to your health profile.",
  },
  {
    icon: Shield,
    title: "Risk Prediction",
    description: "Advanced algorithms analyze patterns to provide early warning for potential health concerns.",
  },
  {
    icon: FileText,
    title: "Preventive Plans",
    description: "Personalized, doctor-approved care plans designed to keep you at your healthiest.",
  },
];

const steps = [
  { number: "01", title: "Daily Chat", description: "Have a quick daily conversation with your AI health partner." },
  { number: "02", title: "Risk Assessment", description: "AI generates comprehensive risk assessments from your data." },
  { number: "03", title: "Doctor Review", description: "Healthcare professionals review and validate insights." },
  { number: "04", title: "Follow Plan", description: "Follow your personalized preventive health plan." },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Heart className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">WellSync</span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/patient"
              className="rounded-lg px-4 py-2.5 text-body font-medium text-primary transition-colors hover:bg-primary/5"
            >
              Patient Login
            </Link>
            <Link
              to="/professional"
              className="rounded-lg bg-primary px-4 py-2.5 text-body font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              For Professionals
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-6 py-20 lg:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="animate-fade-in">
              <h1 className="text-[40px] leading-[48px] font-bold tracking-tight text-foreground lg:text-[52px] lg:leading-[60px]">
                Your Preventive AI{" "}
                <span className="text-primary">Health Assistant</span>
              </h1>
              <p className="mt-6 text-body-lg text-muted-foreground max-w-lg">
                Track symptoms daily, get AI-powered insights, and receive personalized preventive plans from healthcare professionals.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/patient"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-body font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg"
                >
                  Get Started as Patient
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/professional"
                  className="inline-flex items-center gap-2 rounded-lg border-2 border-primary bg-transparent px-6 py-3 text-body font-medium text-primary transition-all hover:bg-primary/5"
                >
                  For Healthcare Professionals
                </Link>
              </div>
            </div>
            <div className="animate-fade-in">
              <img
                src={heroImage}
                alt="AI Health Assistant visualization showing health data analytics and protective monitoring"
                className="w-full rounded-2xl shadow-card"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-card py-20">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h2 className="text-foreground">Everything you need for preventive health</h2>
            <p className="mx-auto mt-4 max-w-2xl text-body-lg text-muted-foreground">
              Our platform combines AI technology with medical expertise to provide comprehensive preventive care.
            </p>
          </div>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-xl border border-border bg-background p-8 transition-all hover:shadow-card-hover"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-5 text-foreground">{feature.title}</h3>
                <p className="mt-3 text-body text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h2 className="text-foreground">How It Works</h2>
            <p className="mx-auto mt-4 max-w-2xl text-body-lg text-muted-foreground">
              Four simple steps to better preventive health care.
            </p>
          </div>
          <div className="mt-14 grid gap-8 md:grid-cols-4">
            {steps.map((step) => (
              <div key={step.number} className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary text-[18px] font-bold text-primary-foreground">
                  {step.number}
                </div>
                <h3 className="mt-5 text-[18px] font-semibold text-foreground">{step.title}</h3>
                <p className="mt-3 text-body text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-12">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-6 md:flex-row">
          <div className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-primary" />
            <span className="font-bold text-foreground">WellSync</span>
          </div>
          <div className="flex gap-6 text-body text-muted-foreground">
            <a href="#" className="hover:text-foreground">About</a>
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
            <a href="#" className="hover:text-foreground">Contact</a>
          </div>
          <p className="text-small text-muted-foreground">© 2026 WellSync. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
