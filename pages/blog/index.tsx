import FloatingButton from "@components/floating-btn";
import Layout from "@components/layout";
import RegDate from "@components/regDate";
import useAdmin from "@libs/client/useAdmin";
import { MyBlog } from "@prisma/client";
import type { NextPage } from "next";
import { SWRConfig } from "swr";
import client from "@libs/server/client";
import Link from "next/link";
import { Skeleton } from "@mui/material";
import Button from "@components/button-component";

interface CategoryWithBlog extends MyBlog {
  category: {
    category: string;
  };
}

interface PostsResponse {
  ok: boolean;
  posts: MyBlog[];
  category: string;
}

const Home: NextPage<{ posts: CategoryWithBlog[] }> = ({ posts }) => {
  const { admin, ok } = useAdmin();
  return (
    <Layout title="BLOG" isFooter>
      <div className="mx-3 flex flex-col space-y-3 divide-y-2 text-center xl:my-5 xl:w-[80%]">
        <div className="flex w-full flex-row items-center justify-center xl:relative">
          <h1 className="text-center text-xl text-red-600 xl:py-5 xl:text-2xl xl:font-bold">
            My Blog List
          </h1>
          {ok && (
            <Link href={"/blog/upload"}>
              <Button
                text="Upload"
                className="hidden xl:absolute xl:right-0 xl:block xl:h-12 xl:w-24"
              />
            </Link>
          )}
        </div>
        <div className="flex flex-row items-center justify-between space-x-2 divide-x-2 xl:text-xl xl:font-bold">
          <div className="w-20 xl:w-64 xl:pt-3">카테고리</div>
          <div className="flex-1 text-center xl:pt-3">제 목</div>
          <div className="w-24 xl:w-64 xl:pt-3">작성일</div>
        </div>
        {posts
          ? posts?.map((post) => (
              <div
                key={post.id}
                className="flex flex-row items-center justify-between space-x-2 divide-x-2 pt-2"
              >
                <div className="w-20 text-sm xl:w-64 xl:text-xl">
                  {post.category.category}
                </div>
                <Link href={`/blog/${post.id}`}>
                  <a className="flex-1 font-semibold xl:text-2xl">
                    {post.title}
                  </a>
                </Link>
                <div className="w-24 text-sm xl:w-64 xl:text-xl">
                  <RegDate regDate={post.created} y m d />
                </div>
              </div>
            ))
          : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
              <div
                key={i}
                className="flex flex-row items-center justify-between space-x-2 divide-x-2 pt-2"
              >
                <Skeleton variant="text" className="h-5 w-20" />
                <Skeleton variant="text" className="h-6 flex-1" />
                <Skeleton variant="text" className="h-5 w-24" />
              </div>
            ))}
      </div>
      {ok && (
        <FloatingButton href="/blog/upload" type="Portfolio Upload">
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

const Page: NextPage<{ posts: CategoryWithBlog[] }> = ({ posts }) => {
  return (
    <SWRConfig
      value={{
        fallback: {
          "/api/blog": {
            ok: true,
            posts,
          },
        },
      }}
    >
      <Home posts={posts} />
    </SWRConfig>
  );
};

export async function getServerSideProps() {
  const posts = await client.myBlog.findMany({
    include: {
      category: {
        select: {
          category: true,
        },
      },
    },
    orderBy: {
      created: "desc",
    },
  });
  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
    },
  };
}

export default Page;
