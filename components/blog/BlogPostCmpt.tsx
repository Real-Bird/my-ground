import { Badge, RegDate } from "@components/common";
import { cls } from "@libs/client/utils";
import { Category, MyBlog } from "@prisma/client";
import Link from "next/link";

interface BlogPostProps {
  post: MyBlog;
  categories: Category[];
  idx: number;
}

export const BlogPost = ({ post, categories, idx }: BlogPostProps) => {
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
            <div className="whitespace-normal py-2 text-start text-lg font-semibold lg:text-xl">
              {post.title}
            </div>
            <div className="w-3/4 px-4 text-start text-sm font-medium">
              {post.summary}
            </div>
          </div>
          <div className="flex flex-wrap items-end justify-between pb-1.5 text-sm">
            <ul className="flex flex-wrap items-center justify-start py-1">
              {categories.map((category) => (
                <Badge key={category.id} label={category.category} />
              ))}
            </ul>
            <RegDate regDate={post.updated} />
          </div>
        </a>
      </Link>
    </li>
  );
};
