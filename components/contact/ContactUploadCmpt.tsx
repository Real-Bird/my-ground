import { FieldError, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import useMutation from "@libs/client/useMutation";
import type { KeyedMutator } from "swr";
import type { PostsPropsWithSSR } from "pages/contact";
import {
  BorderBottomInput,
  ErrorToast,
  FloatingInput,
  TextArea,
  Button,
} from "@components/common";

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
  const [openErrorToast, setOpenErrorToast] = useState(false);
  const [upload, { data, loading }] = useMutation("/api/contact");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
    setError,
  } = useForm<UploadFormResponse>({ mode: "onSubmit" });
  const onValid = ({ name, password, content, title }: UploadFormResponse) => {
    if (loading) return;
    upload({ name, password, content, title });
  };
  const onToastToggle = (error: FieldError) => {
    if (!error) return;
    const {
      ref: { name },
    } = error;
    if (name === "title") {
      clearErrors("title");
    }
    if (name === "name") {
      clearErrors("name");
    }
    if (name === "content") {
      clearErrors("content");
    }
    if (name === "password") {
      clearErrors("password");
    }
  };
  useEffect(() => {
    let clearErrorsTimer_1: NodeJS.Timeout;
    let clearErrorsTimer_2: NodeJS.Timeout;
    if (errors) {
      setOpenErrorToast(true);
      if (openErrorToast) {
        clearErrorsTimer_1 = setTimeout(() => {
          setOpenErrorToast(false);
        }, 5000);
        clearErrorsTimer_2 = setTimeout(() => {
          clearErrors();
        }, 6000);
      }
    }
    return () => {
      clearTimeout(clearErrorsTimer_1);
      clearTimeout(clearErrorsTimer_2);
    };
  }, [errors.content, errors.name, errors.password, errors.title]);
  useEffect(() => {
    if (data && data.ok) {
      mutate();
      reset();
    }
    if (data && !data.ok) {
      setError("password", { message: data.error });
    }
  }, [data]);
  return (
    <>
      <form className="w-full space-y-7" onSubmit={handleSubmit(onValid)}>
        <div className="flex w-full items-end justify-start space-x-2">
          <div className="w-1/4 space-y-3 lg:w-1/6">
            <FloatingInput
              register={register("name", {
                required: "이름을 입력하세요.",
                maxLength: { value: 5, message: "이름은 최대 5자 입니다." },
              })}
              label="Name"
              name="name"
              type="text"
            />
            <FloatingInput
              register={register("password", {
                required: "비밀번호를 입력하세요.",
              })}
              label="Password"
              name="password"
              type="password"
            />
          </div>
          <BorderBottomInput
            register={register("title", {
              required: "제목을 입력하세요.",
              maxLength: { value: 30, message: "제목은 최대 30자 입니다." },
            })}
            isTitle
            name="title"
            type="text"
            placeholder="제목을 입력해주세요..."
            className="flex flex-1 flex-col justify-end"
          />
        </div>
        <TextArea
          register={register("content", {
            required: "내용을 입력하세요.",
          })}
          placeholder="내용을 입력해주세요..."
        />
        <Button text="게시하기" />
      </form>
      {errors && (
        <div className="fixed top-12 right-5 my-2 space-y-2">
          {[...Object.values(errors)].map((error, idx) => (
            <ErrorToast
              key={Date.now() + idx}
              idx={idx}
              errorsArr={[...Object.values(errors)]}
              onToastToggle={() => onToastToggle(error)}
              openErrorToast={openErrorToast}
              message={error.message}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default ContactUpload;
