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

const Home: NextPage<{ posts: CategoryWithBlog[] }> = ({ posts }) => {
  const { admin, ok } = useAdmin();
  return (
    <Layout title="BLOG" isFooter>
      <div className="mx-3 flex w-full flex-col space-y-3 text-center lg:my-5 lg:w-[80%]">
        <div className="flex w-full flex-row items-center justify-center lg:relative">
          <h1 className="text-center text-xl text-red-600 lg:py-5 lg:text-2xl lg:font-bold">
            My Blog List
          </h1>
          {ok && (
            <Link href={"/blog/upload"}>
              <a className="hidden lg:absolute lg:right-0 lg:block lg:h-12 lg:w-24">
                <Button text="Upload" />
              </a>
            </Link>
          )}
        </div>
        <div className="flex flex-row items-center justify-between space-x-2 divide-x-2 border-2 lg:text-xl lg:font-bold">
          <div className="w-20 lg:w-64 lg:py-3">카테고리</div>
          <div className="flex-1 text-center lg:py-3">제 목</div>
          <div className="w-24 lg:w-64 lg:py-3">작성일</div>
        </div>
        <ul className="divide-y-2 border-2">
          {posts
            ? posts?.map((post) => (
                <li
                  key={post.id}
                  className="flex flex-row items-center justify-between space-x-2 divide-x-2"
                >
                  <div className="w-20 py-2 text-sm lg:w-64 lg:text-xl">
                    {post.category.category}
                  </div>
                  <Link href={`/blog/${post.id}`}>
                    <div className="flex-1 cursor-pointer py-2 font-semibold lg:text-xl">
                      {post.title}
                    </div>
                  </Link>
                  <div className="w-24 py-2 text-sm lg:w-64 lg:text-xl">
                    <RegDate regDate={post.created} y m d />
                  </div>
                </li>
              ))
            : [...Array.from(Array(10).keys())].map((i) => (
                <li
                  key={i}
                  className="flex flex-row items-center justify-between space-x-6 divide-x-2 px-2"
                >
                  <Skeleton
                    variant="text"
                    className="h-8 w-16 py-2 text-sm lg:h-11 lg:w-56"
                  />
                  <Skeleton
                    variant="text"
                    className="h-8 flex-[0.8] py-2 font-semibold lg:h-11"
                  />
                  <Skeleton
                    variant="text"
                    className="h-8 w-16 py-2 text-sm lg:h-11 lg:w-56"
                  />
                </li>
              ))}
        </ul>
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
