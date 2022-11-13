import { useForm } from "react-hook-form";
import { useEffect } from "react";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import useMutation from "@libs/client/useMutation";
import Button from "@components/common/buttonComponent";
import TextArea from "@components/common/textarea";
import BorderBottomInput from "@components/common/borderBottomInput";
import FloatingInput from "@components/common/floatingInput";
import type { KeyedMutator } from "swr";
import type { PostsPropsWithSSR } from "pages/contact";

export interface UploadFormResponse {
  name: string;
  password: string;
  title: string;
  content: string;
}

interface ContactUploadProps {
  mutate: KeyedMutator<PostsPropsWithSSR>;
}

const ContactUpload = ({ mutate }: ContactUploadProps) => {
  const [upload, { data, loading }] = useMutation("/api/contact");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UploadFormResponse>({ mode: "onSubmit" });
  const onValid = ({ name, password, content, title }: UploadFormResponse) => {
    if (loading) return;
    upload({ name, password, content, title });
  };
  useEffect(() => {
    if (data && data.ok) {
      mutate();
      reset();
    }
  }, [data]);
  return (
    <form className="w-full space-y-7" onSubmit={handleSubmit(onValid)}>
      <div className="flex w-full items-end justify-start space-x-2">
        <div className="w-1/4 space-y-3 lg:w-1/6">
          <FloatingInput
            register={register("name", {
              required: "Plz, Write your name.",
              maxLength: { value: 5, message: "5 letter at most." },
            })}
            label="Name"
            name="name"
            type="text"
            error={errors.name?.message}
          />
          <FloatingInput
            register={register("password", {
              required: "Plz, Write your password.",
            })}
            label="Password"
            name="password"
            type="password"
            error={errors.password?.message}
          />
        </div>
        <BorderBottomInput
          register={register("title", {
            required: "Plz, Write the title.",
            maxLength: { value: 30, message: "30 letter at most" },
          })}
          isTitle
          name="title"
          type="text"
          placeholder="제목을 입력해주세요..."
          error={errors.title?.message}
          className="flex flex-1 flex-col justify-end"
        />
      </div>
      <TextArea
        register={register("content", {
          required: "plz, Write the content",
        })}
        placeholder="내용을 입력해주세요..."
      />
      <Button text="게시하기" />
    </form>
  );
};

export default ContactUpload;
