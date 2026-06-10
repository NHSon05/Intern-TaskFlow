import { Link } from "react-router-dom";

interface AuthHeaderProps {
  currentPage: "login" | "register";
}

const AuthHeader = ({ currentPage }: AuthHeaderProps) => {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8">
        <Link
          to="/login"
          className="flex items-center gap-3 text-slate-800 transition hover:text-sky-600"
        >
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-sky-100 text-sky-600 ring-1 ring-sky-200 shadow-[0_0_0_1px_rgba(14,165,233,0.05)]">
            ✓
          </span>
          <span className="text-base font-semibold tracking-tight sm:text-lg">
            TaskFlow
          </span>
        </Link>

        <div className="flex flex-wrap items-center gap-3 text-sm sm:gap-4">
          <Link
            to="/login"
            className={`font-medium transition ${
              currentPage === "login"
                ? "text-slate-900"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Login
          </Link>
          <Link
            to="/register"
            className={`rounded-full px-5 py-2.5 text-sm font-semibold shadow-md transition ${
              currentPage === "register"
                ? "bg-slate-900 text-white shadow-slate-900/10 hover:bg-slate-800"
                : "bg-sky-500 text-white shadow-sky-500/10 hover:bg-sky-400"
            }`}
          >
            Register
          </Link>
        </div>
      </div>
    </header>
  );
};

export default AuthHeader;
