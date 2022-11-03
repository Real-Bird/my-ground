import RegDate from "@components/regDate";
import { MyBlog } from "@prisma/client";
import Link from "next/link";

interface BlogPostProps {
  post: MyBlog;
  category: string;
}

const BlogPost = ({ post, category }: BlogPostProps) => {
  return (
    <li className="flex animate-fade flex-col rounded-2xl border-2 px-5 shadow-md">
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
            <RegDate regDate={post.created} y m d />
          </div>
        </a>
      </Link>
    </li>
  );
};

export default BlogPost;
