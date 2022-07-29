import React, { useEffect, useState } from "react";
import { cls } from "@libs/client/utils";
import Link from "next/link";
import { useRouter } from "next/router";
import Menu from "@components/menu";
import Image from "next/image";
import useAdmin from "@libs/client/useAdmin";
import useMutation from "@libs/client/useMutation";

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  backUrl?: string;
  [key: string]: any;
}

interface LogoutResponse {
  ok: boolean;
}

export default function Layout({
  title,
  children,
  backUrl,
  ...rest
}: LayoutProps) {
  const [isDropdown, setIsDropdown] = useState(false);
  const [head, setHead] = useState("Loading || JS's Ground");
  const router = useRouter();
  const onBackUrl = () => {
    if (backUrl === "back") {
      router.back();
    } else {
      router.push(backUrl);
    }
  };
  useEffect(() => setHead(`${title} || JS's Ground`), []);
  const { ok } = useAdmin();
  const [logout, { data, loading }] =
    useMutation<LogoutResponse>("/api/logout");
  const [isLogged, setIsLogged] = useState(false);
  const toggleDropdown = () => {
    setIsDropdown((prev) => !prev);
    setIsLogged((prev) => ok);
  };
  const onLogout = () => {
    if (loading) return;
    logout({});
    setIsLogged(false);
  };
  return (
    <div className="flex justify-center">
      <title>{head}</title>
      <div className="fixed top-0 flex h-12 w-full max-w-xl items-center justify-center border-b bg-white  px-10 text-lg font-medium text-gray-800">
        {backUrl ? (
          <div
            className="absolute left-4 my-auto cursor-pointer"
            onClick={onBackUrl}
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
                d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
              />
            </svg>
          </div>
        ) : null}
        <span>{title}</span>
        <div
          className="absolute right-4 top-1 cursor-pointer"
          onClick={toggleDropdown}
        >
          <img
            src="https://bit.ly/3Q5gYKG"
            alt="profile"
            className="h-10 w-10 rounded-full bg-gray-500"
          />
        </div>
      </div>
      {isDropdown ? (
        <div className="absolute right-0 top-10 mt-2 w-48 origin-top-right rounded-md shadow-lg sm:right-[8%] md:right-[15%] lg:right-1/4 xl:right-[30%] 2xl:right-[36%]">
          <div className="rounded-md bg-white py-1 ring-1 ring-black ring-opacity-5">
            {isLogged ? (
              <div
                onClick={onLogout}
                className="block cursor-pointer px-4 py-2 text-sm leading-5 text-gray-900 transition duration-150 ease-in-out hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:border-b dark:border-gray-600 last:dark:border-b-0"
              >
                로그아웃
              </div>
            ) : (
              <Menu path="/log-in" menu="주인장 로그인" />
            )}
            <Menu path="/notice" menu="공지사항" />
            <Menu path="/contact" menu="문의" />
          </div>
        </div>
      ) : null}
      <div className="mt-12 h-[86vh] w-full max-w-xl overflow-y-scroll pb-10 pt-3 sm:pb-5">
        {children}
      </div>
      <nav className="fixed bottom-0 flex w-full max-w-xl justify-between border-t bg-white px-10 pb-5 pt-3 text-xs text-gray-700">
        <Link href="/">
          <a
            className={cls(
              router.pathname == "/"
                ? "text-amber-600"
                : "text-gray-500 transition-colors",
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
              router.pathname == "/portfolio"
                ? "text-amber-600"
                : "text-gray-500 transition-colors",
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
              router.pathname == "/blog"
                ? "text-amber-600"
                : "text-gray-500 transition-colors",
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
              router.pathname == "/contact"
                ? "text-amber-600"
                : "text-gray-500 transition-colors",
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
            <span>문의</span>
          </a>
        </Link>
      </nav>
    </div>
  );
}
