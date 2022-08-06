import React, { useEffect, useState } from "react";
import { cls } from "@libs/client/utils";
import Link from "next/link";
import { useRouter } from "next/router";
import Menu from "@components/menu";
import Image from "next/image";
import useAdmin from "@libs/client/useAdmin";
import useMutation from "@libs/client/useMutation";
import useTimer from "@libs/client/useTimer";
import FullNavBar from "@components/full-navbar";
import Footer from "@components/footer";
import MobileNavigation from "@components/mobile-navbar";

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  backUrl?: string;
  isFooter?: boolean;
  [key: string]: any;
}

export interface LogoutResponse {
  ok: boolean;
}

export default function Layout({
  title,
  children,
  backUrl,
  isFooter,
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
    <div
      id="layout"
      className="flex w-full flex-col items-center justify-center"
    >
      <title>{head}</title>
      <header className="fixed top-0 z-[98] flex h-12 w-full max-w-xl items-center justify-center border-b bg-white  px-10 text-lg font-medium text-gray-800 md:max-w-full xl:h-16">
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
        <Link href={"/"}>
          <a className="absolute left-1/4 hidden xl:inline-block">
            <img src="myground.logo.png" className="h-12 w-12" />
          </a>
        </Link>
        <span className="xl:hidden">{title}</span>
        <div className="absolute right-64 hidden xl:block">
          <FullNavBar />
        </div>
        <div
          className="absolute right-4 top-1 cursor-pointer md:hidden"
          onClick={toggleDropdown}
        >
          <img
            src="https://bit.ly/3Q5gYKG"
            alt="profile"
            className="h-10 w-10 rounded-full bg-gray-500"
          />
        </div>
      </header>
      {isDropdown ? (
        <div className="absolute right-0 top-10 z-10 mt-2 w-48 origin-top-right rounded-md shadow-lg sm:right-[8%] md:right-[15%] lg:right-1/4 xl:right-[30%] 2xl:right-[36%]">
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
      <div
        id="child"
        className="mt-12 mb-16 h-[86vh] w-full max-w-xl overflow-y-scroll pb-10 pt-3 xl:mt-12 xl:flex xl:h-full xl:max-w-full xl:justify-center xl:py-0 xl:pb-5"
      >
        {children}
      </div>
      <MobileNavigation />
      {isFooter && <Footer />}
    </div>
  );
}
