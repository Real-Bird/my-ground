import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import { useEffect, useState } from "react";
import { Router } from "next/router";
import LoadingSpinner from "@components/common/loadingSpinner";
import { Analytics } from "@vercel/analytics/react";
import useAdmin from "@libs/client/useAdmin";

function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false);
  const { ok: authOk } = useAdmin();
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
  return (
    <SWRConfig
      value={{
        fetcher: (url: string) => fetch(url).then((res) => res.json()),
      }}
    >
      <div className="flex w-full flex-col items-center justify-center">
        {loading ? (
          <LoadingSpinner />
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
                console.log("hi");
                return event;
              }}
            />
          </>
        )}
      </div>
    </SWRConfig>
  );
}

export default MyApp;
