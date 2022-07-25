import type { NextPage } from "next";
import Layout from "@components/layout";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Input from "@components/input";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import useSWR from "swr";
import useMutation from "@libs/client/useMutation";
import Button from "@components/button-component";

interface UploadFormResponse {
  name: string;
  password: string;
  title: string;
  content: string;
}

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), {
  ssr: false,
});
const Upload: NextPage = () => {
  const [md, setMd] = useState<string | undefined>("");
  const router = useRouter();
  const [upload, { data, loading }] = useMutation("/api/portfolio");
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<UploadFormResponse>({ mode: "onChange" });
  const onValid = (validForm: any) => {
    if (loading) return;
    validForm.content = md;
    upload({ ...validForm });
  };
  useEffect(() => {
    if (data && data.ok) {
      router.push(`/portfolio`);
    }
  }, [data]);
  return (
    <Layout title="Opinion" backUrl="back">
      <form className="space-y-4 p-4" onSubmit={handleSubmit(onValid)}>
        <Input
          register={register("password", {
            required: "Plz, Write your password.",
          })}
          label="Password"
          name="pwd"
          type="password"
          error={errors.password?.message}
        />
        <Input
          register={register("title", {
            required: "Plz, Write the title.",
          })}
          label="Title"
          name="title"
          type="text"
          error={errors.title?.message}
        />
        <div className="h-[500px] rounded-md bg-slate-400">
          <MDEditor
            {...register("content")}
            value={md}
            onChange={setMd}
            autoFocus
            preview="edit"
            height={500}
            minHeight={500}
            maxHeight={500}
            visiableDragbar={false}
          />
        </div>
        <Button text="Upload My Portfolio" />
      </form>
    </Layout>
  );
};

export default Upload;
