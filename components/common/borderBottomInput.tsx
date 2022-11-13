import { cls } from "@libs/client/utils";
import type { UseFormRegisterReturn } from "react-hook-form";

interface InputProps {
  label?: string;
  name: string;
  type: string;
  register: UseFormRegisterReturn;
  value?: string;
  placeholder?: string;
  className?: string;
  isTitle?: boolean;
}

export default function BorderBottomInput({
  label,
  name,
  register,
  type,
  value,
  placeholder,
  className,
  isTitle,
}: InputProps) {
  return (
    <div className={cls(className)}>
      {label && (
        <label
          className="mb-1 block text-sm font-medium text-gray-700 "
          htmlFor={name}
        >
          {label}
        </label>
      )}
      <div className="flex flex-col items-start rounded-md">
        <input
          id={name}
          {...register}
          type={type}
          className={cls(
            className,
            isTitle && "text-xl lg:text-3xl",
            "block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2 px-0 text-sm  text-gray-900 placeholder-gray-400 placeholder:text-xl placeholder:italic focus:border-amber-500 focus:outline-none focus:ring-amber-500 "
          )}
          value={value}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}
