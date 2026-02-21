import { Outlet } from "react-router-dom";
import { PatientSidebar } from "@/components/PatientSidebar";

export default function PatientLayout() {
  return (
    <div className="flex min-h-screen w-full">
      <PatientSidebar />
      <main className="flex-1 overflow-auto bg-background p-8">
        <Outlet />
      </main>
    </div>
  );
}
