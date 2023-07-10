import { ThemeButton } from "@components/common/ThemeBtnCmpt";
import { cls } from "@libs/client/utils";
import Link from "next/link";

interface FullNavBarProps {
  pathname: string;
  theme: string;
  handleTheme: () => void;
}

export const FullNavBar = ({
  pathname,
  theme,
  handleTheme,
}: FullNavBarProps) => {
  return (
    <header className="fixed right-4 top-0 z-[9999] hidden h-12 lg:block">
      <nav className="flex h-full items-center divide-x-4 text-lg">
        <span className="mx-2">
          <ThemeButton theme={theme} handleTheme={handleTheme} />
        </span>
        <Link href={"/"}>
          <a
            className={cls(
              pathname === "/"
                ? "font-bold text-amber-500"
                : "text-gray-500 dark:text-white",
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
                : "text-gray-500 dark:text-white",
              "px-2 text-center"
            )}
          >
            포트폴리오
          </a>
        </Link>
        <Link href={"/contact"}>
          <a
            className={cls(
              pathname.includes("/contact")
                ? "font-bold text-amber-500"
                : "text-gray-500 dark:text-white",
              "px-2 text-center"
            )}
          >
            게시판
          </a>
        </Link>
      </nav>
    </header>
  );
};
