import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { PatientSidebar } from "@/components/PatientSidebar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export default function PatientLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen w-full lg:flex-row flex-col">
      {/* Mobile Top Header */}
      <div className="lg:hidden flex items-center justify-between p-4 border-b border-border bg-background">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <span className="text-sm font-bold text-primary-foreground">W</span>
          </div>
          <span className="text-lg font-bold text-foreground">WellSync</span>
        </div>

        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <button className="p-2 -mr-2 rounded-md hover:bg-muted text-foreground transition-colors">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle Sidebar</span>
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64 border-r-0">
            <PatientSidebar isMobile />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block lg:sticky lg:top-0 lg:h-screen lg:w-64">
        <PatientSidebar />
      </div>

      <main className="flex-1 overflow-auto bg-background p-4 md:p-8">
        <Outlet />
      </main>
    </div>
  );
}
