import type { NextPage } from "next";
import { ErrorBoundaryContainer } from "@containers/Common";

const NotAuth: NextPage = () => {
  return (
    <ErrorBoundaryContainer
      title="403:FORBIDDEN"
      errCode={403}
      errDescription="접근 권한이 없습니다."
    />
  );
};

export default NotAuth;
