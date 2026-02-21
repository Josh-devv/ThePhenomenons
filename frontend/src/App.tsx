import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ProfessionalLayout from "./pages/professional/ProfessionalLayout";
import ProfessionalDashboard from "./pages/professional/ProfessionalDashboard";
import ProfessionalPatients from "./pages/professional/ProfessionalPatients";
import ProfessionalChat from "./pages/professional/ProfessionalChat";
import ProfessionalReports from "./pages/professional/ProfessionalReports";
import ProfessionalTemplates from "./pages/professional/ProfessionalTemplates";
import ProfessionalProfile from "./pages/professional/ProfessionalProfile";
import ProfessionalSettings from "./pages/professional/ProfessionalSettings";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />

          <Route path="/professional" element={<ProfessionalLayout />}>
            <Route index element={<ProfessionalDashboard />} />
            <Route path="patients" element={<ProfessionalPatients />} />
            <Route path="chat/:patientId" element={<ProfessionalChat />} />
            <Route path="reports" element={<ProfessionalReports />} />
            <Route path="templates" element={<ProfessionalTemplates />} />
            <Route path="profile" element={<ProfessionalProfile />} />
            <Route path="settings" element={<ProfessionalSettings />} />
          </Route>
          {/**<Route path="*" element={<NotFound />} />**/}
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
