import { useState } from "react";

interface ProjectPopUpProps {
  open: boolean;
  isPending: boolean;
  initialName?: string;
  onClose: () => void;
  onSubmit: (name: string) => void;
}

export default function ProjectPopUp({
  open,
  isPending,
  initialName,
  onClose,
  onSubmit,
}: ProjectPopUpProps) {
  const [name, setName] = useState(initialName ?? "");

  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSubmit(name.trim());
    setName("");
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
      <div className="relative w-full max-w-md rounded-[28px] border border-slate-200 bg-white p-8 shadow-2xl">
        <h2 className="text-xl font-semibold text-slate-900">
            {initialName ? "Edit Project" : "New Project"}
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          {initialName ? "Edit your project name." : "Give your project a name to get started."}
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="project-name"
              className="block text-sm font-medium text-slate-700"
            >
              Project Name
            </label>
            <input
              id="project-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Personal Website"
              autoFocus
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:bg-white focus:border-sky-400/80 focus:ring-2 focus:ring-sky-500/10"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={isPending || !name.trim()}
              className="flex-1 rounded-full bg-sky-500 px-5 py-3 text-sm font-semibold text-white transition-all duration-200 active:scale-[0.98] hover:bg-sky-400 focus-visible:ring-2 focus-visible:ring-sky-500/80 focus-visible:outline-none disabled:opacity-50"
            >
              {isPending ? "Saving…" : initialName ? "Save Changes" : "Create"}
            </button>
            <button
              type="button"
              onClick={() => { onClose(); setName(""); }}
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
