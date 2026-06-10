import type { TaskResponse } from "@/types/task.type";
import { STATUS_DOT_STYLES } from "@/constants/taskStatus";

interface TaskCardProps {
  task: TaskResponse;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

function formatDueDate(date: string) {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.valueOf())) {
    return date;
  }
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(parsed);
}

export default function TaskCard({ task, onDelete, onEdit }: TaskCardProps) {

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("taskId", String(task.id));
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.style.opacity = '1';
  };

  return (
    <article
      draggable={true}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className="rounded-[26px] border border-slate-200/80 bg-white p-6 shadow-sm shadow-slate-100/30 transition hover:-translate-y-0.5 hover:bg-slate-50/50 hover:border-slate-300 cursor-grab active:cursor-grabbing"
    >
      <div className="flex gap-4">
        <div className="mt-1 flex h-4 w-4 items-center justify-center">
          <span
            className={`h-3.5 w-3.5 rounded-full ${STATUS_DOT_STYLES[task.status]}`}
          />
        </div>

        <div
          className="min-w-0 flex-1"
          onClick={() => onEdit(Number(task.id))}
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <p className="truncate text-base font-semibold text-slate-800">
                {task.title}
              </p>
              <p className="mt-1 truncate text-sm text-slate-500">
                {task.description}
              </p>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-500">
              <span className="font-medium text-slate-700">Due</span>{" "}
              {formatDueDate(task.dueDate)}
            </p>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(Number(task.id));
              }}
              className="inline-flex items-center justify-center rounded-full border border-rose-100 bg-rose-50/50 px-4 py-2.5 text-xs font-semibold text-rose-600 transition-all duration-200 active:scale-[0.96] hover:bg-rose-100/50 hover:text-rose-700 hover:border-rose-200 focus-visible:ring-2 focus-visible:ring-rose-500/80 focus-visible:outline-none"
              aria-label="Delete task"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-3.5 w-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 6h18" />
                <path d="M8 6V4h8v2" />
                <path d="M19 6l-1 14H6L5 6" />
                <path d="M10 11v6" />
                <path d="M14 11v6" />
              </svg>
              <span className="ml-1.5">Delete Task</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
