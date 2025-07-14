import { Outlet } from "react-router";
import Header from "./ui/header";
import { SidebarContent } from "./ui/sidebar";

export default function AppLayout() {
  return (
    <div className="h-screen grid lg:grid-cols-[280px_1fr]">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block">
        <SidebarContent />
      </aside>

      {/* Main Area */}
      <div className="flex flex-col bg-muted/40 min-h-0">
        <Header />

        {/* Main Content Area */}
        <main className="flex-1 p-4 lg:p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
