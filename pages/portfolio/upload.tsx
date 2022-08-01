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
import { cls } from "@libs/client/utils";
import useAdmin from "@libs/client/useAdmin";

interface UploadFormResponse {
  thumbnail: string;
  title: string;
  startDate: string;
  endDate: string;
  github: string;
  deploy: string;
  content: string;
  deployIcon?: string;
  stacks: string[];
  confirm: boolean;
}

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), {
  ssr: false,
});

const Upload: NextPage = () => {
  const { admin, ok } = useAdmin();
  const [md, setMd] = useState<string | undefined>("");
  const router = useRouter();
  const [upload, { data, loading }] = useMutation(`/api/portfolio`);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setFocus,
    watch,
  } = useForm<UploadFormResponse>({ mode: "onChange" });
  const onValid = (validForm: UploadFormResponse) => {
    if (loading) return;
    if (!validForm.confirm) return;
    validForm.content = md;
    validForm.stacks = stackNames;
    upload({ ...validForm });
  };
  const [stackNames, setStackNames] = useState([]);
  const [whichStack, setWhichStack] = useState("");
  const onPushStacks = (stacksForm: any) => {
    if (stacksForm.key === "Enter" && stacksForm.target.value) {
      const [stack, color] = stacksForm.target.value.split("/");
      setWhichStack(stack);
      setStackNames((prev) =>
        [
          ...prev,
          `https://img.shields.io/badge/${stack}-${color}?style=flat&logo=${stack}&logoColor=white`,
        ].filter((element, index) => prev.indexOf(element) !== index)
      );
      setValue("stacks", []);
    }
  };
  const onDeleteStack = ({ target: { src } }: any) => {
    setStackNames((prev) => prev.filter((i) => i !== src));
  };
  useEffect(() => {
    if (!ok) {
      router.push("/portfolio");
    }
  }, []);
  useEffect(() => {
    setFocus("thumbnail");
  }, []);
  useEffect(() => {
    if (data && data.ok) {
      router.push(`/portfolio`);
    }
  }, [data]);
  return (
    <Layout title="Work" backUrl="back">
      <form className="space-y-4 p-4" onSubmit={handleSubmit(onValid)}>
        <div className="flex flex-row justify-between">
          <Input
            register={register("thumbnail")}
            label="Thumbnail"
            name="thumbnail"
            type="text"
          />
          <Input
            register={register("github")}
            label="Github"
            name="github"
            type="text"
          />
        </div>
        <div className="flex flex-row justify-between">
          <Input
            register={register("startDate")}
            label="Development Start"
            name="startDate"
            type="text"
          />
          <span className="translate-y-5 text-4xl"> - </span>
          <Input
            register={register("endDate")}
            label="Development End"
            name="endDate"
            type="text"
          />
        </div>
        <div className="flex flex-row justify-between">
          <Input
            register={register("deploy")}
            label="Deploy Url"
            name="deploy"
            type="text"
          />
          <Input
            register={register("deployIcon")}
            label="Deploy Icon"
            name="deployIcon"
            type="text"
          />
        </div>
        <Input
          register={register("title")}
          label="Title"
          name="title"
          type="text"
        />
        <div className="relative flex flex-row items-start  rounded-md shadow-sm">
          <div className="flex flex-col">
            <label
              htmlFor="stacks"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Stack Icon
            </label>
            <input
              className="w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-amber-500"
              {...register("stacks")}
              id="stacks"
              onKeyDown={onPushStacks}
            />
          </div>
          <div className="mx-3 flex w-1/2 flex-row flex-wrap justify-items-start">
            {stackNames.map((stack, i) => (
              <div className="mr-1 py-1" key={i} onClick={onDeleteStack}>
                <img src={stack} alt={whichStack} />
              </div>
            ))}
          </div>
        </div>
        <div className="h-[500px] rounded-md bg-slate-400">
          <MDEditor
            {...register("content")}
            value={md}
            onChange={setMd}
            preview="edit"
            height={500}
            minHeight={500}
            maxHeight={500}
            visiableDragbar={false}
          />
        </div>
        <div className="flex flex-row space-x-2">
          <div>
            <input
              {...register("confirm")}
              type="checkbox"
              id="confirm"
              className="peer hidden"
            />
            <label
              htmlFor="confirm"
              className="flex w-full cursor-pointer items-center justify-center space-x-1 rounded-lg border-2 border-amber-500 bg-amber-500 p-3 text-white hover:border-amber-600 hover:bg-amber-600 peer-checked:text-white"
            >
              {watch("confirm") ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
              )}
              <div className="w-full font-semibold">Confirm</div>
            </label>
          </div>
          <Button text="Upload My Portfolio" />
        </div>
      </form>
    </Layout>
  );
};

export default Upload;
