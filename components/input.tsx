import type { UseFormRegisterReturn } from "react-hook-form";

interface InputProps {
  label: string;
  name: string;
  kind?: "text" | "phone" | "price";
  type: string;
  register: UseFormRegisterReturn;
  error?: string;
  value?: string;
}

export default function Input({
  label,
  name,
  kind = "text",
  register,
  type,
  error,
  value,
}: InputProps) {
  return (
    <div>
      <label
        className="mb-1 block text-sm font-medium text-gray-700"
        htmlFor={name}
      >
        {label}
      </label>
      {kind === "text" ? (
        <div className="relative flex flex-col items-start  rounded-md shadow-sm">
          <input
            id={name}
            {...register}
            type={type}
            className="w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-amber-500"
            value={value}
          />
          <div className="text-red-500">{error}</div>
        </div>
      ) : null}
    </div>
  );
}
