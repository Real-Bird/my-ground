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
import { MyGroundPost } from "@prisma/client";
import Button from "@components/button-component";

interface UploadFormResponse {
  name: string;
  password: string;
  title: string;
  content: string;
}

interface RevisedResponse {
  ok: boolean;
  post: MyGroundPost;
}

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), {
  ssr: false,
});
const Upload: NextPage = () => {
  const [md, setMd] = useState<string | undefined>("");
  const router = useRouter();
  const { data } = useSWR<RevisedResponse>(
    router.query.id ? `/api/contact/${router.query.id}` : null
  );
  const [revised, { data: revisedData, loading: revisedLoading }] = useMutation(
    router.query.id ? `/api/contact/${router.query.id}` : null
  );
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    setValue,
  } = useForm<UploadFormResponse>({ mode: "onChange" });
  const [prevPwd, setPrevPwd] = useState<string>("");
  const onValid = (validForm: any) => {
    if (revisedLoading) return;
    validForm.content = md;
    if (validForm.password === prevPwd) {
      revised({
        ...validForm,
        title: validForm.title,
        content: validForm.content,
      });
    } else {
      setError("password", {
        type: "password",
        message: "Plz, Correct your password",
      });
    }
  };
  useEffect(() => {
    if (data && data.ok) {
      setValue("name", data?.post.name);
      setValue("title", data?.post.title);
      setPrevPwd(data?.post.password);
      setMd(data?.post.content);
    }
  }, [data]);
  useEffect(() => {
    if (revisedData && revisedData.ok) {
      router.push(`/contact/${router.query.id}`);
    }
  }, [revisedData, router]);
  return (
    <Layout title="Revised" backUrl="back">
      <form className="space-y-4 p-4" onSubmit={handleSubmit(onValid)}>
        <div className="flex flex-row justify-between">
          <Input
            register={register("name", {
              disabled: true,
            })}
            label="Name"
            name="name"
            type="text"
            isDisabled
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
            value={data?.post.content}
            onChange={setMd}
            autoFocus
            preview="edit"
            height={500}
            minHeight={500}
            maxHeight={500}
            visiableDragbar={false}
          />
        </div>
        <Button text="Revised your post" />
      </form>
    </Layout>
  );
};

export default Upload;
