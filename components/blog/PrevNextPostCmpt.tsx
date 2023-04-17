import { cls } from "@libs/client/utils";
import Link from "next/link";

interface PrevNextPostProps {
  id: number;
  label: "이전 글" | "다음 글";
  title: string;
}

const PrevNextPost = ({ id, label, title }: PrevNextPostProps) => {
  return (
    <div className="h-24 w-1/3 rounded-lg bg-slate-300 p-3 shadow-lg transition-colors hover:bg-slate-400">
      <Link href={`/blog/${id}`}>
        <a
          className={cls(
            label === "다음 글" ? "flex-row-reverse" : "",
            "flex cursor-pointer items-center"
          )}
        >
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={cls(
                label === "다음 글" ? "rotate-180" : "",
                "h-6 w-6"
              )}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div
            className={cls(
              label === "다음 글" ? "pr-5" : "pl-5",
              "flex w-11/12 flex-col"
            )}
          >
            <span
              className={cls(
                label === "다음 글" ? "self-end" : "text-start",
                "text-sm font-medium"
              )}
            >
              {label}
            </span>
            <span
              className={cls(
                label === "다음 글" ? "text-end" : "text-start",
                "overflow-x-clip text-ellipsis whitespace-pre py-2 text-lg font-semibold"
              )}
            >
              {title}
            </span>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default PrevNextPost;
