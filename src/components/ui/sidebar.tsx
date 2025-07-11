import { navigationItems } from "@/lib/navlinks";
import { NavLink } from "react-router";

export function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-green-800 to-green-950 dark:from-green-900 dark:to-gray-950">
      {/* Logo */}
      <div className="p-6">
        <h1 className="text-white text-lg font-light uppercase tracking-[0.3em]">
          Veridian Grove
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 pb-4">
        <div className="flex flex-col space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.label}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center justify-start px-4 py-2 rounded-md text-white hover:bg-white/10 hover:text-white transition-colors ${
                    isActive ? "bg-white/10" : ""
                  }`
                }
                onClick={onNavigate}
              >
                <Icon className="mr-3 h-4 w-4" />
                {item.label}
              </NavLink>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
