import { cls } from "@libs/client/utils";
import { UseFormRegisterReturn } from "react-hook-form";

interface InputProps {
  label: string;
  name: string;
  type: string;
  register: UseFormRegisterReturn;
  error?: string;
  value?: string;
  isDisabled?: boolean;
}

export default function FloatingInput({
  label,
  name,
  register,
  type,
  error,
  value,
  isDisabled,
}: InputProps) {
  return (
    <>
      <div className="relative flex flex-col items-start rounded-md">
        <input
          id={name}
          {...register}
          type={type}
          className={cls(
            isDisabled ? "bg-gray-300" : "",
            "peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2 px-0 text-sm text-gray-900 focus:border-amber-500 focus:outline-none focus:ring-0 focus:ring-amber-500"
          )}
          value={value}
          placeholder={" "}
        />
        <label
          className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-gray-600"
          htmlFor={name}
        >
          {label}
        </label>
        <div className="h-5 text-sm text-red-500">{error}</div>
      </div>
    </>
  );
}
