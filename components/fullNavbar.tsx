import { cls } from "@libs/client/utils";
import Link from "next/link";
import { useRouter } from "next/router";

export default function FullNavBar() {
  const router = useRouter();
  return (
    <header>
      <nav className="flex flex-row divide-x-4">
        <Link href={"/"}>
          <a
            className={cls(
              router.pathname === "/"
                ? "font-bold text-amber-500"
                : "text-gray-500",
              "px-2 text-center"
            )}
          >
            홈
          </a>
        </Link>
        <Link href={"/portfolio"}>
          <a
            className={cls(
              router.pathname.includes("/portfolio")
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
              router.pathname.includes("/blog")
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
              router.pathname.includes("/contact")
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
              router.pathname.includes("/notice")
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
}
