import Layout from "@components/layout";
import { MyBlog } from "@prisma/client";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import dynamic from "next/dynamic";
import "@uiw/react-markdown-preview/markdown.css";
import RegDate from "@components/regDate";
import FloatingButton from "@components/floatingBtn";
import useAdmin from "@libs/client/useAdmin";
import client from "@libs/server/client";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Button from "@components/buttonComponent";

interface CategoryWithBlog extends MyBlog {
  category: {
    category: string;
  };
}

const MarkdownViewer: any = dynamic(
  () =>
    import("@uiw/react-md-editor").then((mod: any) => {
      return mod.default.Markdown;
    }),
  {
    ssr: false,
  }
);

const BlogDetail: NextPage<{ post: CategoryWithBlog }> = ({ post }) => {
  const { admin, ok } = useAdmin();
  const router = useRouter();
  useEffect(() => {
    if (!post) {
      router.push("/404");
    }
  }, []);
  return (
    <Layout title="POST" backUrl="/blog">
      <div className="w-[80%] space-y-2 px-3 lg:py-4">
        <div className="flex w-full flex-row items-center justify-center border-b-2 border-dotted lg:relative">
          <h1 className="py-5 text-center text-5xl font-bold">{post?.title}</h1>
          {ok && (
            <Link href={`/blog/${router.query.id}/revised`}>
              <a className="hidden lg:absolute lg:right-0 lg:block lg:h-12 lg:w-24">
                <Button text="Revised" />
              </a>
            </Link>
          )}
        </div>
        <div className="flex flex-col items-end py-1">
          <div className="text-sm">
            <div className="flex flex-row">
              <div className="w-16 text-end">카테고리</div>
              <div className="flex-1">: {post?.category.category}</div>
            </div>
            <div className="flex flex-row">
              <div className="word-spacing w-16 text-right">작 성 일</div>
              <div className="flex-1">
                : <RegDate regDate={post?.updated} y m d />
              </div>
            </div>
          </div>
        </div>
        <div className="min-h-[68vh] rounded-md bg-slate-300 p-3">
          <MarkdownViewer source={post?.content} />
        </div>
      </div>
      {ok && (
        <FloatingButton href={`/blog/${post?.id}/revised`} type="Revised">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
            <path
              fillRule="evenodd"
              d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
              clipRule="evenodd"
            />
          </svg>
        </FloatingButton>
      )}
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = (ctx) => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const post = await client.myBlog.findUnique({
    where: {
      id: +ctx?.params?.id,
    },
    include: {
      category: {
        select: {
          category: true,
        },
      },
    },
  });
  return {
    props: {
      post: JSON.parse(JSON.stringify(post)),
    },
  };
};

export default BlogDetail;
