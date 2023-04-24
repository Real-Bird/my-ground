import { useForm } from "react-hook-form";
import {
  ChangeEvent,
  KeyboardEvent,
  MouseEvent,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/router";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import useSWR from "swr";
import useMutation from "@libs/client/useMutation";
import useWindowSize from "@libs/client/useWindowSize";
import { LayoutContainer } from "@containers/Common";
import { Badge, Button, Input } from "@components/common";
import { cls } from "@libs/client/utils";
import { Category, MyBlog } from "@prisma/client";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), {
  ssr: false,
});

interface CategoryWithBlog extends MyBlog {
  category: Category[];
}

export interface BlogFormResponse {
  categories: string[];
  title: string;
  content: string;
  summary: string;
}

export interface RevisedResponse {
  ok: boolean;
  post: CategoryWithBlog;
}

export interface CategoricalResponse {
  ok: boolean;
  categories: Category[];
}

const UploadContainer = () => {
  const [md, setMd] = useState<string | undefined>("");
  const router = useRouter();
  const { data: existedData } = useSWR<RevisedResponse>(
    router.query.id ? `/api/blog/${router.query.id}` : null
  );
  const { data: categoriesData } = useSWR<CategoricalResponse>(
    "/api/blog/categories"
  );
  const categories = categoriesData?.categories || [];
  const [upload, { data: uploadData, loading: uploadLoading }] =
    useMutation<RevisedResponse>(
      router.query.id ? `/api/blog/${router.query.id}` : "/api/blog"
    );
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setFocus,
  } = useForm<BlogFormResponse>({ mode: "onChange" });

  const [newCategory, setNewCategory] = useState("");
  const [newCategories, setNewCategories] = useState<string[]>([]);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isLiOver, setIsLiOver] = useState(false);

  const onValid = (validForm: BlogFormResponse) => {
    if (uploadLoading) return;
    validForm = { ...validForm, content: md, categories: newCategories };
    upload({ ...validForm });
  };
  const onSearchTag = ({
    currentTarget: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    setNewCategory(value);
  };

  const onAddExistedTag = ({
    currentTarget: { textContent },
  }: MouseEvent<HTMLLIElement>) => {
    setNewCategories((prev) => Array.from(new Set([...prev, textContent])));
    setValue("categories", []);
    setIsInputFocused(false);
  };

  const onAddNewCategory = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter" || !e.currentTarget.value) return;
    const currentCategory = e.currentTarget.value
      .toLowerCase()
      .replace(/[\W ]/, "");
    const existedCategory = categories.map((item) =>
      item.category.toLowerCase().replace(/[\W ]/, "")
    );
    const checkedCategory = existedCategory.includes(currentCategory)
      ? categories.find(
          (item) =>
            item.category.toLowerCase().replace(/[\W ]/, "") === currentCategory
        ).category
      : newCategory;

    setNewCategories((prev) => Array.from(new Set([...prev, checkedCategory])));
    setValue("categories", []);
    setNewCategory("");
  };

  const onDeleteCategory = (idx: number) => {
    setNewCategories((prev) => prev.filter((_, i) => i !== idx));
  };

  const onAllDeleteCategories = () => {
    setNewCategories([]);
  };
  const preview = useWindowSize();

  useEffect(() => {
    if (existedData && existedData.ok) {
      setNewCategories(existedData.post.category.map((item) => item.category));
      setValue("title", existedData?.post.title);
      setValue("summary", existedData?.post.summary);
      setMd(existedData?.post.content);
    }
  }, [existedData]);

  useEffect(() => {
    if (uploadData && uploadData.ok) {
      router.push(
        router.query.id
          ? `/blog/${router.query.id}`
          : `/blog/${uploadData.post.id}`
      );
    }
  }, [uploadData]);
  return (
    <LayoutContainer title="New Post" backUrl="back">
      <form
        className="space-y-4 p-4 lg:w-4/5"
        onSubmit={handleSubmit(onValid)}
        onKeyDown={(e) => {
          if (e.code === "Enter") e.preventDefault();
        }}
      >
        <div className="relative">
          <label
            className="mb-1 block text-sm font-medium text-gray-700"
            htmlFor="categories"
          >
            Categories
          </label>
          <div
            className={cls(
              isInputFocused ? "border-amber-400 ring-2 ring-amber-400" : "",
              "relative box-border flex flex-1 flex-wrap items-center overflow-hidden rounded-md border border-gray-300 py-0.5 px-2 shadow-sm"
            )}
            onClick={() => setFocus("categories")}
          >
            {newCategories.map((tag, idx) => (
              <Badge
                key={tag}
                label={tag}
                onClick={() => onDeleteCategory(idx)}
                hasCancel
              />
            ))}
            <div className="visible m-0.5 box-border inline-grid flex-1 grid-cols-2 py-0.5 text-gray-500 outline-none">
              <input
                id="categories"
                {...register("categories", {
                  onChange: onSearchTag,
                  value: [newCategory],
                })}
                type="text"
                autoComplete="off"
                className="m-0 w-full min-w-[2px] border-0 border-transparent p-0 text-inherit opacity-100 focus:border-transparent focus:ring-0"
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => {
                  if (isLiOver) return;
                  setIsInputFocused(false);
                }}
                onKeyDown={onAddNewCategory}
                onKeyUp={(e) => {
                  if (e.key !== "Enter") return;
                }}
              />
            </div>
            <div
              className="cursor-pointer px-0.5"
              onClick={onAllDeleteCategories}
            >
              <svg
                height="14"
                width="14"
                viewBox="0 0 20 20"
                aria-hidden="true"
                focusable="false"
                className="h-6 w-6"
              >
                <path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"></path>
              </svg>
            </div>
          </div>
          {/* {isInputFocused ? ( */}
          <ul
            className="absolute z-10 h-fit max-h-60 w-full divide-y-2 overflow-y-scroll rounded-md border border-gray-300"
            id="category"
          >
            {categories.map(({ id, category }) => (
              <li
                key={id}
                className="w-full cursor-pointer bg-white px-3 py-2 placeholder-gray-400 shadow-sm hover:bg-gray-300"
                onClick={onAddExistedTag}
                onMouseOver={() => setIsLiOver(true)}
                onMouseLeave={() => setIsLiOver(false)}
                hidden={
                  !category
                    .toLowerCase()
                    .replace(/[\W ]/, "")
                    .includes(newCategory.toLowerCase().replace(/[\W ]/, ""))
                }
              >
                {category}
              </li>
            ))}
          </ul>
          {/* ) : null} */}
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
            visibleDragbar={false}
            data-color-mode="light"
          />
        </div>
        <Button text="Upload My Post" />
      </form>
    </LayoutContainer>
  );
};

export default UploadContainer;
