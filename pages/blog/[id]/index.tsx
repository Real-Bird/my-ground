import { Category, MyBlog } from "@prisma/client";
import type { NextPage, GetStaticProps, GetStaticPaths } from "next";
import dynamic from "next/dynamic";
import useAdmin from "@libs/client/useAdmin";
import client from "@libs/server/client";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { LayoutContainer } from "@containers/Common";
import {
  Badge,
  FloatingButton,
  Meta,
  PostNavBtn,
  RegDate,
} from "@components/common";
import { PrevNextPost } from "@components/blog";
import useSWR from "swr";

type Pager = Pick<MyBlog, "id" | "title">;

interface PagerResponse {
  ok: boolean;
  prevPost: Pager;
  nextPost: Pager;
}
interface CurrentPostProps {
  post: MyBlog;
  categories: Category[];
}

const MarkDownViewer = dynamic(
  async () => await import("@components/common/MarkdownViewer"),
  { ssr: false, loading: () => <div>Loading...</div> }
);

const BlogDetail: NextPage<{
  currentPost: CurrentPostProps;
  pagerData: PagerResponse;
}> = ({ currentPost, pagerData }) => {
  const { post, categories } = currentPost;
  const { ok } = useAdmin();
  const router = useRouter();

  useEffect(() => {
    if (!post) {
      router.push("/404");
    }
  }, []);

  return (
    <LayoutContainer title={currentPost.post.title} backUrl="/">
      <div className="w-full max-w-6xl space-y-2 px-3 lg:py-4">
        <div className="flex w-full flex-row items-center justify-center lg:relative">
          <h1 className="w-full break-all border-b-2 border-dotted py-5 text-start text-2xl font-bold lg:text-5xl">
            {post.title}
          </h1>
        </div>
        <div className="flex w-full items-end justify-between">
          <div className="flex space-x-2">
            <PostNavBtn link="/" text="목록" />
            {ok && (
              <PostNavBtn
                link={`/blog/${router.query.id}/revised`}
                text="수정"
              />
            )}
          </div>
          <div className="flex flex-col items-end justify-center px-1 py-1">
            <div className="text-sm">
              <div className="my-1 flex flex-wrap lg:text-[1rem]">
                {categories.map((category) => (
                  <Badge key={category.id} label={category.category} isHover />
                ))}
              </div>
              <div className="text-end lg:text-[1rem]">
                <RegDate regDate={post.updated} />
              </div>
            </div>
          </div>
        </div>
        <div className="min-h-[68vh] rounded-md bg-slate-300 p-3 dark:bg-slate-600">
          <MarkDownViewer markdown={post.content} title={post.title} />
        </div>
        <div className="flex w-full items-center justify-between gap-3">
          {pagerData?.ok && (
            <>
              {pagerData?.prevPost && (
                <PrevNextPost
                  id={pagerData?.prevPost.id}
                  title={pagerData?.prevPost.title}
                  label={"이전 글"}
                />
              )}
              {pagerData?.nextPost && (
                <PrevNextPost
                  id={pagerData?.nextPost.id}
                  title={pagerData?.nextPost.title}
                  label={"다음 글"}
                />
              )}
            </>
          )}
        </div>
      </div>
      {ok && (
        <FloatingButton href={`/blog/${post.id}/revised`} type="Revised">
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
    </LayoutContainer>
  );
};

const Page: NextPage<{
  currentPost: CurrentPostProps;
}> = ({ currentPost }) => {
  const router = useRouter();
  const { data: pagerData } = useSWR<PagerResponse>(
    router.query.id ? `/api/blog/${router.query.id}` : null
  );
  const {
    categories,
    post: { title, summary },
  } = currentPost;
  return (
    <>
      <Meta
        keywords={categories.map((v) => v.category)}
        description={summary}
        og_title={title}
        og_description={summary}
        og_url={router.asPath}
      />
      <BlogDetail currentPost={currentPost} pagerData={pagerData} />
    </>
  );
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
  });

  const categories = await client.category.findMany({
    where: {
      posts: {
        some: {
          id: post.id,
        },
      },
    },
  });

  if (!post)
    return {
      props: {
        currentPost: {
          post: null,
          categories: null,
        },
      },
    };

  return {
    props: {
      currentPost: JSON.parse(
        JSON.stringify({
          post,
          categories,
        })
      ),
    },
  };
};

export default Page;
