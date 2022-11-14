import { cls } from "@libs/client/utils";
import { FieldError } from "react-hook-form";
import { memo } from "react";

interface ErrorToastProps {
  idx: number;
  errorsArr: FieldError[];
  message: string;
  openErrorToast: boolean;
  onToastToggle: () => void;
}

const ErrorToast = ({
  idx,
  errorsArr,
  openErrorToast,
  onToastToggle,
  message,
}: ErrorToastProps) => {
  return (
    <div
      className={cls(
        openErrorToast ? "animate-fadeside" : "animate-fadeside-reverse",
        "flex w-full max-w-xs items-center rounded-lg bg-white p-4 text-gray-500 opacity-0 shadow"
      )}
      style={{
        animationDelay: `${0.2 * (idx % errorsArr.length)}s`,
      }}
      role={"alert"}
    >
      <div className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-12 w-12"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
          />
        </svg>
      </div>
      <div className="ml-3 text-sm font-normal">{message}</div>
      <button
        className="-mx-1.5 -my-1.5 ml-auto inline-flex h-8 w-8 rounded-lg bg-white p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-900 focus:ring-2 focus:ring-gray-300"
        onClick={onToastToggle}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};

export default memo(ErrorToast);
