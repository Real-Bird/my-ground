import React, { useEffect, useState } from "react";
import Menu from "@components/menu";
import useAdmin from "@libs/client/useAdmin";
import Footer from "@components/common/footer";
import MobileNavigation from "@components/common/mobileNavbar";
import Header from "@components/common/header";
import Head from "next/head";
import useWindowSize from "@libs/client/useWindowSize";

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  backUrl?: string;
  isFooter?: boolean;
  [key: string]: any;
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
        <ul className="absolute right-0 top-10 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 sm:right-[8%] md:right-[15%] lg:hidden">
          <Menu path="/auth" menu={isLogged ? "로그아웃" : "로그인"} />
          <Menu path="/notice" menu="공지사항" />
        </ul>
      )}
      <main
        id="child"
        className="mb-16 mt-12 flex h-[86vh] w-full max-w-xl justify-center overflow-y-scroll pb-4 pt-3 lg:mt-12 lg:h-full lg:max-w-full lg:pb-5 "
      >
        {children}
      </main>
      <MobileNavigation />
      {isFooter && <Footer />}
    </div>
  );
}
