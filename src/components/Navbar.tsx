import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, CheckSquare, Calendar, BarChart3, Users, Crown, User, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/50 glass-card shadow-soft">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 transition-smooth hover:opacity-80">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center shadow-glow">
              <CheckSquare className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              TaskFlow
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            <NavLink to="/" icon={LayoutDashboard} label="Dashboard" />
            <NavLink to="/tasks" icon={CheckSquare} label="Tasks" />
            <NavLink to="/calendar" icon={Calendar} label="Calendar" />
            <NavLink to="/analytics" icon={BarChart3} label="Analytics" />
            <NavLink to="/team" icon={Users} label="Team" />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="hidden sm:flex gap-2 border-warning/50 text-warning hover:bg-warning/10">
            <Crown className="w-4 h-4" />
            Upgrade to Pro
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-primary text-primary-foreground text-sm">JD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 glass-card">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">John Doe</p>
                  <p className="text-xs text-muted-foreground">john@example.com</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive focus:text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

interface NavLinkProps {
  to: string;
  icon: React.ElementType;
  label: string;
}

const NavLink = ({ to, icon: Icon, label }: NavLinkProps) => {
  return (
    <Link to={to}>
      <Button variant="ghost" size="sm" className="gap-2 transition-smooth hover:bg-primary/10 hover:text-primary">
        <Icon className="w-4 h-4" />
        {label}
      </Button>
    </Link>
  );
};
