import { useForm } from "react-hook-form";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import useSWR from "swr";
import useMutation from "@libs/client/useMutation";
import useWindowSize from "@libs/client/useWindowSize";
import { LayoutContainer } from "@containers/Common";
import { Button } from "@components/common";
import { PostInfoForm } from "@components/blog";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), {
  ssr: false,
});

export type Category = {
  id: number;
  category: string;
};

export interface BlogFormResponse {
  category: string;
  title: string;
  content: string;
  summary: string;
}

export interface CategoricalResponse {
  ok: boolean;
  categories: Category[];
}

const UploadContainer = () => {
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
    setValue,
  } = useForm<BlogFormResponse>({ mode: "onChange" });
  const [keyword, setKeyword] = useState<string>("");
  const [viewKeyword, setViewKeyword] = useState<boolean>(false);
  const onValid = (validForm: BlogFormResponse) => {
    if (uploadLoading) return;
    validForm.content = md;
    upload({ ...validForm });
  };
  const searchKeyword = ({
    currentTarget: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    setKeyword(value);
    setViewKeyword(true);
  };
  const toggleKeyword = ({
    currentTarget: { textContent },
  }: MouseEvent<HTMLLIElement>) => {
    setValue("category", textContent);
    setViewKeyword(false);
  };
  const preview = useWindowSize();
  useEffect(() => {
    if (uploadData && uploadData.ok) {
      router.push(`/blog`);
    }
  }, [uploadData]);
  return (
    <LayoutContainer title="New Post" backUrl="back">
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
        <Button text="Upload My Post" />
      </form>
    </LayoutContainer>
  );
};

export default UploadContainer;
