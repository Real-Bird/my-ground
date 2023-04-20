import type { NextPage } from "next";
import { useEffect } from "react";
import { useRouter } from "next/router";
import useAdmin from "@libs/client/useAdmin";
import RevisedContainer from "@containers/Blog/RevisedContainer";

const BlogRevised: NextPage = () => {
  const { ok } = useAdmin();
  const router = useRouter();

  useEffect(() => {
    if (!ok) {
      router.push("/403");
    }
  }, []);
  return <RevisedContainer />;
};

export default BlogRevised;
