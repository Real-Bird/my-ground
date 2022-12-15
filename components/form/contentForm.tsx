import BorderBottomInput from "@components/common/borderBottomInput";
import { UploadFormResponse } from "@components/contact/contactUpload";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import "@uiw/react-md-editor/markdown-editor.css";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), {
  ssr: false,
});

interface ContentData {
  title: string;
  content: string;
}

interface ContentFormProps extends ContentData {
  updateFields: (fields: Partial<ContentData>) => void;
}

const ContentForm = ({ content, title, updateFields }: ContentFormProps) => {
  const { register, setValue } = useForm<UploadFormResponse>({
    mode: "onChange",
  });
  const [height, setHeight] = useState(0);
  const mdeWrapper = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (mdeWrapper) {
      setHeight(mdeWrapper.current.clientHeight);
    }
    if (title) {
      setValue("title", title);
    }
  }, [title, setValue]);
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
        className="flex flex-1 flex-col justify-end"
      />
      <div className="h-full w-full bg-white" ref={mdeWrapper}>
        <MDEditor
          className="w-full"
          {...register("content")}
          value={content}
          onChange={(e) => updateFields({ content: e })}
          preview={"edit"}
          height={height + 29}
          visiableDragbar={false}
          hideToolbar
        />
      </div>
    </>
  );
};

export default ContentForm;
