import useAdmin from "@libs/client/useAdmin";
import { Category, MyBlog } from "@prisma/client";
import type { GetServerSideProps, NextPage } from "next";
import { SWRConfig } from "swr";
import client from "@libs/server/client";
import useSWRInfinite from "swr/infinite";
import BlogContainer from "@containers/Blog/BlogContainer";
import { Meta } from "@components/common";

export interface CategoryWithBlog extends MyBlog {
  category: Category[];
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
  const { ok } = useAdmin();
  const { data, setSize } = useSWRInfinite<BlogPropsWithSSR>(getKey, fetcher);

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

const Page: NextPage<{ posts: BlogPropsWithSSR; categories: Category[] }> = ({
  posts,
  categories,
}) => {
  const categoriesArray = categories?.map((v) => v.category) || [];
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
      <Meta
        keywords={["blog", "posts", ...categoriesArray]}
        description="my blog list"
        og_description="my blog list"
        og_title="my blog list"
        og_url="blog"
      />
      <Blog posts={posts} />
    </SWRConfig>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const limit = 10;
  const page = 1;

  const categories = await client.category.findMany({});

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
      categories: JSON.parse(JSON.stringify(categories)),
    },
  };
};

export default Page;
