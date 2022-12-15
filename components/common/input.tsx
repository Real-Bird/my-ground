import { cls } from "@libs/client/utils";
import { MouseEventHandler } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

interface InputProps {
  label: string;
  name: string;
  type: string;
  register: UseFormRegisterReturn;
  error?: string;
  value?: string;
  placeholder?: string;
  isDisabled?: boolean;
  onClick?: MouseEventHandler<HTMLInputElement>;
  max?: string;
}

export default function Input({
  label,
  name,
  register,
  type,
  error,
  value,
  isDisabled,
  placeholder,
  onClick,
  max,
}: InputProps) {
  return (
    <div>
      <label
        className="mb-1 block text-sm font-medium text-gray-700"
        htmlFor={name}
      >
        {label}
      </label>
      <div className="relative flex flex-col items-start  rounded-md shadow-sm">
        <input
          id={name}
          {...register}
          type={type}
          className={cls(
            isDisabled ? "bg-gray-300" : "",
            "w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm placeholder:italic focus:border-amber-500 focus:outline-none focus:ring-amber-500"
          )}
          value={value}
          placeholder={placeholder}
          onClick={onClick}
          max={max}
        />
        <div className="text-red-500">{error}</div>
      </div>
    </div>
  );
}
