import { Layout, MobileNavigation, Header } from "@components/common";
import { ThemeButton } from "@components/common/ThemeBtnCmpt";
import { ThemeContext } from "@libs/client/context";
import useAdmin from "@libs/client/useAdmin";
import useDetectScroll from "@libs/client/useDetectScroll";
import useWindowSize from "@libs/client/useWindowSize";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";

interface LayoutContainerProps {
  children: React.ReactNode;
  title: string;
  backUrl?: string;
}

export const LayoutContainer = ({
  title,
  children,
  backUrl,
}: LayoutContainerProps) => {
  const [isDropdown, setIsDropdown] = useState(false);
  const { ok } = useAdmin();
  const isSize = useWindowSize(1024);
  const router = useRouter();
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleDropdown = () => {
    setIsDropdown((prev) => !prev);
  };

  const onBackUrl = () => {
    if (backUrl === "back") {
      router.back();
    } else {
      router.push(backUrl);
    }
  };

  const handleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      localStorage.setItem("rb_theme", "dark");
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      setTheme("light");
      localStorage.setItem("rb_theme", "light");
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
  };

  useEffect(() => {
    if (isSize) setIsDropdown(false);
  }, [isSize]);
  const isHeaderShow = useDetectScroll();
  return (
    <div
      id="layout"
      className="flex w-full flex-col items-center justify-center dark:bg-slate-800"
      onClick={() => (isDropdown ? setIsDropdown(false) : null)}
    >
      <Head>
        <title>{`${title} || RB's Ground`}</title>
      </Head>
      <Header
        backUrl={backUrl}
        title={title}
        onToggleDropdown={toggleDropdown}
        onBackUrl={onBackUrl}
        pathname={router.pathname}
        isLogged={ok}
        isDropdown={isDropdown}
        isHeaderShow={isHeaderShow}
        theme={theme}
        handleTheme={handleTheme}
      />
      <Layout>{children}</Layout>
      <MobileNavigation pathname={router.pathname} />
    </div>
  );
};
