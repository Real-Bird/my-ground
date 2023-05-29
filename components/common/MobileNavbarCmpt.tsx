import { cls } from "@libs/client/utils";
import Link from "next/link";

interface MobileNavigationProps {
  pathname: string;
}

export const MobileNavigation = ({ pathname }: MobileNavigationProps) => {
  return (
    <nav className="fixed bottom-0 flex w-full max-w-xl justify-between border-t bg-white px-10 pb-5 pt-3 text-xs text-gray-700 dark:bg-slate-800 lg:hidden">
      <Link href="/">
        <a
          className={cls(
            pathname == "/"
              ? "text-amber-600"
              : "text-gray-500 transition-colors dark:text-white",
            "flex flex-col items-center space-y-2"
          )}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            ></path>
          </svg>
          <span>홈</span>
        </a>
      </Link>
      <Link href="/portfolio">
        <a
          className={cls(
            pathname == "/portfolio"
              ? "text-amber-600"
              : "text-gray-500 transition-colors dark:text-white",
            "flex flex-col items-center space-y-2"
          )}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
            ></path>
          </svg>
          <span>포트폴리오</span>
        </a>
      </Link>
      <Link href="/blog">
        <a
          className={cls(
            pathname == "/blog"
              ? "text-amber-600"
              : "text-gray-500 transition-colors dark:text-white",
            "flex flex-col items-center space-y-2"
          )}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
          <span>블로그</span>
        </a>
      </Link>
      <Link href="/contact">
        <a
          className={cls(
            pathname == "/contact"
              ? "text-amber-600"
              : "text-gray-500 transition-colors dark:text-white",
            "flex flex-col items-center space-y-2"
          )}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            ></path>
          </svg>
          <span>게시판</span>
        </a>
      </Link>
    </nav>
  );
};
