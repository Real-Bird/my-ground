import type { NextPage } from "next";
import ClientErrorBoundary from "@components/clientErrorBoundary";

const NotAuth: NextPage = () => {
  return (
    <ClientErrorBoundary
      title="403:FORBIDDEN"
      errCode={403}
      errDescription="접근 권한이 없습니다."
    />
  );
};

export default NotAuth;
