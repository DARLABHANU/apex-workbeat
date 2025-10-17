import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { DraggableTaskCard } from "./DraggableTaskCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

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
  status: string;
}

interface KanbanColumnProps {
  id: string;
  title: string;
  tasks: Task[];
  icon: React.ReactNode;
  onEdit?: (task: Task) => void;
  onDelete?: (taskId: string) => void;
  onAddTask?: () => void;
}

export const KanbanColumn = ({ id, title, tasks, icon, onEdit, onDelete, onAddTask }: KanbanColumnProps) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div className="flex-1 min-w-[300px]">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {icon}
          <h2 className="font-semibold text-base">{title}</h2>
          <span className="text-sm text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
            {tasks.length}
          </span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6"
          onClick={onAddTask}
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      <div
        ref={setNodeRef}
        className="min-h-[500px] p-3 rounded-xl bg-muted/20 border border-border/50"
      >
        <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
          {tasks.map((task) => (
            <DraggableTaskCard
              key={task.id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </SortableContext>

        {tasks.length === 0 && (
          <div className="flex items-center justify-center h-40 text-muted-foreground text-sm">
            No tasks yet
          </div>
        )}
      </div>
    </div>
  );
};
