import React, { useEffect, useState } from "react";
import Menu from "@components/menu";
import useAdmin from "@libs/client/useAdmin";
import useMutation from "@libs/client/useMutation";
import Footer from "@components/footer";
import MobileNavigation from "@components/mobile-navbar";
import Header from "@components/header";

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
  useEffect(() => setHead(`${title} || JS's Ground`), [title]);
  const { ok } = useAdmin();
  const [logout, { data: logoutData, loading }] =
    useMutation<LogoutResponse>("/api/logout");
  const [isLogged, setIsLogged] = useState(ok);
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
      <Header
        backUrl={backUrl}
        title={title}
        onToggleDropdown={toggleDropdown}
      />
      {isDropdown ? (
        <div className="absolute right-0 top-10 mt-2 w-48 origin-top-right rounded-md shadow-lg sm:right-[8%] md:right-[15%] lg:right-1/4 xl:right-[30%] 2xl:right-[36%]">
          <ul className="rounded-md bg-white py-1 ring-1 ring-black ring-opacity-5">
            {isLogged ? (
              <li
                onClick={onLogout}
                className="block cursor-pointer px-4 py-2 text-sm leading-5 text-gray-900 transition duration-150 ease-in-out hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:border-b dark:border-gray-600 last:dark:border-b-0"
              >
                로그아웃
              </li>
            ) : (
              <Menu path="/log-in" menu="주인장 로그인" />
            )}
            <Menu path="/notice" menu="공지사항" />
            <Menu path="/contact" menu="문의" />
          </ul>
        </div>
      ) : null}
      <div
        id="child"
        className="mt-12 mb-16 flex h-[86vh] w-full max-w-xl justify-center overflow-y-scroll pb-8 pt-3 lg:mt-12 lg:h-full lg:max-w-full lg:pb-5"
      >
        {children}
      </div>
      <MobileNavigation />
      {isFooter && <Footer />}
    </div>
  );
}
