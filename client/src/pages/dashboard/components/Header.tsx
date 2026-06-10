import type { ProjectResponse } from "@/types/project.type";

interface HeaderProps {
  setProjectPopUpOpen: (open: boolean) => void;
  setEditingProject: (project: ProjectResponse | null) => void;
}

export default function Header({setProjectPopUpOpen, setEditingProject}: HeaderProps) {
  return (
    <div className="border-b border-slate-200/80 bg-white/80 backdrop-blur-md px-4 py-4 shadow-sm shadow-slate-100/10 md:px-8">
      <div className="mx-auto flex max-w-10xl flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-sky-600">
            Dashboard
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-900">
            Your Projects
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
            Manage all your projects and tasks in one place.
          </p>
        </div>

        <button
          type="button"
          onClick={() => { setEditingProject(null); setProjectPopUpOpen(true); }}
          className="inline-flex items-center gap-2 rounded-full bg-sky-500 px-5 py-3 text-sm font-semibold text-white transition-all duration-200 active:scale-[0.98] hover:bg-sky-400 focus-visible:ring-2 focus-visible:ring-sky-500/80 focus-visible:outline-none"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
          New Project
        </button>
      </div>
    </div>
  )
}
