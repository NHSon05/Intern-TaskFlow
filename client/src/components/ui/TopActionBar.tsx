import type { ChangeEvent } from "react";
import { TASK_STATUSES } from "../../constants/taskStatus";

export interface TopActionBarProps {
  searchValue: string;
  statusValue: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onNewTask: () => void;
}

export default function TopActionBar({
  searchValue,
  statusValue,
  onSearchChange,
  onStatusChange,
  onNewTask,
}: TopActionBarProps) {
  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex-1 lg:max-w-md">
          <label className="relative">
            <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-slate-400">
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
            </span>
            <input
              type="search"
              value={searchValue}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                onSearchChange(event.target.value)
              }
              placeholder="Search by title..."
              className="w-full rounded-full border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:bg-white focus:border-sky-400/80 focus:ring-2 focus:ring-sky-500/10"
            />
          </label>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <select
            value={statusValue}
            onChange={(event: ChangeEvent<HTMLSelectElement>) =>
              onStatusChange(event.target.value)
            }
            className="min-w-[150px] rounded-full border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:bg-white focus:border-sky-400/80 focus:ring-2 focus:ring-sky-500/10"
          >
            <option value="All Status" className="bg-white text-slate-800">
              All Status
            </option>
            {TASK_STATUSES.map((status) => (
              <option
                key={status}
                value={status}
                className="bg-white text-slate-800"
              >
                {status}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={onNewTask}
            className="inline-flex items-center justify-center rounded-full bg-sky-500 px-4 py-3 text-sm font-semibold text-white transition-all duration-200 active:scale-[0.98] hover:bg-sky-400 focus-visible:ring-2 focus-visible:ring-sky-500/80 focus-visible:outline-none"
          >
            + New Task
          </button>
        </div>
      </div>
    </div>
  );
}
