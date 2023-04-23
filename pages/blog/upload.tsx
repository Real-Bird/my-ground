import type { NextPage } from "next";
import { useEffect } from "react";
import { useRouter } from "next/router";
import useAdmin from "@libs/client/useAdmin";
import UploadContainer from "@containers/Blog/UploadContainer";

const Upload: NextPage = () => {
  const { ok } = useAdmin();
  const router = useRouter();
  useEffect(() => {
    if (!ok) {
      router.push("/403");
    }
  }, []);
  return <UploadContainer />;
};

export default Upload;
