import type { UseFormRegisterReturn } from "react-hook-form";

interface TextAreaProps {
  label?: string;
  name?: string;
  register: UseFormRegisterReturn;
  placeholder: string;
  [key: string]: any;
}

export const TextArea = ({
  label,
  name,
  register,
  placeholder,
  ...rest
}: TextAreaProps) => {
  return (
    <>
      {label ? (
        <label
          htmlFor={name}
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      ) : null}
      <textarea
        id={name}
        {...register}
        className="w-full resize-none appearance-none overflow-y-scroll rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm placeholder:italic focus:border-amber-500 focus:outline-none focus:ring-amber-500"
        rows={6}
        {...rest}
        placeholder={placeholder}
      />
    </>
  );
};
