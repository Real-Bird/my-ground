import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import { useEffect, useState } from "react";
import { Router, useRouter } from "next/router";
import { Analytics } from "@vercel/analytics/react";
import useAdmin from "@libs/client/useAdmin";
import { LoadingSpinner } from "@components/common";
import { ThemeContext } from "@libs/client/context";

function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const { ok: authOk } = useAdmin();
  const router = useRouter();

  useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

  useEffect(() => {
    const storageTheme = localStorage.getItem("rb_theme");
    if (typeof window !== undefined) {
      const mediaMatch = matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
      if (storageTheme) {
        setTheme(storageTheme as "light" | "dark");
        document.documentElement.classList.add(storageTheme);
      } else {
        setTheme(mediaMatch);
        document.documentElement.classList.add(mediaMatch);
      }
    }
  }, [theme, router]);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/pwabuilder-sw.js");
    }
  }, []);
  return (
    <SWRConfig
      value={{
        fetcher: (url: string) => fetch(url).then((res) => res.json()),
      }}
    >
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <div className="flex h-full w-full flex-col items-center transition-colors duration-100 ease-linear dark:bg-slate-800 dark:text-white">
          {loading ? (
            <div className="fixed left-0 top-0 flex h-screen w-screen items-center justify-center overflow-hidden dark:bg-slate-800">
              <LoadingSpinner />
            </div>
          ) : (
            <>
              <Component {...pageProps} />
              <Analytics
                beforeSend={(event) => {
                  if (
                    authOk ||
                    event.url.includes("auth") ||
                    event.url.includes("upload") ||
                    event.url.includes("revised")
                  ) {
                    return null;
                  }
                  return event;
                }}
              />
            </>
          )}
        </div>
      </ThemeContext.Provider>
    </SWRConfig>
  );
}

export default MyApp;
