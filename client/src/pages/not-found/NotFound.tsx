import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-12 text-slate-900">
      <div className="w-full max-w-xl rounded-[32px] border border-slate-200 bg-white p-10 text-center shadow-md shadow-slate-100">
        <p className="text-sm uppercase tracking-[0.35em] text-sky-600 font-semibold">
          404 Error
        </p>
        <h1 className="mt-5 text-4xl font-semibold text-slate-900">
          Page Not Found
        </h1>
        <p className="mt-4 text-sm leading-6 text-slate-500">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <Link
          to="/dashboard"
          className="mt-8 inline-flex rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-400 shadow-lg shadow-sky-500/10"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
