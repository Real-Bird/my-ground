import { Layout, MobileNavigation, Header } from "@components/common";
import useAdmin from "@libs/client/useAdmin";
import useDetectScroll from "@libs/client/useDetectScroll";
import useWindowSize from "@libs/client/useWindowSize";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

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
  const toggleDropdown = () => {
    setIsDropdown((prev) => !prev);
  };
  const isSize = useWindowSize(1024);
  useEffect(() => {
    if (isSize) setIsDropdown(false);
  }, [isSize]);
  const router = useRouter();
  const onBackUrl = () => {
    if (backUrl === "back") {
      router.back();
    } else {
      router.push(backUrl);
    }
  };
  const isHeaderShow = useDetectScroll();
  return (
    <div
      id="layout"
      className="flex w-[99%] flex-col items-center justify-center"
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
      />
      <Layout>{children}</Layout>
      <MobileNavigation pathname={router.pathname} />
    </div>
  );
};
