import { useState, useEffect } from "react";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import useSWR from "swr";
import useMutation from "@libs/client/useMutation";
import { MyBlog } from "@prisma/client";
import useWindowSize from "@libs/client/useWindowSize";
import { LayoutContainer } from "@containers/Common";
import { Button } from "@components/common";
import {
  CategoricalResponse,
  BlogFormResponse,
} from "@containers/Blog/UploadContainer";
import { PostInfoForm } from "@components/blog";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

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

const RevisedContainer = () => {
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
  } = useForm<BlogFormResponse>({ mode: "onChange" });
  const [keyword, setKeyword] = useState<string>("");
  const [viewKeyword, setViewKeyword] = useState<boolean>(false);
  const onValid = async (validForm: BlogFormResponse) => {
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
      router.push(`/blog/${router.query.id}`);
    }
  }, [revisedData, router]);
  return (
    <LayoutContainer title="Revised" backUrl="back">
      <form className="space-y-4 p-4 lg:w-4/5" onSubmit={handleSubmit(onValid)}>
        <PostInfoForm
          register={register}
          categories={categoriesData?.categories}
          errors={errors}
          keyword={keyword}
          searchKeyword={searchKeyword}
          toggleKeyword={toggleKeyword}
          viewKeyword={viewKeyword}
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
            visibleDragbar={false}
          />
        </div>
        <Button text="Revised your post" />
      </form>
    </LayoutContainer>
  );
};

export default RevisedContainer;
