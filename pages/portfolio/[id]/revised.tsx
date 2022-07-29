import type { NextPage } from "next";
import Layout from "@components/layout";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Input from "@components/input";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import useMutation from "@libs/client/useMutation";
import Button from "@components/button-component";
import useSWR from "swr";
import { MyPortfolio, StackBadge } from "@prisma/client";
import useAdmin from "@libs/client/useAdmin";

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
  developDate: string;
  github: string;
  deploy: string;
  content: string;
  deployIcon?: string;
  stacks: string[];
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
  } = useForm<UploadFormResponse>({ mode: "onChange" });
  const onValid = (validForm: UploadFormResponse) => {
    if (revisedLoading) return;
    validForm.content = md;
    validForm.stacks = stackNames;
    if (
      !validForm.content ||
      !validForm.deploy ||
      !validForm.developDate ||
      !validForm.github ||
      !validForm.thumbnail ||
      !validForm.title
    )
      return;
    revised({ ...validForm });
  };
  const [stackNames, setStackNames] = useState([]);
  const [whichStack, setWhichStack] = useState("");
  const onPushStacks = (stacksForm: any) => {
    if (stacksForm.key === "Enter" && stacksForm.target.value) {
      const [stack, color] = stacksForm.target.value.split("/");
      setWhichStack(stack);
      setStackNames((prev) => [
        ...prev,
        `https://img.shields.io/badge/${stack}-${color}?style=flat&logo=${stack}&logoColor=white`,
      ]);
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
    if (data) {
      setValue("thumbnail", data?.portfolio.thumbnail);
      setValue("developDate", data?.portfolio.developDate);
      setValue("github", data?.portfolio.github);
      setValue("deploy", data?.portfolio.deploy);
      setValue("deployIcon", data?.portfolio.deployIcon);
      setValue("title", data?.portfolio.title);
      data?.portfolio.stackBadge.map((badge) =>
        setStackNames((prev) => [...prev, badge.badgeIcon])
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
      <form className="space-y-4 p-4" onSubmit={handleSubmit(onValid)}>
        <Input
          register={register("thumbnail")}
          label="Thumbnail"
          name="thumbnail"
          type="text"
          error={errors.thumbnail?.message}
        />
        <Input
          register={register("developDate")}
          label="Development Date"
          name="developDate"
          type="text"
          error={errors.developDate?.message}
        />
        <Input
          register={register("github")}
          label="Github"
          name="github"
          type="text"
          error={errors.github?.message}
        />
        <Input
          register={register("deploy")}
          label="Deploy Url"
          name="deploy"
          type="text"
          error={errors.deploy?.message}
        />
        <Input
          register={register("deployIcon")}
          label="Deploy Icon"
          name="deployIcon"
          type="text"
        />
        <Input
          register={register("title")}
          label="Title"
          name="title"
          type="text"
          error={errors.title?.message}
        />
        <div className="relative flex flex-col items-start  rounded-md shadow-sm">
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
          <div className="flex flex-row space-x-2">
            {stackNames
              .filter((ele, i) => {
                return stackNames.indexOf(ele) === i;
              })
              .map((stack, i) => (
                <div className="py-1" key={i} onClick={onDeleteStack}>
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

export default Revised;
