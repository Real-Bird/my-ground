import type { NextPage } from "next";
import ClientErrorBoundary from "@components/clientErrorBoundary";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "@components/layout";
import Button from "@components/buttonComponent";

const NotFound: NextPage = () => {
  const router = useRouter();
  const [countDown, setCountDown] = useState(30);
  useEffect(() => {
    const timer = setInterval(() => {
      setCountDown((prev) => prev - 1);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);
  const onGoHome = () => router.push("/");
  useEffect(() => {
    if (countDown <= 0) {
      onGoHome();
    }
  }, [countDown]);
  return (
    <Layout title="404:NOT FOUND" backUrl="/">
    <div className="mx-3 flex h-3/5 flex-col items-center justify-center space-y-3">
      <div className="text-4xl font-bold">404</div>
      <div className="text-2xl font-semibold">요청하신 페이지를 찾을 수 없습니다.</div>
      <div>
        <span className="font-semibold text-red-600">{countDown} 초</span> 후
        홈으로 돌아갑니다.
      </div>
      <div>
        <Button text="Go to HOME" onClick={onGoHome} />
      </div>
    </div>
  </Layout>
    // <ClientErrorBoundary
    //   title="404:NOT FOUND"
    //   errCode={404}
    //   errDescription="요청하신 페이지를 찾을 수 없습니다."
    // />
  );
};

export default NotFound;
