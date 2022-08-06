import { LogoutResponse } from "@components/layout";
import useAdmin from "@libs/client/useAdmin";
import useMutation from "@libs/client/useMutation";
import { cls } from "@libs/client/utils";
import Link from "next/link";
import { useRouter } from "next/router";

export default function FullNavBar() {
  const { ok } = useAdmin();
  const router = useRouter();
  const [logout, { data, loading }] =
    useMutation<LogoutResponse>("/api/logout");
  const onLogout = () => {
    if (loading) return;
    logout({});
  };
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
              router.pathname === "/portfolio"
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
              router.pathname === "/blog"
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
              router.pathname === "/contact"
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
              router.pathname === "/notice"
                ? "font-bold text-amber-500"
                : "text-gray-500",
              "px-2 text-center"
            )}
          >
            공지사항
          </a>
        </Link>
        {ok ? (
          <div
            onClick={onLogout}
            className="cursor-pointer px-2 text-center text-gray-500"
          >
            로그아웃
          </div>
        ) : (
          <Link href={"/log-in"}>
            <a
              className={cls(
                router.pathname === "/log-in"
                  ? "font-bold text-amber-500"
                  : "text-gray-500",
                "px-2 text-center"
              )}
            >
              로그인
            </a>
          </Link>
        )}
      </nav>
    </header>
  );
}
