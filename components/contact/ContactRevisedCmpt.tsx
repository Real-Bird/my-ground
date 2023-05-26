import { FieldError, useForm } from "react-hook-form";
import { memo, useEffect, useState } from "react";
import useMutation from "@libs/client/useMutation";
import { type KeyedMutator } from "swr";
import type { ModalPostResponse } from "@components/contact/PostViewerCmpt";
import { cls } from "@libs/client/utils";
import { ErrorToast, PostNavBtn } from "@components/common";

interface ContactRevisedProps {
  id: number;
  title: string;
  name: string;
  content: string;
  colorCode: string;
  mutate: KeyedMutator<ModalPostResponse>;
  onEdit: () => void;
}

interface RevisedFormResponse {
  password: string;
  title: string;
  content: string;
}

const ContactRevised = ({
  id,
  name,
  title,
  content,
  colorCode,
  onEdit,
  mutate,
}: ContactRevisedProps) => {
  const [openErrorToast, setOpenErrorToast] = useState(false);
  const [upload, { data, loading }] = useMutation(`/api/contact/${id}`);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
    setError,
  } = useForm<RevisedFormResponse>({ mode: "onSubmit" });
  const onValid = ({ password, content, title }: RevisedFormResponse) => {
    if (loading) return;
    upload({ password, content, title });
  };

  const onToastToggle = (error: FieldError) => {
    if (!error) return;
    const {
      ref: { name },
    } = error;
    if (name === "title") {
      clearErrors("title");
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
        clearErrorsTimer_1 = setTimeout(() => setOpenErrorToast(false), 5000);
        clearErrorsTimer_2 = setTimeout(() => clearErrors(), 6000);
      }
    }
    return () => {
      clearTimeout(clearErrorsTimer_1);
      clearTimeout(clearErrorsTimer_2);
    };
  }, [errors]);
  useEffect(() => {
    if (data && data.ok) {
      mutate();
      onEdit();
      reset();
    }
    if (data && !data.ok) {
      setError("password", { message: data.error });
      console.log(data);
    }
  }, [data]);

  return (
    <form style={{ margin: 0 }} onSubmit={handleSubmit(onValid)}>
      <div className="flex w-full items-center justify-start space-x-1 px-1 py-2 ">
        <div className={cls("w-16")}>
          <div
            className={cls(`bg-zinc-300`, "h-12 w-12 rounded-full")}
            style={{ background: colorCode }}
          />
        </div>
        <div className="flex h-20 w-4/6 flex-col items-start justify-center space-y-1">
          <div className="box-border w-5/6">
            <input
              className="inline-block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent text-start text-sm font-bold  text-gray-900 placeholder-gray-400 placeholder:italic focus:border-amber-500 focus:outline-none focus:ring-amber-500 lg:text-lg"
              {...register("title", {
                required: "제목을 입력하세요.",
                value: title,
                maxLength: { value: 30, message: "최대 30자 제한입니다." },
              })}
              placeholder="제목을 입력해주세요..."
              type="text"
            />
          </div>
          <div className="flex w-5/6 items-center justify-start space-x-2">
            <span className="w-20 text-sm">{name}</span>
            <div className="relative flex flex-col items-start rounded-md">
              <input
                id="password"
                {...register("password", {
                  required: "비밀번호를 입력하세요.",
                })}
                type="password"
                className={cls(
                  "inline-block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent  text-sm text-gray-900 focus:border-amber-500 focus:outline-none focus:ring-0 focus:ring-amber-500"
                )}
                placeholder="Password"
              />
            </div>
          </div>
        </div>
      </div>
      <textarea
        className={cls(
          "-mb-1.5 h-96 w-full resize-none appearance-none overflow-y-scroll whitespace-pre-wrap break-words rounded-xl border-2 border-gray-400 bg-gray-200 p-3 px-2 text-start placeholder-gray-400 placeholder:italic focus:border-amber-500 focus:outline-none focus:ring-amber-500 lg:h-[40rem]"
        )}
        {...register("content", {
          required: "내용을 입력하세요.",
          value: content,
        })}
        placeholder="내용을 입력하세요..."
      />
      <div className="flex items-center justify-end space-x-2 px-2 py-1">
        <PostNavBtn onClick={onEdit} text="취소" />
        <PostNavBtn type={"submit"} text="확인" />
      </div>
      {errors && (
        <div className="fixed right-1 top-1 my-2 space-y-2">
          {[...Object.values(errors)].map((error, idx) => (
            <ErrorToast
              key={Date.now() + idx}
              idx={idx}
              errorsLength={Object.values(errors).length}
              onToastToggle={() => onToastToggle(error as FieldError)}
              openErrorToast={openErrorToast}
              message={error.message}
            />
          ))}
        </div>
      )}
    </form>
  );
};

export default memo(ContactRevised);
