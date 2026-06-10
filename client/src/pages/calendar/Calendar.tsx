import { useMemo, useState, Fragment } from "react";
import Sidebar from "../../components/ui/Sidebar";
import { STATUS_COLORS } from "../../constants/taskStatus";
import { buildCalendarGrid } from "@/utils/buildCalendarGrid";
import { formatMonthTitle } from "@/utils/format-month-title";
import { useGetAllTasks } from "@/hooks/useTask";
import type { TaskResponse } from "@/types/task.type";

const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getDateKey(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export default function Calendar() {
  const { data: tasks = [] } = useGetAllTasks();
  const [activeDate, setActiveDate] = useState(() => new Date());

  const year = activeDate.getFullYear();
  const month = activeDate.getMonth();

  const weeks = useMemo(() => buildCalendarGrid(year, month), [year, month]);

  const tasksByDate = useMemo(() => {
    return tasks.reduce<Record<string, TaskResponse[]>>((acc, task) => {
      if (!task.dueDate) return acc;
      const dateKey = task.dueDate.split('T')[0];
      acc[dateKey] = acc[dateKey]
        ? [...acc[dateKey], task]
        : [task];
      return acc;
    }, {});
  }, [tasks]);

  const handlePrevMonth = () => {
    setActiveDate(
      (current) => new Date(current.getFullYear(), current.getMonth() - 1, 1),
    );
  };

  const handleNextMonth = () => {
    setActiveDate(
      (current) => new Date(current.getFullYear(), current.getMonth() + 1, 1),
    );
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50 text-slate-900">
      <Sidebar />
      <main className="min-h-screen md:ml-72">
        <div className="border-b border-slate-200/80 bg-white/80 backdrop-blur-md px-4 py-4 shadow-sm shadow-slate-100/10 md:px-8">
          <div className="mx-auto flex max-w-10xl flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-sky-600">
                Calendar View
              </p>
              <h1 className="mt-3 text-3xl font-semibold text-slate-900">
                Manage your tasks by due date.
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
                View scheduled tasks and step through the month to see what is
                due each day.
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-10xl px-4 py-8 md:px-8">
          <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-md shadow-slate-100/50">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">
                  {formatMonthTitle(activeDate)}
                </h2>
                <p className="text-sm text-slate-500">
                  {tasks.length} task{tasks.length === 1 ? "" : "s"} scheduled
                  this month.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handlePrevMonth}
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 transition hover:bg-slate-50 hover:text-slate-800 shadow-sm"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={handleNextMonth}
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 transition hover:bg-slate-50 hover:text-slate-800 shadow-sm"
                >
                  Next
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-px rounded-[28px] border border-slate-200 bg-slate-100 text-center text-xs uppercase tracking-[0.25em] text-slate-500 sm:text-sm">
              {dayLabels.map((label) => (
                <div key={label} className="bg-slate-50 px-4 py-3 text-slate-500 font-semibold">
                  {label}
                </div>
              ))}
            </div>

            <div className="mt-4 grid grid-cols-7 gap-px text-sm text-slate-700 bg-slate-100 rounded-[28px] overflow-hidden border border-slate-200">
              {weeks.map((week, index) => (
                <Fragment key={index}>
                  {week.map((day, dayIndex) => {
                    const isToday =
                      day &&
                      new Date().getFullYear() === year &&
                      new Date().getMonth() === month &&
                      new Date().getDate() === day;
                    const dateKey = day ? getDateKey(year, month, day) : "";
                    const cellTasks = dateKey
                      ? (tasksByDate[dateKey] ?? [])
                      : [];

                    return (
                      <div
                        key={`${index}-${dayIndex}`}
                        className={`min-h-[120px] overflow-hidden p-3 transition ${
                          day ? "bg-white text-slate-800" : "bg-slate-50/50 text-slate-400"
                        } ${isToday ? "bg-sky-50/50 ring-2 ring-sky-500/30 ring-inset" : ""}`}
                      >
                        <div className="flex items-center justify-between gap-2 text-xs text-slate-400">
                          <span className={isToday ? "font-bold text-sky-600" : ""}>{day ?? ""}</span>
                          {cellTasks.length > 0 ? (
                            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] text-slate-600 font-semibold">
                              {cellTasks.length}
                            </span>
                          ) : null}
                        </div>

                        <div className="mt-3 space-y-2">
                          {cellTasks.slice(0, 2).map((task) => {
                            const statusColor =
                              STATUS_COLORS[
                                task.status as keyof typeof STATUS_COLORS
                              ] || "bg-slate-500 text-white";

                            return (
                              <button
                                key={task.id}
                                type="button"
                                className={`block w-full rounded-2xl p-2 text-left text-sm transition shadow-sm ${statusColor}`}
                              >
                                <span className="block truncate font-semibold">
                                  {task.title}
                                </span>
                                <span className="mt-1 block truncate text-[11px] opacity-90">
                                  Due {task.dueDate?.split('T')[0]}
                                </span>
                              </button>
                            );
                          })}
                          {cellTasks.length > 2 ? (
                            <div className="text-xs text-slate-400 font-medium">
                              +{cellTasks.length - 2} more
                            </div>
                          ) : null}
                        </div>
                      </div>
                    );
                  })}
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
