import type { ReactNode } from "react";

interface AuthCardProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer?: ReactNode;
}

const AuthCard = ({
  title,
  subtitle,
  children,
  footer,
}: AuthCardProps) => {
  return (
    <div className="relative w-full max-w-[420px] rounded-[28px] border border-slate-200/80 bg-white p-8 shadow-xl sm:p-10">
      <div className=" text-center">
        <p className="text-xs font-bold uppercase tracking-[0.55em] text-sky-600 sm:text-sm">
          TaskFlow
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-[2.4rem]">
          {title}
        </h1>
        <p className="mx-auto mt-3 max-w-[320px] text-sm leading-6 text-slate-500 sm:text-base">
          {subtitle}
        </p>
      </div>

      <div className="mt-10 space-y-4">{children}</div>

      {footer ? (
        <div className="mt-8 text-center text-sm text-slate-500">{footer}</div>
      ) : null}
    </div>
  );
};

export default AuthCard;
