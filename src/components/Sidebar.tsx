import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, CheckSquare, Calendar, BarChart3, Users, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Tasks", href: "/", icon: CheckSquare },
  { name: "Calendar", href: "/calendar", icon: Calendar, badge: "Soon" },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Team", href: "/team", icon: Users },
  { name: "Settings", href: "/settings", icon: Settings },
];

export const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="w-64 border-r border-border bg-card/50 backdrop-blur-sm flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-glow">
            <CheckSquare className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl">TaskFlow</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link key={item.name} to={item.href}>
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3 transition-smooth",
                  isActive && "bg-primary/10 text-primary font-medium"
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
                {item.badge && (
                  <span className="ml-auto text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </Button>
            </Link>
          );
        })}
      </nav>

      {/* Upgrade Card */}
      <div className="p-4 m-4 gradient-primary rounded-xl text-white shadow-glow">
        <h3 className="font-semibold mb-2">Upgrade to Pro</h3>
        <p className="text-sm text-white/90 mb-3">Unlock advanced features</p>
        <Button size="sm" variant="secondary" className="w-full">
          Learn More
        </Button>
      </div>
    </aside>
  );
};
