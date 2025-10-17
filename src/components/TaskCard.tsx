import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Clock, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TaskCardProps {
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  assignee: string;
  dueDate: string;
  status: "todo" | "in-progress" | "done";
  onClick?: () => void;
}

export const TaskCard = ({ title, description, priority, assignee, dueDate, status, onClick }: TaskCardProps) => {
  const priorityColors = {
    high: "bg-destructive/10 text-destructive border-destructive/20",
    medium: "bg-warning/10 text-warning border-warning/20",
    low: "bg-success/10 text-success border-success/20",
  };

  const statusDotColors = {
    todo: "bg-muted-foreground",
    "in-progress": "bg-warning",
    done: "bg-success",
  };

  return (
    <Card 
      className="glass-card p-4 shadow-soft hover:shadow-medium transition-smooth cursor-pointer group animate-scale-in"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${statusDotColors[status]}`} />
          <Badge variant="outline" className={priorityColors[priority]}>
            {priority.charAt(0).toUpperCase() + priority.slice(1)}
          </Badge>
        </div>
        <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-smooth">
          <MoreVertical className="w-4 h-4" />
        </Button>
      </div>

      <h3 className="font-semibold mb-2 line-clamp-1">{title}</h3>
      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{description}</p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar className="w-6 h-6">
            <AvatarFallback className="text-xs bg-primary/10 text-primary">
              {assignee.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <span className="text-xs text-muted-foreground">{assignee}</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="w-3 h-3" />
          {dueDate}
        </div>
      </div>
    </Card>
  );
};
