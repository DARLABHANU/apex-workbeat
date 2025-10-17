import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  gradient: "primary" | "success" | "warning" | "danger";
}

export const StatCard = ({ title, value, icon: Icon, trend, gradient }: StatCardProps) => {
  const gradientClasses = {
    primary: "gradient-primary",
    success: "gradient-success",
    warning: "gradient-warning",
    danger: "gradient-danger",
  };

  return (
    <Card className="glass-card shadow-medium p-6 transition-smooth hover:shadow-glow hover:scale-105 animate-fade-in">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold">{value}</p>
          {trend && <p className="text-xs text-muted-foreground">{trend}</p>}
        </div>
        <div className={`p-3 rounded-xl ${gradientClasses[gradient]} shadow-soft`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </Card>
  );
};
