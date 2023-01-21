import { ClientErrorBoundary } from "@components/common";
import { LayoutContainer } from "@containers/Common";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface ErrorBoundaryProps {
  title: string;
  errCode: number;
  errDescription: string;
}

export const ErrorBoundaryContainer = ({
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
    <LayoutContainer title={title}>
      <ClientErrorBoundary
        errCode={errCode}
        errDescription={errDescription}
        onGoHome={onGoHome}
        countDown={countDown}
      />
    </LayoutContainer>
  );
};
