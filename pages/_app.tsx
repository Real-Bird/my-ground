import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import { useEffect, useState } from "react";
import { Router } from "next/router";
import useTimer from "@libs/client/useTimer";
import FullNavBar from "@components/full-navbar";
import Link from "next/link";

function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const start = () => {
      console.log("start");
      setLoading(true);
    };
    const end = () => {
      console.log("finished");
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
  const {
    date: { year, month, day },
    timer: { amPm, hour, minute, second },
  } = useTimer();
  return (
    <SWRConfig
      value={{
        fetcher: (url: string) => fetch(url).then((res) => res.json()),
      }}
    >
      <div className="flex w-full flex-col items-center justify-center">
        <div className="fixed right-16 top-1 z-[100] h-10 w-24 rounded-md bg-amber-400 text-center xl:h-14 xl:w-36">
          <div className="text-sm xl:text-xl">
            <div>{`${year}.${month}.${day}`}</div>
            <div>{`${amPm} ${hour}:${minute}:${second}`}</div>
          </div>
        </div>
        <header className="fixed top-0 z-[98] hidden h-12 w-full max-w-xl items-center justify-center border-b  bg-white px-10 text-lg font-medium text-gray-800 md:h-16 md:max-w-full xl:flex">
          <div className="absolute left-1/4 hidden md:inline-block">
            <img
              src="https://raw.githubusercontent.com/Real-Bird/my-ground/dev-branch2/public/myground.logo.png"
              className="h-12 w-12"
            />
          </div>
          <div className="absolute right-64 hidden xl:block">
            <FullNavBar />
          </div>
        </header>
        {loading ? (
          <div className="absolute top-[15%] mx-3 flex h-3/5 flex-col items-center justify-center space-y-3">
            <title>LOADING || JS&apos;s Ground</title>
            <svg
              width="135"
              height="135"
              viewBox="0 0 135 135"
              xmlns="http://www.w3.org/2000/svg"
              fill="#f59e0b"
            >
              <path d="M67.447 58c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10zm9.448 9.447c0 5.523 4.477 10 10 10 5.522 0 10-4.477 10-10s-4.478-10-10-10c-5.523 0-10 4.477-10 10zm-9.448 9.448c-5.523 0-10 4.477-10 10 0 5.522 4.477 10 10 10s10-4.478 10-10c0-5.523-4.477-10-10-10zM58 67.447c0-5.523-4.477-10-10-10s-10 4.477-10 10 4.477 10 10 10 10-4.477 10-10z">
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 67 67"
                  to="-360 67 67"
                  dur="2.5s"
                  repeatCount="indefinite"
                />
              </path>
              <path d="M28.19 40.31c6.627 0 12-5.374 12-12 0-6.628-5.373-12-12-12-6.628 0-12 5.372-12 12 0 6.626 5.372 12 12 12zm30.72-19.825c4.686 4.687 12.284 4.687 16.97 0 4.686-4.686 4.686-12.284 0-16.97-4.686-4.687-12.284-4.687-16.97 0-4.687 4.686-4.687 12.284 0 16.97zm35.74 7.705c0 6.627 5.37 12 12 12 6.626 0 12-5.373 12-12 0-6.628-5.374-12-12-12-6.63 0-12 5.372-12 12zm19.822 30.72c-4.686 4.686-4.686 12.284 0 16.97 4.687 4.686 12.285 4.686 16.97 0 4.687-4.686 4.687-12.284 0-16.97-4.685-4.687-12.283-4.687-16.97 0zm-7.704 35.74c-6.627 0-12 5.37-12 12 0 6.626 5.373 12 12 12s12-5.374 12-12c0-6.63-5.373-12-12-12zm-30.72 19.822c-4.686-4.686-12.284-4.686-16.97 0-4.686 4.687-4.686 12.285 0 16.97 4.686 4.687 12.284 4.687 16.97 0 4.687-4.685 4.687-12.283 0-16.97zm-35.74-7.704c0-6.627-5.372-12-12-12-6.626 0-12 5.373-12 12s5.374 12 12 12c6.628 0 12-5.373 12-12zm-19.823-30.72c4.687-4.686 4.687-12.284 0-16.97-4.686-4.686-12.284-4.686-16.97 0-4.687 4.686-4.687 12.284 0 16.97 4.686 4.687 12.284 4.687 16.97 0z">
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 67 67"
                  to="360 67 67"
                  dur="8s"
                  repeatCount="indefinite"
                />
              </path>
            </svg>
          </div>
        ) : (
          <Component {...pageProps} />
        )}
      </div>
    </SWRConfig>
  );
}

export default MyApp;
