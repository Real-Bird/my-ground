import FloatingButton from "@components/common/floatingBtn";
import Layout from "@components/common/layout";
import useWindowSize from "@libs/client/useWindowSize";
import client from "@libs/server/client";
import { Skeleton } from "@mui/material";
import { MyGroundPost } from "@prisma/client";
import type { GetServerSideProps, NextPage } from "next";
import useSWR, { SWRConfig } from "swr";
import PostListItem from "@components/contact/postListItem";
import PostViewer from "@components/contact/postViewer";
import { useState } from "react";
import ContactUpload from "@components/contact/contactUpload";

export interface PostsPropsWithSSR {
  ok: boolean;
  posts: MyGroundPost[];
}

const Contact: NextPage<{ posts: MyGroundPost[] }> = ({ posts }) => {
  const isSize = useWindowSize(1024);
  const { data: contactPosts, mutate } =
    useSWR<PostsPropsWithSSR>("/api/contact");
  const [showModal, setShowModal] = useState(false);
  const [postId, setPostId] = useState<number>();
  const onOpenModal = (postId: number) => {
    setShowModal(true);
    setPostId(postId);
  };
  const onCloseModal = () => setShowModal(false);
  return (
    <Layout title="CONTACT" isFooter>
      <section className="flex w-full flex-col space-y-3 px-2 text-center lg:my-5 lg:w-4/5 ">
        <div className="flex w-full flex-row items-center justify-center">
          <div className="flex w-full flex-col items-center justify-center ">
            <h1 className="text-center text-xl font-bold text-red-600 lg:py-5 lg:text-2xl">
              Posts List
            </h1>
            <ContactUpload mutate={mutate} />
          </div>
        </div>
        <ul className="grid grid-cols-1 gap-2 lg:grid-cols-2 xl:grid-cols-3">
          {contactPosts
            ? contactPosts?.posts.map((post) => (
                <li
                  key={post.id}
                  className="flex h-64 w-full cursor-pointer flex-col items-start rounded-md border-2 shadow-lg lg:h-96 "
                  title={post.title}
                  onClick={() => onOpenModal(post.id)}
                >
                  <PostListItem
                    title={post.title}
                    name={post.name}
                    content={post.content}
                    created={post.created}
                    colorChroma={post.token}
                  />
                </li>
              ))
            : [...Array.from(Array(10).keys())].map((i) => (
                <li
                  key={i}
                  className="flex flex-row items-center justify-between space-x-6 divide-x-2 px-2"
                >
                  <Skeleton
                    variant="text"
                    animation="wave"
                    width={isSize ? "14rem" : "4rem"}
                    height={"2.75rem"}
                    className="h-8 w-16 py-2 text-sm lg:h-11 lg:w-56"
                  />
                  <Skeleton
                    variant="text"
                    animation="wave"
                    height={"2.75rem"}
                    className="h-8 flex-[0.8] py-2 font-semibold lg:h-11"
                  />
                  <Skeleton
                    variant="text"
                    animation="wave"
                    height={"2.75rem"}
                    className="w-16 py-2 text-sm lg:w-56"
                  />
                </li>
              ))}
        </ul>
        {showModal && <PostViewer id={postId} onCloseModal={onCloseModal} />}
        <FloatingButton href="/contact/upload" type="Upload">
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
      </section>
    </Layout>
  );
};

const Page: NextPage<{ posts: MyGroundPost[] }> = ({ posts }) => {
  return (
    <SWRConfig
      value={{
        fallback: {
          "/api/contact": {
            ok: true,
            posts,
          },
        },
      }}
    >
      <Contact posts={posts} />
    </SWRConfig>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const posts = await client.myGroundPost.findMany({
    orderBy: {
      created: "desc",
    },
  });
  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
    },
  };
};

export default Page;
