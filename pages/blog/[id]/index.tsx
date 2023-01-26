import { MyBlog } from "@prisma/client";
import type { NextPage, GetStaticProps, GetStaticPaths } from "next";
import dynamic from "next/dynamic";
import "@uiw/react-markdown-preview/markdown.css";
import useAdmin from "@libs/client/useAdmin";
import client from "@libs/server/client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { LayoutContainer } from "@containers/Common";
import { FloatingButton, PostNavBtn, RegDate } from "@components/common";
import { TocContainer } from "@containers/Common/TocContainer";
import { MarkdownPreviewProps } from "@uiw/react-markdown-preview";
import PrevNextPost from "@components/blog/PrevNextPostCmpt";
import getIntersectionObserver from "@libs/client/getIntersectionObserver";

interface CategoryWithBlog extends MyBlog {
  category: {
    category: string;
  };
}

type PrevNextPost = Pick<MyBlog, "id" | "title">;
type RefProps = { [key: string]: IntersectionObserverEntry };

interface TotalPostProps {
  post: CategoryWithBlog;
  prevPost: PrevNextPost;
  nextPost: PrevNextPost;
}

const MarkdownPreview = dynamic<MarkdownPreviewProps>(
  async () => await import("@uiw/react-markdown-preview"),
  {
    ssr: false,
  }
);

const BlogDetail: NextPage<{
  totalPost: TotalPostProps;
}> = ({ totalPost }) => {
  const { post, prevPost, nextPost } = totalPost;
  const { ok } = useAdmin();
  const router = useRouter();
  const headingsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!post) {
      router.push("/404");
    }
  }, []);
  return (
    <LayoutContainer title="POST" backUrl="/blog">
      <div className="w-4/5 max-w-6xl space-y-2 px-3 lg:py-4">
        <div className="flex w-full flex-row items-center justify-center lg:relative">
          <h1 className="w-full border-b-2 border-dotted py-5 text-center text-5xl font-bold">
            {post?.title}
          </h1>
        </div>
        <div className="flex w-full items-end justify-between">
          <div className="flex space-x-2">
            <PostNavBtn link="/blog" text="목록" />
            {ok && (
              <PostNavBtn
                link={`/blog/${router.query.id}/revised`}
                text="수정"
              />
            )}
          </div>
          <div className="flex flex-col items-end py-1 px-1">
            <div className="text-sm">
              <div className="lg:text-[1rem]">
                카테고리: {post?.category?.category}
              </div>
              <div className="lg:text-[1rem]">
                작성일: <RegDate regDate={post?.updated} />
              </div>
            </div>
          </div>
        </div>
        <div
          className="min-h-[68vh] rounded-md bg-slate-300 p-3"
          data-color-mode="light"
          ref={headingsRef}
        >
          <MarkdownPreview
            source={post?.content}
            wrapperElement={{ "data-color-mode": "light", ref: headingsRef }}
            style={{ backgroundColor: "#cbd5e1" }}
          />
        </div>
        <div className="flex w-full items-center justify-between gap-3">
          {prevPost && (
            <PrevNextPost
              id={prevPost.id}
              title={prevPost.title}
              label={"이전 글"}
            />
          )}
          {nextPost && (
            <PrevNextPost
              id={nextPost.id}
              title={nextPost.title}
              label={"다음 글"}
            />
          )}
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
      <TocContainer
        headingsRef={headingsRef}
        content={post ? post?.content : ""}
        title={post ? post?.title : ""}
      />
    </LayoutContainer>
  );
};

const Page: NextPage<{
  totalPost: TotalPostProps;
}> = ({ totalPost }) => {
  return <BlogDetail totalPost={totalPost} />;
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};
export const getStaticProps: GetStaticProps = async (ctx) => {
  const {
    params: { id },
  } = ctx;

  const post = await client.myBlog.findUnique({
    where: {
      id: +id,
    },
    include: {
      category: {
        select: {
          category: true,
        },
      },
    },
  });
  if (!post)
    return {
      props: { totalPost: { post: null, prevPost: null, nextPost: null } },
    };
  const prevPost = await client.myBlog.findMany({
    take: -1,
    skip: 1,
    cursor: {
      id: +id,
    },
    select: {
      id: true,
      title: true,
    },
  });
  const nextPost = await client.myBlog.findMany({
    take: 1,
    skip: 1,
    cursor: {
      id: +id,
    },
    select: {
      id: true,
      title: true,
    },
  });
  return {
    props: {
      totalPost: JSON.parse(
        JSON.stringify({ post, prevPost: prevPost[0], nextPost: nextPost[0] })
      ),
    },
  };
};

export default Page;
