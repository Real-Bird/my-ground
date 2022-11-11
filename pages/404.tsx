import type { NextPage } from "next";
import ClientErrorBoundary from "@components/common/clientErrorBoundary";

const NotFound: NextPage = () => {
  return (
    <ClientErrorBoundary
      title="404:NOT FOUND"
      errCode={404}
      errDescription="요청하신 페이지를 찾을 수 없습니다."
    />
  );
};

export default NotFound;
