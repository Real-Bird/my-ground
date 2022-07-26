import FloatingButton from "@components/floating-btn";
import Layout from "@components/layout";
import RegDate from "@components/regDate";
import useAdmin from "@libs/client/useAdmin";
import { MyBlog } from "@prisma/client";
import type { NextPage } from "next";
import useSWR, { SWRConfig } from "swr";
import client from "@libs/server/client";
import Link from "next/link";

interface PostsResponse {
  ok: boolean;
  posts: MyBlog[];
}

const Home: NextPage = () => {
  const { admin, ok } = useAdmin();
  const { data } = useSWR<PostsResponse>("/api/blog");
  return (
    <Layout title="BLOG">
      <div className="mx-3 flex flex-col space-y-3 divide-y-2 text-center">
        <div className="flex flex-row items-center justify-between space-x-2 divide-x-2 text-xl font-bold">
          <div className="w-20">카테고리</div>
          <div className="flex-1 text-center">제 목</div>
          <div className="w-24">작성일</div>
        </div>
        {data?.posts?.map((post) => (
          <div
            key={post.id}
            className="flex flex-row items-center justify-between space-x-2 divide-x-2 pt-2"
          >
            <div className="w-20 text-sm">{post.category}</div>
            <Link href={`/blog/${post.id}`}>
              <a className="flex-1 font-semibold">{post.title}</a>
            </Link>
            <div className="w-24 text-sm">
              <RegDate regDate={post.created} y m d />
            </div>
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

const Page: NextPage<{ posts: MyBlog[] }> = ({ posts }) => {
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
      <Home />
    </SWRConfig>
  );
};

export async function getServerSideProps() {
  const posts = await client.myBlog.findMany({
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
