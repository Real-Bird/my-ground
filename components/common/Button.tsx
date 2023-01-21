import { cls } from "@libs/client/utils";
import React from "react";

interface ButtonProps {
  text: string;
  [key: string]: any;
  className?: string;
}

export default function Button({ text, className, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={cls(
        className,
        "w-full rounded-md border border-transparent bg-amber-500 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
      )}
    >
      {text}
    </button>
  );
}
