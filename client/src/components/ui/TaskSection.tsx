import TaskCard from "../../pages/dashboard/components/TaskCard";
import type { TaskResponse } from "../../types/task.type";

interface TaskSectionProps {
  title: string;
  tasks: TaskResponse[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  emptyMessage?: string;
}

export default function TaskSection({
  title,
  tasks,
  onEdit,
  onDelete,
  emptyMessage = "No tasks in this section yet.",
}: TaskSectionProps) {
  return (
    <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-md shadow-slate-100/50">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.28em] text-slate-500">
            {title}
          </p>
          <p className="mt-2 text-sm text-slate-400">
            {tasks.length} task{tasks.length === 1 ? "" : "s"}
          </p>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs uppercase tracking-[0.28em] text-slate-600 font-semibold">
          {tasks.length}
        </span>
      </div>

      <div className="space-y-4">
        {tasks.length === 0 ? (
          <div className="rounded-[26px] border border-dashed border-slate-200 bg-slate-50 p-10 text-center text-sm text-slate-500">
            {emptyMessage}
          </div>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </section>
  );
}
