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
import Button from "@components/buttonComponent";
import { cls } from "@libs/client/utils";
import useAdmin from "@libs/client/useAdmin";
import useWindowSize from "@libs/client/useWindowSize";

interface UploadFormResponse {
  category: string;
  title: string;
  content: string;
  summary: string;
}

export interface CategoricalResponse {
  ok: boolean;
  categories: {
    id: number;
    category: string;
  }[];
}

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), {
  ssr: false,
});

const Upload: NextPage = () => {
  const { admin, ok } = useAdmin();
  const [md, setMd] = useState<string | undefined>("");
  const router = useRouter();
  const { data: categoriesData } = useSWR<CategoricalResponse>(
    "/api/blog/categories"
  );
  const [upload, { data: uploadData, loading: uploadLoading }] =
    useMutation("/api/blog");
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
  } = useForm<UploadFormResponse>({ mode: "onChange" });
  const [keyword, setKeyword] = useState<string>("");
  const [viewKeyword, setViewKeyword] = useState<boolean>(false);
  const onValid = (validForm: UploadFormResponse) => {
    if (uploadLoading) return;
    validForm.content = md;
    upload({ ...validForm });
  };
  const searchKeyword = ({ target: { value } }: any) => {
    setKeyword(value);
    setViewKeyword(true);
  };
  const toggleKeyword = ({ target: { textContent } }: any) => {
    setValue("category", textContent);
    setViewKeyword(false);
  };
  const preview = useWindowSize();
  useEffect(() => {
    if (uploadData && uploadData.ok) {
      router.push(`/blog`);
    }
  }, [uploadData]);
  useEffect(() => {
    if (!ok) {
      router.push("/403");
    }
  }, []);
  return (
    <Layout title="Post" backUrl="back">
      <form className="space-y-4 p-4 lg:w-4/5" onSubmit={handleSubmit(onValid)}>
        <div className="relative">
          <Input
            register={register("category", {
              required: "Plz, Write this post's category",
              onChange: searchKeyword,
              value: keyword,
            })}
            label="Category"
            name="category"
            type="text"
          />
          <ul className="absolute z-10 w-full" id="category">
            {categoriesData?.categories.map((category) => (
              <li
                key={category.id}
                className={cls(
                  keyword && viewKeyword && category.category.includes(keyword)
                    ? "block"
                    : "hidden",
                  "w-full rounded-md border border-gray-300 bg-white px-3 py-2 placeholder-gray-400 shadow-sm hover:bg-gray-300"
                )}
                onClick={toggleKeyword}
              >
                {category.category.includes(keyword) && category.category}
              </li>
            ))}
          </ul>
        </div>
        <Input
          register={register("title", {
            required: "Plz, Write the title.",
          })}
          label="Title"
          name="title"
          type="text"
          error={errors.title?.message}
        />
        <Input
          register={register("summary", {
            required: "Plz, Write the summary.",
            maxLength: {
              value: 150,
              message: "Allow max length 150",
            },
          })}
          label="Summary"
          name="summary"
          type="text"
          error={errors.summary?.message}
        />
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
        <Button text="Upload My Post" />
      </form>
    </Layout>
  );
};

export default Upload;
