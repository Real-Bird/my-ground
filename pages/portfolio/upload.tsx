import PortfolioUploadContainer from "@containers/Portfolio/PFUploadContainer";
import useAdmin from "@libs/client/useAdmin";
import type { NextPage } from "next";
import { useEffect } from "react";
import { useRouter } from "next/router";

const Upload: NextPage = () => {
  const { ok } = useAdmin();
  const router = useRouter();
  useEffect(() => {
    if (!ok) {
      router.push("/403");
    }
  }, []);
  return <PortfolioUploadContainer />;
};

export default Upload;
