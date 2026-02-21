import { Outlet } from "react-router-dom";
import { ProfessionalSidebar } from "@/components/ProfessionalSidebar";

export default function ProfessionalLayout() {
  return (
    <div className="flex min-h-screen w-full">
      <ProfessionalSidebar />
      <main className="flex-1 overflow-auto bg-background p-8">
        <Outlet />
      </main>
    </div>
  );
}
