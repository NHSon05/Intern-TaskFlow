import type { ChangeEvent } from "react";

interface TextInputProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  placeholder?: string;
  autoComplete?: string;
  error?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const TextInput = ({
  label,
  name,
  type = "text",
  value,
  placeholder,
  autoComplete,
  error,
  onChange,
}: TextInputProps) => {
  return (
    <label className="block space-y-2 text-sm">
      <span className="font-medium text-slate-700">{label}</span>
      <input
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onChange={onChange}
        className="h-14 w-full rounded-full border border-slate-200 bg-slate-50 px-5 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition duration-200 ease-in-out focus:bg-white focus:border-sky-400 focus:ring-2 focus:ring-sky-500/15"
      />
      {error ? <p className="text-sm text-rose-500">{error}</p> : null}
    </label>
  );
};

export default TextInput;
