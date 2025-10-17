import { Navbar } from "@/components/Navbar";
import { StatCard } from "@/components/StatCard";
import { TaskCard } from "@/components/TaskCard";
import { CheckSquare, Clock, CheckCircle2, AlertCircle, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

const Index = () => {
  const priorityData = [
    { name: "High", value: 8, color: "#EF4444" },
    { name: "Medium", value: 10, color: "#F59E0B" },
    { name: "Low", value: 6, color: "#10B981" },
  ];

  const weeklyData = [
    { day: "Mon", tasks: 4 },
    { day: "Tue", tasks: 6 },
    { day: "Wed", tasks: 3 },
    { day: "Thu", tasks: 5 },
    { day: "Fri", tasks: 8 },
    { day: "Sat", tasks: 2 },
    { day: "Sun", tasks: 1 },
  ];

  const tasks = [
    {
      title: "Design new landing page",
      description: "Create a modern, responsive landing page with focus on conversion optimization",
      priority: "high" as const,
      assignee: "Sarah Johnson",
      dueDate: "Oct 25",
      status: "in-progress" as const,
    },
    {
      title: "Update documentation",
      description: "Review and update all API documentation to reflect recent changes",
      priority: "medium" as const,
      assignee: "Mike Chen",
      dueDate: "Oct 28",
      status: "todo" as const,
    },
    {
      title: "Setup project repository",
      description: "Initialize Git repository and configure CI/CD pipeline",
      priority: "low" as const,
      assignee: "Alex Rivera",
      dueDate: "Oct 18",
      status: "done" as const,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 space-y-8 animate-fade-in">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Total Tasks" value={24} icon={CheckSquare} gradient="primary" trend="+12% from last week" />
          <StatCard title="In Progress" value={8} icon={Clock} gradient="warning" trend="3 due today" />
          <StatCard title="Completed" value={12} icon={CheckCircle2} gradient="success" trend="+3 this week" />
          <StatCard title="Overdue" value={4} icon={AlertCircle} gradient="danger" trend="Needs attention" />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="glass-card p-6 shadow-medium animate-slide-up">
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

          <Card className="glass-card p-6 shadow-medium animate-slide-up" style={{ animationDelay: "0.1s" }}>
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

        {/* Recent Tasks */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Recent Tasks</h2>
            <Button className="gap-2 shadow-soft gradient-primary hover:shadow-glow transition-smooth">
              <Plus className="w-4 h-4" />
              New Task
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map((task, index) => (
              <div key={index} style={{ animationDelay: `${index * 0.1}s` }}>
                <TaskCard {...task} />
              </div>
            ))}
          </div>
        </div>

        {/* Upgrade to Pro Banner */}
        <Card className="glass-card p-8 shadow-medium gradient-primary text-white animate-scale-in">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1 space-y-2">
              <h3 className="text-2xl font-bold">Upgrade to Pro</h3>
              <p className="text-white/90">
                Unlock advanced analytics, unlimited team members, custom workflows, and priority support.
              </p>
            </div>
            <Button size="lg" variant="secondary" className="shadow-medium hover:shadow-glow transition-smooth">
              Learn More
            </Button>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Index;
