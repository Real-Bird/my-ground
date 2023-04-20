import type { NextPage } from "next";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import useSWR from "swr";
import useMutation from "@libs/client/useMutation";
import { cls } from "@libs/client/utils";
import useAdmin from "@libs/client/useAdmin";
import useWindowSize from "@libs/client/useWindowSize";
import { LayoutContainer } from "@containers/Common";
import { Input, Button } from "@components/common";
import UploadContainer from "@containers/Blog/UploadContainer";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), {
  ssr: false,
});

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
