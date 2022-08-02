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
import { MyBlog } from "@prisma/client";
import Button from "@components/button-component";
import { cls } from "@libs/client/utils";
import useAdmin from "@libs/client/useAdmin";
import { CategoricalResponse } from "pages/blog/upload";

interface BlogRevisedFormResponse {
  category: string;
  title: string;
  content: string;
}

interface CategoryWithBlog extends MyBlog {
  category: {
    category: string;
  };
}

interface RevisedResponse {
  ok: boolean;
  post: CategoryWithBlog;
}

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), {
  ssr: false,
});

const BlogRevised: NextPage = () => {
  const { admin, ok } = useAdmin();
  const router = useRouter();
  const { data } = useSWR<RevisedResponse>(
    router.query.id ? `/api/blog/${router.query.id}` : null
  );
  const { data: categoriesData } = useSWR<CategoricalResponse>("/api/blog");
  const [revised, { data: revisedData, loading: revisedLoading }] = useMutation(
    router.query.id ? `/api/blog/${router.query.id}` : null
  );
  const [md, setMd] = useState<string | undefined>(data?.post.content);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<BlogRevisedFormResponse>({ mode: "onChange" });
  const [keyword, setKeyword] = useState<string>("");
  const [viewKeyword, setViewKeyword] = useState<boolean>(false);
  const onValid = async (validForm: BlogRevisedFormResponse) => {
    if (revisedLoading) return;
    validForm.content = md;
    revised({
      ...validForm,
    });
  };
  const searchKeyword = ({ target: { value } }: any) => {
    setKeyword(value);
    setViewKeyword(true);
  };
  const toggleKeyword = ({ target: { textContent } }: any) => {
    setValue("category", textContent);
    setViewKeyword(false);
  };
  useEffect(() => {
    if (data && data.ok) {
      setValue("category", data?.post.category.category);
      setValue("title", data?.post.title);
      setMd(data?.post.content);
    }
  }, [data]);
  useEffect(() => {
    if (revisedData && revisedData.ok) {
      router.push(`/blog/${router.query.id}`);
    }
  }, [revisedData, router]);
  return (
    <Layout title="Revised" backUrl="back">
      <form className="space-y-4 p-4" onSubmit={handleSubmit(onValid)}>
        <div className="relative">
          <Input
            register={register("category", {
              required: "I need a category",
              onChange: searchKeyword,
              value: keyword,
            })}
            label="Category"
            name="category"
            type="text"
          />
          <div className="absolute z-10 w-full">
            {categoriesData?.categories.map((category) => (
              <div
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
              </div>
            ))}
          </div>
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
        <Button text="Revised your post" />
      </form>
    </Layout>
  );
};

export default BlogRevised;
