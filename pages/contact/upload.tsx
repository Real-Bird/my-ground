import type { NextPage } from "next";
import Layout from "@components/layout";
import { useForm } from "react-hook-form";
import { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Input from "@components/input";
import { cls } from "@libs/client/utils";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), {
  ssr: false,
});

function Upload(): JSX.Element {
  const [md, setMd] = useState<string | undefined>("# Hello World");
  const router = useRouter();
  const { register, handleSubmit, watch } = useForm({ mode: "onChange" });
  const onValid = (validForm: any) => {
    validForm.mdEditor = md;
    console.log(validForm);
  };
  useEffect(() => {}, []);
  return (
    <Layout title="Opinion">
      <form className="space-y-4 p-4" onSubmit={handleSubmit(onValid)}>
        <div className="flex flex-row justify-between">
          <Input
            register={register("name", { required: true })}
            label="Name"
            name="name"
            type="text"
          />
          <Input
            register={register("Password", { required: true })}
            label="Password"
            name="pwd"
            type="password"
          />
        </div>
        <div className="h-[590px] rounded-md bg-slate-400">
          <MDEditor
            {...register("mdEditor")}
            value={md}
            onChange={setMd}
            autoFocus
            preview="edit"
            height={590}
            minHeight={590}
            maxHeight={590}
            visiableDragbar={false}
          />
        </div>

        <button className="w-full rounded-md border border-transparent  bg-amber-500 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2">
          Upload your opinion
        </button>
      </form>
    </Layout>
  );
}

export default Upload;
