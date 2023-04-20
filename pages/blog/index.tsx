import useAdmin from "@libs/client/useAdmin";
import { MyBlog } from "@prisma/client";
import type { GetServerSideProps, NextPage } from "next";
import { SWRConfig } from "swr";
import client from "@libs/server/client";
import Link from "next/link";
import { BlogPost } from "@components/blog";
import useSWRInfinite from "swr/infinite";
import { FooterContainer, LayoutContainer } from "@containers/Common";
import { FloatingButton, Button } from "@components/common";
import BlogContainer from "@containers/Blog/BlogContainer";

export interface CategoryWithBlog extends MyBlog {
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

  const currentPostList = data ? data.map((item) => item.posts).flat() : [];
  const nextPostList = data ? data.map((item) => item.nextPosts) : [];

  const onNext = () => {
    setSize((prev) => prev + 1);
  };
  return (
    <BlogContainer
      ok={ok}
      currentPostList={currentPostList}
      nextPostList={nextPostList}
      onNext={onNext}
    />
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
