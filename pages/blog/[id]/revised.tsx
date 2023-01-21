import type { NextPage } from "next";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import useSWR from "swr";
import useMutation from "@libs/client/useMutation";
import { MyBlog } from "@prisma/client";
import { cls } from "@libs/client/utils";
import useAdmin from "@libs/client/useAdmin";
import { CategoricalResponse } from "pages/blog/upload";
import useWindowSize from "@libs/client/useWindowSize";
import { LayoutContainer } from "@containers/Common";
import { Button, Input } from "@components/common";

interface BlogRevisedFormResponse {
  category: string;
  title: string;
  content: string;
  summary: string;
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
  const { data: categoriesData } = useSWR<CategoricalResponse>(
    "/api/blog/categories"
  );
  const [revised, { data: revisedData, loading: revisedLoading }] = useMutation(
    router.query.id ? `/api/blog/${router.query.id}` : null
  );
  const [md, setMd] = useState<string | undefined>(data?.post.content);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
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
  const preview = useWindowSize();
  useEffect(() => {
    if (data && data.ok) {
      setValue("category", data?.post.category.category);
      setValue("title", data?.post.title);
      setValue("summary", data?.post.summary);
      setMd(data?.post.content);
    }
  }, [data]);
  useEffect(() => {
    if (revisedData && revisedData.ok) {
      data;
      router.push(`/blog/${router.query.id}`);
    }
  }, [revisedData, router]);
  useEffect(() => {
    if (!ok) {
      router.push("/403");
    }
  }, []);
  return (
    <LayoutContainer title="Revised" backUrl="back">
      <form className="space-y-4 p-4 lg:w-4/5" onSubmit={handleSubmit(onValid)}>
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
          <datalist className="absolute z-10 w-full" id="category">
            {categoriesData?.categories.map((category) => (
              <option
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
              </option>
            ))}
          </datalist>
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
        <Button text="Revised your post" />
      </form>
    </LayoutContainer>
  );
};

export default BlogRevised;
