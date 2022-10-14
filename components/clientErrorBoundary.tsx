import Layout from "@components/layout";
import Button from "@components/buttonComponent";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface ErrorBoundaryProps {
  title: string;
  errCode: number;
  errDescription: string;
}

const ClientErrorBoundary = ({
  title,
  errCode,
  errDescription,
}: ErrorBoundaryProps) => {
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
    <Layout title={title} backUrl="/">
      <div className="mx-3 flex h-3/5 flex-col items-center justify-center space-y-3">
        <div className="text-4xl font-bold">{errCode}</div>
        <div className="text-2xl font-semibold">{errDescription}</div>
        <div>
          <span className="font-semibold text-red-600">{countDown} 초</span> 후
          홈으로 돌아갑니다.
        </div>
        <div>
          <Button text="Go to HOME" onClick={onGoHome} />
        </div>
      </div>
    </Layout>
  );
};

export default ClientErrorBoundary;
