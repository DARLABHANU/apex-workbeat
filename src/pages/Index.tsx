import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { StatCard } from "@/components/StatCard";
import { KanbanColumn } from "@/components/KanbanColumn";
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { CheckSquare, Clock, CheckCircle2, AlertCircle, Plus, Search, Filter, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Task {
  id: string;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  assignee: {
    name: string;
    avatar?: string;
  };
  dueDate: string;
  progress?: number;
  status: "todo" | "in-progress" | "done";
}

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Design new landing page",
      description: "Create wireframes and mockups for the new landing page design",
      priority: "high",
      assignee: { name: "Sarah Chen" },
      dueDate: "Oct 25",
      status: "todo",
    },
    {
      id: "2",
      title: "Update documentation",
      description: "Update API documentation with new endpoints",
      priority: "medium",
      assignee: { name: "Mike Johnson" },
      dueDate: "Oct 28",
      status: "todo",
    },
    {
      id: "3",
      title: "Implement user authentication",
      description: "Add login and registration functionality",
      priority: "high",
      assignee: { name: "Alex Rivera" },
      dueDate: "Oct 22",
      progress: 65,
      status: "in-progress",
    },
    {
      id: "4",
      title: "Setup project repository",
      description: "Initialize Git repository and setup basic structure",
      priority: "low",
      assignee: { name: "Jordan Lee" },
      dueDate: "Oct 18",
      status: "done",
    },
  ]);

  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) return;

    const activeTask = tasks.find(t => t.id === active.id);
    if (!activeTask) return;

    const overId = over.id as string;
    const overTask = tasks.find(t => t.id === overId);
    
    // If dropped on a column
    if (["todo", "in-progress", "done"].includes(overId)) {
      setTasks(tasks.map(task => 
        task.id === active.id 
          ? { ...task, status: overId as Task["status"] }
          : task
      ));
    }
    // If dropped on another task
    else if (overTask && activeTask.status === overTask.status) {
      const oldIndex = tasks.findIndex(t => t.id === active.id);
      const newIndex = tasks.findIndex(t => t.id === overId);
      setTasks(arrayMove(tasks, oldIndex, newIndex));
    }

    setActiveId(null);
  };

  const priorityData = [
    { name: "High", value: tasks.filter(t => t.priority === "high").length, color: "#EF4444" },
    { name: "Medium", value: tasks.filter(t => t.priority === "medium").length, color: "#F59E0B" },
    { name: "Low", value: tasks.filter(t => t.priority === "low").length, color: "#10B981" },
  ];

  const weeklyData = [
    { day: "Mon", tasks: 3 },
    { day: "Tue", tasks: 2 },
    { day: "Wed", tasks: 4 },
    { day: "Thu", tasks: 1 },
    { day: "Fri", tasks: 5 },
    { day: "Sat", tasks: 2 },
    { day: "Sun", tasks: 3 },
  ];

  const todoTasks = tasks.filter(t => t.status === "todo");
  const inProgressTasks = tasks.filter(t => t.status === "in-progress");
  const doneTasks = tasks.filter(t => t.status === "done");

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="sticky top-0 z-40 border-b border-border glass-card shadow-soft">
          <div className="flex items-center justify-between px-8 py-4">
            <div>
              <h1 className="text-2xl font-bold mb-1">Project Dashboard</h1>
              <p className="text-sm text-muted-foreground">Manage your tasks and track progress</p>
            </div>

            <div className="flex items-center gap-3">
              <Button className="gap-2 gradient-primary shadow-soft hover:shadow-glow transition-smooth">
                <Plus className="w-4 h-4" />
                Add Task
              </Button>

              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-2">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-primary text-primary-foreground text-sm">SC</AvatarFallback>
                    </Avatar>
                    <div className="text-left hidden sm:block">
                      <p className="text-sm font-medium">Sarah Chen</p>
                      <p className="text-xs text-muted-foreground">Admin</p>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 glass-card">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="px-8 pb-4 flex gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search tasks..." className="pl-9 glass-card" />
            </div>
            <Button variant="outline" className="gap-2 glass-card">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
          </div>
        </header>

        <div className="p-8 space-y-8">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard title="Total Tasks" value={tasks.length} icon={CheckSquare} gradient="primary" />
            <StatCard title="In Progress" value={inProgressTasks.length} icon={Clock} gradient="warning" />
            <StatCard title="Completed" value={doneTasks.length} icon={CheckCircle2} gradient="success" />
            <StatCard title="Overdue" value={4} icon={AlertCircle} gradient="danger" />
          </div>

          {/* Kanban Board */}
          <DndContext
            sensors={sensors}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <div className="flex gap-6 overflow-x-auto pb-4">
              <KanbanColumn
                id="todo"
                title="Todo"
                tasks={todoTasks}
                icon={<div className="w-2 h-2 rounded-full bg-muted-foreground" />}
              />
              <KanbanColumn
                id="in-progress"
                title="In Progress"
                tasks={inProgressTasks}
                icon={<div className="w-2 h-2 rounded-full bg-warning" />}
              />
              <KanbanColumn
                id="done"
                title="Done"
                tasks={doneTasks}
                icon={<div className="w-2 h-2 rounded-full bg-success" />}
              />
            </div>

            <DragOverlay>
              {activeId ? (
                <Card className="p-4 glass-card shadow-glow opacity-80">
                  <p className="font-semibold text-sm">
                    {tasks.find(t => t.id === activeId)?.title}
                  </p>
                </Card>
              ) : null}
            </DragOverlay>
          </DndContext>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="glass-card p-6 shadow-medium">
              <h3 className="text-lg font-semibold mb-4">Task Priority Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={priorityData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {priorityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>

            <Card className="glass-card p-6 shadow-medium">
              <h3 className="text-lg font-semibold mb-4">Weekly Task Completion</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weeklyData}>
                  <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))", 
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "var(--radius)"
                    }} 
                  />
                  <Bar dataKey="tasks" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
