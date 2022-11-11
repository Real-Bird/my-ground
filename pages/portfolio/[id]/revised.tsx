import type { NextPage } from "next";
import Layout from "@components/common/layout";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Input from "@components/common/input";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import useMutation from "@libs/client/useMutation";
import Button from "@components/common/buttonComponent";
import useSWR from "swr";
import { MyPortfolio, StackBadge } from "@prisma/client";
import useAdmin from "@libs/client/useAdmin";
import useWindowSize from "@libs/client/useWindowSize";

interface PfwithStack extends MyPortfolio {
  stackBadge: StackBadge[];
}

interface PfResponse {
  ok: boolean;
  portfolio: PfwithStack;
}

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

const Revised: NextPage = () => {
  const { admin, ok } = useAdmin();
  const [md, setMd] = useState<string | undefined>("");
  const router = useRouter();
  const { data } = useSWR<PfResponse>(
    router.query.id ? `/api/portfolio/${router.query.id}` : null
  );
  const [revised, { data: revisedData, loading: revisedLoading }] = useMutation(
    `/api/portfolio/${router.query.id}`
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setFocus,
    watch,
  } = useForm<UploadFormResponse>({ mode: "onChange" });
  const onValid = (validForm: UploadFormResponse) => {
    if (revisedLoading) return;
    validForm.content = md;
    validForm.stacks = whichStack;
    if (!validForm.confirm) return;
    revised({ ...validForm });
  };
  const [whichStack, setWhichStack] = useState([]);
  const preview = useWindowSize();
  const onPushStacks = (stacksForm: any) => {
    if (stacksForm.key === "Enter" && stacksForm.target.value) {
      const [stack, color] = stacksForm.target.value.split("/");
      if (whichStack.flat().includes(stack)) {
        setValue("stacks", []);
        return;
      }
      setWhichStack((prev) => [...prev, [stack, color]]);
      setValue("stacks", []);
    }
  };
  const onDeleteStack = ({ target: { alt } }: any) => {
    setWhichStack((prev) => prev.filter((e) => e[0] !== alt));
  };
  useEffect(() => {
    if (!ok) {
      router.push("/403");
    }
  }, []);
  useEffect(() => {
    setFocus("thumbnail");
    if (data) {
      setValue("thumbnail", data?.portfolio.thumbnail);
      setValue("startDate", data?.portfolio.startDate);
      setValue("endDate", data?.portfolio.endDate);
      setValue("github", data?.portfolio.github);
      setValue("deploy", data?.portfolio.deploy);
      setValue("deployIcon", data?.portfolio.deployIcon);
      setValue("title", data?.portfolio.title);
      data?.portfolio.stackBadge.map((badge) =>
        setWhichStack((prev) => [...prev, [badge.stackName, badge.stackColor]])
      );
      setMd(data?.portfolio.content);
    }
  }, [data]);
  useEffect(() => {
    if (revisedData && revisedData.ok) {
      router.push(`/portfolio/${router.query.id}`);
    }
  }, [revisedData]);
  return (
    <Layout title="Revised" backUrl="back">
      <form
        className="space-y-4 p-4 xl:w-[80%] xl:pt-8"
        onSubmit={handleSubmit(onValid)}
      >
        <div className="xl:flex xl:w-full xl:flex-row xl:justify-center xl:space-x-5">
          <div className="flex flex-row justify-between xl:order-1 xl:w-fit xl:space-x-5">
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
          <div className="flex flex-row justify-between xl:order-3 xl:w-fit  xl:space-x-5">
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
          <div className="flex flex-row justify-between xl:order-2 xl:justify-start  xl:space-x-5">
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
        </div>
        <div className="flex-row space-x-5 xl:flex">
          <div className="xl:w-1/2">
            <Input
              register={register("title")}
              label="Title"
              name="title"
              type="text"
            />
          </div>
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
              {whichStack.map((stack, i) => (
                <div className="mr-1 py-1" key={i} onClick={onDeleteStack}>
                  <img
                    src={`https://img.shields.io/badge/${stack[0]}-${stack[1]}?style=flat&logo=${stack[0]}&logoColor=white`}
                    alt={stack[0]}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="h-[500px] rounded-md bg-slate-400">
          <MDEditor
            {...register("content")}
            value={md}
            onChange={setMd}
            autoFocus
            preview={preview ? "live" : "edit"}
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
          <Button text="Revised your post" />
        </div>
      </form>
    </Layout>
  );
};

export default Revised;
