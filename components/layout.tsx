import React, { useEffect, useState } from "react";
import Menu from "@components/menu";
import useAdmin from "@libs/client/useAdmin";
import useMutation from "@libs/client/useMutation";
import Footer from "@components/footer";
import MobileNavigation from "@components/mobileNavbar";
import Header from "@components/header";
import Head from "next/head";
import useWindowSize from "@libs/client/useWindowSize";

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
  const { ok } = useAdmin();
  const [isLogged, setIsLogged] = useState(ok);
  const toggleDropdown = () => {
    setIsDropdown((prev) => !prev);
    setIsLogged((prev) => ok);
  };
  const isSize = useWindowSize(1024);
  useEffect(() => {
    if (isSize) setIsDropdown(false);
  }, [isSize]);
  return (
    <div
      id="layout"
      className="flex w-full flex-col items-center justify-center"
    >
      <Head>
        <title>{`${title} || RB's Ground`}</title>
      </Head>
      <Header
        backUrl={backUrl}
        title={title}
        onToggleDropdown={toggleDropdown}
      />
      {isDropdown && (
        <div className="absolute right-0 top-10 mt-2 w-48 origin-top-right rounded-md shadow-lg sm:right-[8%] md:right-[15%] lg:hidden">
          <ul className="rounded-md bg-white py-1 ring-1 ring-black ring-opacity-5">
            <Menu path="/auth" menu={isLogged ? "로그아웃" : "로그인"} />
            <Menu path="/notice" menu="공지사항" />
          </ul>
        </div>
      )}
      <main
        id="child"
        className="mt-12 mb-16 flex h-[86vh] w-full max-w-xl justify-center overflow-y-scroll pb-8 pt-3 lg:mt-12 lg:h-full lg:max-w-full lg:pb-5"
      >
        {children}
      </main>
      <MobileNavigation />
      {isFooter && <Footer />}
    </div>
  );
}
