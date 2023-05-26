import {
  ConfirmModal,
  ErrorToast,
  FloatingInput,
  PostNavBtn,
} from "@components/common";
import ContactRevised from "@components/contact/ContactRevisedCmpt";
import PostListItem from "@components/contact/PostListItemCmpt";
import useMutation from "@libs/client/useMutation";
import { cls } from "@libs/client/utils";
import { MyGroundPost } from "@prisma/client";
import { useState, useEffect } from "react";
import { FieldError, useForm } from "react-hook-form";
import useSWR from "swr";

interface PostListItemProps {
  id: number;
  onCloseModal: () => void;
  isOpen: boolean;
}

export interface ModalPostResponse {
  ok: boolean;
  post: MyGroundPost;
}

export interface ConfirmForm {
  password: string;
}

const PostViewer = ({ id, onCloseModal, isOpen }: PostListItemProps) => {
  const [openErrorToast, setOpenErrorToast] = useState(false);
  const { data: postData, mutate: postMutate } = useSWR<ModalPostResponse>(
    `/api/contact/${id}`
  );
  const [deletePost, { data: deletePostData, loading: deleteLoading }] =
    useMutation(`/api/contact/delete?id=${id}`);
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
    setError,
  } = useForm<ConfirmForm>();
  const [isEdit, setIsEdit] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const onEdit = () => setIsEdit((prev) => !prev);
  const onDelete = () => {
    if (deleteLoading) return;
    setConfirmModal(true);
  };
  const onDeleteConfirm = ({ password }: ConfirmForm) => {
    if (!password) return;
    if (deleteLoading) return;
    deletePost({ password });
  };
  const onConfirmClose = () => {
    reset();
    setConfirmModal(false);
  };
  const onToastToggle = (error: FieldError) => {
    if (!error) return;
    const {
      ref: { name },
    } = error;
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
  }, [errors.password]);
  useEffect(() => {
    if (deletePostData && deletePostData.ok) {
      setConfirmModal(false);
      onCloseModal();
    }
    if (deletePostData && !deletePostData.ok) {
      setError("password", { message: deletePostData.error });
    }
  }, [deletePostData]);
  return (
    <div
      className={cls(
        isOpen ? "animate-scaleup" : "animate-scaledown",
        "fixed left-0 top-0 z-20 flex min-h-screen min-w-full flex-col items-center justify-center bg-slate-400 bg-opacity-60 backdrop-blur-sm"
      )}
      style={{ margin: 0 }}
    >
      <div className="relative my-5 h-[36rem] w-5/6 rounded-lg bg-white shadow-md lg:h-[90vh]">
        <div
          className="absolute right-1 top-1 cursor-pointer text-amber-500 hover:text-amber-600"
          onClick={onCloseModal}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-10 w-10"
          >
            <path
              fillRule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        {!!postData && isOpen && (
          <>
            {isEdit ? (
              <ContactRevised
                id={id}
                title={postData?.post.title}
                name={postData?.post.name}
                content={postData?.post.content}
                colorCode={postData?.post.token}
                onEdit={onEdit}
                mutate={postMutate}
              />
            ) : (
              <>
                <PostListItem
                  title={postData?.post.title}
                  name={postData?.post.name}
                  content={postData?.post.content}
                  created={postData?.post.created}
                  colorCode={postData?.post.token}
                  isModal={isOpen}
                />
                <div className="flex items-center justify-end space-x-2 px-2 py-1">
                  <PostNavBtn onClick={onEdit} text="수정" />
                  <PostNavBtn onClick={onDelete} text="삭제" />
                </div>
              </>
            )}
          </>
        )}
        {confirmModal && (
          <>
            <form onSubmit={handleSubmit(onDeleteConfirm)}>
              <ConfirmModal
                message="정말 삭제할까요?"
                onClose={onConfirmClose}
                type="삭제"
                kind="contact"
                components={
                  <FloatingInput
                    register={register("password", {
                      required: "비밀번호를 입력하세요.",
                    })}
                    label="Password"
                    name="password"
                    type="password"
                  />
                }
              />
            </form>
            {errors && (
              <div className="fixed right-1 top-1 z-50 my-2 space-y-2 ">
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
          </>
        )}
      </div>
    </div>
  );
};

export default PostViewer;
