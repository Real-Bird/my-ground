import { cls } from "@libs/client/utils";
import Link from "next/link";

interface FullNavBarProps {
  pathname: string;
}

export const FullNavBar = ({ pathname }: FullNavBarProps) => {
  return (
    <header className="fixed right-4 top-0 z-[9999] hidden h-12 lg:block">
      <nav className="flex h-full flex-row items-center divide-x-4 text-lg">
        <Link href={"/"}>
          <a
            className={cls(
              pathname === "/" ? "font-bold text-amber-500" : "text-gray-500",
              "px-2 text-center"
            )}
          >
            홈
          </a>
        </Link>
        <Link href={"/portfolio"}>
          <a
            className={cls(
              pathname.includes("/portfolio")
                ? "font-bold text-amber-500"
                : "text-gray-500",
              "px-2 text-center"
            )}
          >
            포트폴리오
          </a>
        </Link>
        <Link href={"/blog"}>
          <a
            className={cls(
              pathname.includes("/blog")
                ? "font-bold text-amber-500"
                : "text-gray-500",
              "px-2 text-center"
            )}
          >
            블로그
          </a>
        </Link>
        <Link href={"/contact"}>
          <a
            className={cls(
              pathname.includes("/contact")
                ? "font-bold text-amber-500"
                : "text-gray-500",
              "px-2 text-center"
            )}
          >
            게시판
          </a>
        </Link>
        <Link href={"/notice"}>
          <a
            className={cls(
              pathname.includes("/notice")
                ? "font-bold text-amber-500"
                : "text-gray-500",
              "px-2 text-center"
            )}
          >
            공지사항
          </a>
        </Link>
      </nav>
    </header>
  );
};
