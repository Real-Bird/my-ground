import PostListItem from "@components/contact/postListItem";
import { MyGroundPost } from "@prisma/client";
import useSWR from "swr";

interface PostListItemProps {
  id: number;
  onCloseModal: () => void;
}

interface ModalPostResponse {
  ok: boolean;
  post: MyGroundPost;
}

const PostViewer = ({ id, onCloseModal }: PostListItemProps) => {
  const { data } = useSWR<ModalPostResponse>(`/api/contact/${id}`);
  return (
    <div
      className="fixed left-0 top-0 z-20 flex min-h-screen min-w-full flex-col items-center justify-center bg-slate-400 bg-opacity-60 backdrop-blur-sm"
      style={{ margin: 0 }}
    >
      <div className="relative my-5 h-[90vh] w-5/6 rounded-lg bg-white shadow-md">
        <div
          className="absolute top-2 right-2 cursor-pointer text-amber-500 hover:text-amber-600"
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
        {data ? (
          <PostListItem
            title={data?.post.title}
            name={data?.post.name}
            content={data?.post.content}
            created={data?.post.created}
            colorChroma={data?.post.token}
            isModal
          />
        ) : null}
      </div>
    </div>
  );
};

export default PostViewer;
