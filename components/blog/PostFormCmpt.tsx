import { Input } from "@components/common";
import { BlogFormResponse, Category } from "@containers/Blog/UploadContainer";
import { cls } from "@libs/client/utils";
import { ChangeEvent, MouseEvent } from "react";
import { FieldErrorsImpl, UseFormRegister } from "react-hook-form";

interface PostInfoFormProps {
  register: UseFormRegister<BlogFormResponse>;
  searchKeyword: ({
    currentTarget: { value },
  }: ChangeEvent<HTMLInputElement>) => void;
  toggleKeyword: ({
    currentTarget: { textContent },
  }: MouseEvent<HTMLLIElement>) => void;
  keyword: string;
  viewKeyword: boolean;
  categories: Category[];
  errors: Partial<
    FieldErrorsImpl<{
      category: string;
      title: string;
      summary: string;
    }>
  >;
}

export const PostInfoForm = ({
  register,
  searchKeyword,
  keyword,
  categories,
  viewKeyword,
  toggleKeyword,
  errors,
}: PostInfoFormProps) => {
  return (
    <>
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
          {categories?.map((category) => (
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
    </>
  );
};
