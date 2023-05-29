import dynamic from "next/dynamic";
import { MutableRefObject } from "react";
import { UseFormRegister } from "react-hook-form";
import "@uiw/react-md-editor/markdown-editor.css";
import { BorderBottomInput } from "@components/common";
import { PFUploadFormResponse } from "@containers/Portfolio/PFUploadContainer";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), {
  ssr: false,
});

interface ContentData {
  title: string;
  content: string;
  register: UseFormRegister<PFUploadFormResponse>;
  height: number;
  mdeWrapper: MutableRefObject<HTMLDivElement>;
  theme: "light" | "dark";
}

interface ContentFormProps extends ContentData {
  updateFields: (fields: Partial<ContentData>) => void;
}

export const ContentForm = ({
  content,
  title,
  updateFields,
  register,
  height,
  mdeWrapper,
  theme,
}: ContentFormProps) => {
  return (
    <>
      <BorderBottomInput
        register={register("title", {
          required: "제목을 입력하세요.",
          onChange: (e) => updateFields({ title: e.target.value }),
          value: title,
        })}
        isTitle
        name="title"
        type="text"
        placeholder="제목을 입력해주세요..."
        className="flex flex-col justify-start dark:bg-slate-800 dark:text-white dark:focus:bg-slate-700"
      />
      <div
        className="h-full w-full bg-white dark:bg-transparent dark:text-white"
        ref={mdeWrapper}
      >
        <MDEditor
          {...register("content")}
          value={content}
          onChange={(e) => updateFields({ content: e })}
          preview={"edit"}
          height={height - 1}
          visibleDragbar={false}
          hideToolbar
          data-color-mode={theme}
          style={{
            backgroundColor: theme === "light" ? "transparent" : "#1e293b",
          }}
        />
      </div>
    </>
  );
};
