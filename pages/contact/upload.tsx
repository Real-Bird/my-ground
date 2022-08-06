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
import Link from "next/link";
import { cls } from "@libs/client/utils";

interface UploadFormResponse {
  name: string;
  password: string;
  title: string;
  content: string;
  secret: boolean;
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
    watch,
    getValues,
  } = useForm<UploadFormResponse>({ mode: "onChange" });
  const onValid = (validForm: any) => {
    if (loading) return;
    validForm.content = md;
    upload({ ...validForm });
  };
  const [preview, setPreview] = useState(false);
  const handleResize = () => {
    setPreview(window.innerWidth >= 1280 ? true : false);
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    if (data && data.ok) {
      router.push(`/contact`);
    }
  }, [data]);
  return (
    <Layout title="Opinion" backUrl="back">
      <div className="xl:w-[80%] xl:py-5">
        <div className="mx-auto w-fit border-2 text-center">
          <Link href="/notice/02-Markdown-tutorial">
            <a
              className="px-3 font-bold text-red-500 xl:text-xl"
              target={"_blank"}
            >
              ❗ 마크다운 게시글 작성법 ❗
            </a>
          </Link>
        </div>
        <form className="space-y-4 p-4" onSubmit={handleSubmit(onValid)}>
          <div className="xl:flex xl:flex-col-reverse">
            <div className="flex flex-row justify-between xl:justify-end xl:space-x-5 xl:py-3">
              <div className="hidden w-1/2 text-left xl:block">
                <p>
                  <span className="text-red-500">✔</span> 게시글을 작성하면
                  토큰이 생성됩니다.
                </p>
                <p>
                  <span className="text-red-500">✔</span> 토큰은 비밀글 검증에
                  사용합니다.
                </p>
                <p>
                  <span className="text-red-500">✔</span> 캐시를 삭제하면
                  비밀글을 확인할 수 없습니다.
                </p>
              </div>
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
            <div className="w-32">
              <input
                {...register("secret")}
                type="checkbox"
                id="secret"
                className="peer hidden"
              />
              <label
                htmlFor="secret"
                className={cls(
                  getValues("secret") && "border-amber-600 bg-amber-600",
                  "flex w-full cursor-pointer flex-row items-center justify-center space-x-1 rounded-lg border-2 border-amber-500 bg-amber-500 p-3 text-white hover:border-amber-600 hover:bg-amber-600 peer-checked:text-white"
                )}
              >
                {watch("secret") ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
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
                    className="h-6 w-6 text-white"
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
                <div className="w-full text-sm font-semibold">비밀글</div>
              </label>
            </div>
            <Button text="Upload your opinion" />
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Upload;
