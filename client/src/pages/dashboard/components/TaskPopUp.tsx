import { useState } from "react";
import type { TaskRequest, TaskResponse } from "@/types/task.type";
import { TASK_STATUSES } from "@/constants/taskStatus";
import { toast } from "sonner";

interface TaskPopUpProps {
  open: boolean;
  isPending: boolean;
  taskToEdit?: TaskResponse | null;
  onClose: () => void;
  onSubmit: (data: TaskRequest) => void;
}

const initialValue: TaskRequest = {
  title: "",
  description: "",
  status: "NEW",
  scheduleDate: "",
  dueDate: ""
};

const getInitialForm = (task?: TaskResponse | null): TaskRequest => {
  if (task) {
    return {
      title: task.title,
      description: task.description ?? "",
      status: task.status ?? "NEW",
      scheduleDate: task.scheduleDate ? task.scheduleDate.slice(0, 16) : "",
      dueDate: task.dueDate ? task.dueDate.slice(0, 16) : ""
    };
  }
  return initialValue;
};

export default function TaskPopUp({
  open,
  isPending,
  taskToEdit,
  onClose,
  onSubmit,
}: TaskPopUpProps) {
  const [form, setForm] = useState<TaskRequest>(() => getInitialForm(taskToEdit))

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.description.trim() || !form.dueDate) {
      toast.warning("Please fill in all required fields");
      return;
    };
    onSubmit(form);
    if (!taskToEdit) {
      setForm(initialValue);
    }
  };

  if (!open) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg rounded-[28px] border border-slate-200 bg-white p-8 shadow-2xl">
        <h2 className="text-xl font-semibold text-slate-900">
          {taskToEdit ? "Edit Task" : "New Task"}
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          {taskToEdit ? "Update the task details below." : "Fill in the details for your new task."}
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {/* Title */}
          <div className="space-y-2">
            <label htmlFor="task-title" className="block text-sm font-medium text-slate-700">
              Title
            </label>
            <input
              id="task-title"
              name="title" 
              type="text"
              value={form.title}
              onChange={handleChange}
              placeholder="Task title"
              autoFocus
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:bg-white focus:border-sky-400/80 focus:ring-2 focus:ring-sky-500/10"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label htmlFor="task-description" className="block text-sm font-medium text-slate-700">
              Description
            </label>
            <textarea
              id="task-description"
              name="description"
              rows={3}
              value={form.description}
              onChange={handleChange}
              placeholder="Optional description…"
              className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:bg-white focus:border-sky-400/80 focus:ring-2 focus:ring-sky-500/10"
              required
            />
          </div>

          {/* Status */}
          <div className="space-y-2">
            <label htmlFor="task-status" className="block text-sm font-medium text-slate-700">
              Status
            </label>
            <select
              id="task-status"
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:bg-white focus:border-sky-400/80 focus:ring-2 focus:ring-sky-500/10"
            >
              {TASK_STATUSES.map((status) => (
                <option key={status} value={status} className="bg-white text-slate-800">
                  {status}
                </option>
              ))}
            </select>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="task-schedule" className="block text-sm font-medium text-slate-700">
                Schedule Date
              </label>
              <input
                id="task-schedule"
                name="scheduleDate"
                type="datetime-local"
                value={form.scheduleDate}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:bg-white focus:border-sky-400/80 focus:ring-2 focus:ring-sky-500/10"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="task-due" className="block text-sm font-medium text-slate-700">
                Due Date
              </label>
              <input
                id="task-due"
                name="dueDate"
                type="datetime-local"
                value={form.dueDate}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:bg-white focus:border-sky-400/80 focus:ring-2 focus:ring-sky-500/10"
                required
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={isPending || !form.title.trim()}
              className="flex-1 rounded-full bg-sky-500 px-5 py-3 text-sm font-semibold text-white transition-all duration-200 active:scale-[0.98] hover:bg-sky-400 focus-visible:ring-2 focus-visible:ring-sky-500/80 focus-visible:outline-none disabled:opacity-50"
            >
              {isPending ? "Saving…" : taskToEdit ? "Save Changes" : "Create Task"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-600 transition-all duration-200 active:scale-[0.98] hover:bg-slate-50 hover:text-slate-800 focus-visible:ring-2 focus-visible:ring-slate-500/80 focus-visible:outline-none"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
