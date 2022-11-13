import ConfirmModal from "@components/common/confirmModal";
import ContactRevised from "@components/contact/contactRevised";
import PostListItem from "@components/contact/postListItem";
import PostNavBtn from "@components/postNavBtn";
import useMutation from "@libs/client/useMutation";
import { cls } from "@libs/client/utils";
import { MyGroundPost } from "@prisma/client";
import { useEffect, useState } from "react";
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

const PostViewer = ({ id, onCloseModal, isOpen }: PostListItemProps) => {
  const { data: postData, mutate: postMutate } = useSWR<ModalPostResponse>(
    `/api/contact/${id}`
  );
  const [deletePost, { data: deletePostData, loading: deleteLoading }] =
    useMutation(`/api/contact/delete?id=${id}`);
  const [isEdit, setIsEdit] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const onEdit = () => setIsEdit((prev) => !prev);
  const onDelete = () => {
    if (deleteLoading) return;
    setConfirmModal(true);
  };
  const onDeleteConfirm = () => {
    deletePost(null);
    setConfirmModal(false);
    onCloseModal();
  };
  const onConfirmClose = () => setConfirmModal(false);
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
          className="absolute top-1 right-1 cursor-pointer text-amber-500 hover:text-amber-600"
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
          <ConfirmModal
            message="정말 삭제할까요?"
            onConfirm={onDeleteConfirm}
            onClose={onConfirmClose}
            type="삭제"
          />
        )}
      </div>
    </div>
  );
};

export default PostViewer;
