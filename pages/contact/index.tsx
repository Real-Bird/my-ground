import client from "@libs/server/client";
import { MyGroundPost } from "@prisma/client";
import type { GetServerSideProps, NextPage } from "next";
import useSWR, { SWRConfig } from "swr";
import PostListItem from "@components/contact/PostListItem";
import PostViewer from "@components/contact/PostViewer";
import { useState } from "react";
import ContactUpload from "@components/contact/ContactUpload";
import { FooterContainer, LayoutContainer } from "@containers/Common";

export interface PostsPropsWithSSR {
  ok: boolean;
  posts: MyGroundPost[];
}

const Contact: NextPage<{ posts: MyGroundPost[] }> = ({ posts }) => {
  const { data: contactPosts, mutate } =
    useSWR<PostsPropsWithSSR>("/api/contact");
  const [showModal, setShowModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [postId, setPostId] = useState<number>();
  const onOpenModal = (postId: number) => {
    if (showModal) return;
    setShowModal(true);
    setIsOpen(true);
    setPostId(postId);
  };
  const onCloseModal = () => {
    setTimeout(() => {
      mutate();
      setShowModal(false);
    }, 1000);
    setIsOpen(false);
  };

  return (
    <LayoutContainer title="CONTACT">
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
          {contactPosts?.posts.map((post, idx) => (
            <li
              key={post.id}
              style={{
                animationDelay: `${0.2 * (idx % contactPosts?.posts.length)}s`,
              }}
              className="flex h-80 w-full animate-fadein cursor-pointer flex-col items-start rounded-md border-2 opacity-0 shadow-lg lg:h-[28rem] lg:animate-fadeside"
              onClick={() => onOpenModal(post.id)}
            >
              <PostListItem
                title={post.title}
                name={post.name}
                content={post.content}
                created={post.created}
                colorCode={post.token}
              />
            </li>
          ))}
        </ul>

        {showModal && (
          <PostViewer id={postId} onCloseModal={onCloseModal} isOpen={isOpen} />
        )}
      </section>
      <FooterContainer />
    </LayoutContainer>
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
