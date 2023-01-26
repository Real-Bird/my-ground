import { RegDate } from "@components/common";
import { cls } from "@libs/client/utils";
import { MyBlog } from "@prisma/client";
import Link from "next/link";

interface BlogPostProps {
  post: MyBlog;
  category: string;
  idx: number;
}

const BlogPost = ({ post, category, idx }: BlogPostProps) => {
  const ANIMATION_DELAY = `${0.2 * (idx % 10)}s`;
  return (
    <li
      className={cls(
        "flex animate-fadein flex-col rounded-2xl border-2 px-5 opacity-0 shadow-md"
      )}
      style={{ animationDelay: ANIMATION_DELAY }}
    >
      <Link href={`/blog/${post.id}`}>
        <a className="cursor-pointer">
          <div className="flex flex-col items-start">
            <span className="overflow-x-clip text-ellipsis whitespace-pre py-2 text-lg font-semibold lg:text-xl">
              {post.title}
            </span>
            <span className="w-3/4 px-4 text-start text-sm font-medium">
              {post.summary}
            </span>
          </div>
          <div className="flex flex-col items-end justify-end pb-1.5 text-sm">
            <span>{category}</span>
            <RegDate regDate={post.updated} />
          </div>
        </a>
      </Link>
    </li>
  );
};

export default BlogPost;
