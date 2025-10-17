import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { TaskCard } from "@/components/TaskCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Plus, Search, Filter } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const Tasks = () => {
  const [selectedTask, setSelectedTask] = useState<any>(null);

  const columns = [
    {
      title: "To Do",
      status: "todo" as const,
      tasks: [
        {
          title: "Update documentation",
          description: "Review and update all API documentation to reflect recent changes",
          priority: "medium" as const,
          assignee: "Mike Chen",
          dueDate: "Oct 28",
          status: "todo" as const,
        },
        {
          title: "Fix login bug",
          description: "Users report issues with OAuth authentication flow",
          priority: "high" as const,
          assignee: "Sarah Johnson",
          dueDate: "Oct 23",
          status: "todo" as const,
        },
      ],
    },
    {
      title: "In Progress",
      status: "in-progress" as const,
      tasks: [
        {
          title: "Design new landing page",
          description: "Create a modern, responsive landing page with focus on conversion optimization",
          priority: "high" as const,
          assignee: "Sarah Johnson",
          dueDate: "Oct 25",
          status: "in-progress" as const,
        },
        {
          title: "Implement dark mode",
          description: "Add dark mode support across all pages",
          priority: "medium" as const,
          assignee: "Alex Rivera",
          dueDate: "Oct 30",
          status: "in-progress" as const,
        },
      ],
    },
    {
      title: "Done",
      status: "done" as const,
      tasks: [
        {
          title: "Setup project repository",
          description: "Initialize Git repository and configure CI/CD pipeline",
          priority: "low" as const,
          assignee: "Alex Rivera",
          dueDate: "Oct 18",
          status: "done" as const,
        },
        {
          title: "Database migration",
          description: "Migrate user data to new schema",
          priority: "high" as const,
          assignee: "Mike Chen",
          dueDate: "Oct 20",
          status: "done" as const,
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Task Board</h1>
            <p className="text-muted-foreground">Organize and track your team's work</p>
          </div>
          <Button className="gap-2 shadow-soft gradient-primary hover:shadow-glow transition-smooth">
            <Plus className="w-4 h-4" />
            New Task
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search tasks..." className="pl-9 glass-card" />
          </div>
          <Button variant="outline" className="gap-2 glass-card">
            <Filter className="w-4 h-4" />
            Filters
          </Button>
        </div>

        {/* Kanban Board */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {columns.map((column, columnIndex) => (
            <div key={column.status} className="space-y-4 animate-slide-up" style={{ animationDelay: `${columnIndex * 0.1}s` }}>
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-lg flex items-center gap-2">
                  {column.title}
                  <span className="text-sm text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                    {column.tasks.length}
                  </span>
                </h2>
              </div>

              <div className="space-y-3">
                {column.tasks.map((task, taskIndex) => (
                  <div key={taskIndex} style={{ animationDelay: `${(columnIndex * 0.1) + (taskIndex * 0.05)}s` }}>
                    <TaskCard {...task} onClick={() => setSelectedTask(task)} />
                  </div>
                ))}
                
                <Button 
                  variant="outline" 
                  className="w-full glass-card border-dashed hover:bg-primary/5 hover:border-primary transition-smooth"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Task
                </Button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Task Details Modal */}
      <Dialog open={!!selectedTask} onOpenChange={() => setSelectedTask(null)}>
        <DialogContent className="glass-card max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">{selectedTask?.title}</DialogTitle>
            <DialogDescription className="text-base pt-2">
              {selectedTask?.description}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Status</p>
                <p className="font-medium capitalize">{selectedTask?.status?.replace('-', ' ')}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Priority</p>
                <p className="font-medium capitalize">{selectedTask?.priority}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Assignee</p>
                <p className="font-medium">{selectedTask?.assignee}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Due Date</p>
                <p className="font-medium">{selectedTask?.dueDate}</p>
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button className="flex-1 gradient-primary">Edit Task</Button>
              <Button variant="outline" className="flex-1 border-destructive/50 text-destructive hover:bg-destructive/10">
                Delete
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Tasks;
