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
  const [md, setMd] = useState<string | undefined>("# Hello World");
  const router = useRouter();
  const [upload, { data, loading }] = useMutation("/api/contact");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UploadFormResponse>({ mode: "onChange" });
  const onValid = (validForm: any) => {
    if (loading) return;
    validForm.content = md;
    upload({ ...validForm });
  };
  useEffect(() => {
    if (data && data.ok) {
      router.push(`/contact`);
    }
  }, [data]);
  return (
    <Layout title="Opinion">
      <form className="space-y-4 p-4" onSubmit={handleSubmit(onValid)}>
        <div className="flex flex-row justify-between">
          <Input
            register={register("name", {
              required: "Plz, Write your name.",
              maxLength: { value: 5, message: "5 letter at most." },
            })}
            label="Name"
            name="name"
            type="text"
            error={errors.name?.message}
          />
          <Input
            register={register("password", {
              required: "Plz, Write your password.",
            })}
            label="Password"
            name="pwd"
            type="password"
            error={errors.password?.message}
          />
        </div>
        <Input
          register={register("title", {
            required: "Plz, Write the title.",
            maxLength: { value: 30, message: "30 letter at most" },
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

        <button className="w-full rounded-md border border-transparent  bg-amber-500 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2">
          Upload your opinion
        </button>
      </form>
    </Layout>
  );
};

export default Upload;
