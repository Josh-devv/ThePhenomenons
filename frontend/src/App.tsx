import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import PatientLayout from "./pages/patient/PatientLayout";
import PatientDashboard from "./pages/patient/PatientDashboard";
import PatientCheckin from "./pages/patient/PatientCheckin";
import PatientPlan from "./pages/patient/PatientPlan";
import PatientProfile from "./pages/patient/PatientProfile";
import PatientSettings from "./pages/patient/PatientSettings";
import ProfessionalLayout from "./pages/professional/ProfessionalLayout";
import ProfessionalDashboard from "./pages/professional/ProfessionalDashboard";
import ProfessionalPatients from "./pages/professional/ProfessionalPatients";
import ProfessionalChat from "./pages/professional/ProfessionalChat";
import ProfessionalReports from "./pages/professional/ProfessionalReports";
import ProfessionalTemplates from "./pages/professional/ProfessionalTemplates";
import ProfessionalProfile from "./pages/professional/ProfessionalProfile";
import ProfessionalSettings from "./pages/professional/ProfessionalSettings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />

          {/* Patient Routes */}
          <Route path="/patient" element={<PatientLayout />}>
            <Route index element={<PatientDashboard />} />
            <Route path="ai-assistant" element={<PatientCheckin />} />
            <Route path="plan" element={<PatientPlan />} />
            <Route path="profile" element={<PatientProfile />} />
            <Route path="settings" element={<PatientSettings />} />
          </Route>

          {/* Professional Routes */}
          <Route path="/professional" element={<ProfessionalLayout />}>
            <Route index element={<ProfessionalDashboard />} />
            <Route path="patients" element={<ProfessionalPatients />} />
            <Route path="chat/:patientId" element={<ProfessionalChat />} />
            <Route path="reports" element={<ProfessionalReports />} />
            <Route path="templates" element={<ProfessionalTemplates />} />
            <Route path="profile" element={<ProfessionalProfile />} />
            <Route path="settings" element={<ProfessionalSettings />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
