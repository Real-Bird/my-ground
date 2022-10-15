import type { NextPage } from "next";
import ClientErrorBoundary from "@components/clientErrorBoundary";
import Layout from "@components/layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Button from "@components/buttonComponent";

const NotAuth: NextPage = () => {
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
    <Layout title="403:FORBIDDEN" backUrl="/">
      <div className="mx-3 flex h-3/5 flex-col items-center justify-center space-y-3">
        <div className="text-4xl font-bold">403</div>
        <div className="text-2xl font-semibold">접근 권한이 없습니다.</div>
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
    //   title="403:FORBIDDEN"
    //   errCode={403}
    //   errDescription="접근 권한이 없습니다."
    // />
  );
};

export default NotAuth;
