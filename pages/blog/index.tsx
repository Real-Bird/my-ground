import FloatingButton from "@components/common/floatingBtn";
import Layout from "@components/common/layout";
import useAdmin from "@libs/client/useAdmin";
import { MyBlog } from "@prisma/client";
import type { GetServerSideProps, NextPage } from "next";
import { SWRConfig } from "swr";
import client from "@libs/server/client";
import Link from "next/link";
import Button from "@components/common/buttonComponent";
import BlogPost from "@components/blog/blogPost";
import useSWRInfinite from "swr/infinite";

interface CategoryWithBlog extends MyBlog {
  category: {
    category: string;
  };
}

interface BlogPropsWithSSR {
  ok: boolean;
  posts: CategoryWithBlog[];
  nextPosts: CategoryWithBlog[];
  page: number;
}

const getKey = (pageIndex: number, previousPageData: BlogPropsWithSSR) => {
  if (pageIndex === 0) return `/api/blog?&page=1`;
  if (pageIndex + 1 > +previousPageData.page) return null;
  return `/api/blog?&page=${pageIndex + 1}`;
};
const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Blog: NextPage<{ posts: BlogPropsWithSSR }> = ({ posts }) => {
  const { admin, ok } = useAdmin();
  const { data, setSize, size } = useSWRInfinite<BlogPropsWithSSR>(
    getKey,
    fetcher
  );

  const products = data ? data.map((item) => item.posts).flat() : [];
  const nextData = data ? data.map((item) => item.nextPosts) : [];

  const onNextBtn = () => {
    setSize((prev) => prev + 1);
  };
  return (
    <Layout title="BLOG" isFooter>
      <section className="mx-3 flex h-fit w-full flex-col space-y-3 text-center lg:my-5 lg:w-[80%]">
        <div className="flex w-full flex-row items-center justify-center lg:relative">
          <h1 className="text-center text-xl font-bold text-red-600 lg:py-5 lg:text-2xl">
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
        <ul className="space-y-2">
          {products?.map((post, idx) => (
            <BlogPost
              key={post.id}
              post={post}
              category={post.category.category}
              idx={idx}
            />
          ))}
        </ul>
        {nextData[nextData.length - 1]?.length > 0 && (
          <Button
            className="animation-fadein"
            onClick={onNextBtn}
            text="더 보기"
          />
        )}
      </section>
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

const Page: NextPage<{ posts: BlogPropsWithSSR }> = ({ posts }) => {
  return (
    <SWRConfig
      value={{
        fallback: {
          "/api/blog?page=1": {
            ok: true,
            posts,
          },
        },
      }}
    >
      <Blog posts={posts} />
    </SWRConfig>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const limit = 10;
  const page = 1;

  const posts = await client.myBlog.findMany({
    include: {
      category: true,
    },
    orderBy: {
      created: "desc",
    },
    take: limit,
    skip: (page - 1) * limit,
  });
  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
    },
  };
};

export default Page;
