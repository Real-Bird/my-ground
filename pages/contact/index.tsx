import FloatingButton from "@components/floating-btn";
import Layout from "@components/layout";
import RegDate from "@components/regDate";
import { MyGroundPost } from "@prisma/client";
import type { NextPage } from "next";
import Link from "next/link";
import useSWR from "swr";

interface ContactResponse {
  ok: boolean;
  posts: MyGroundPost[];
}

const Home: NextPage = () => {
  const { data } = useSWR<ContactResponse>("/api/contact");
  return (
    <Layout title="CONTACT">
      <div className="flex flex-col space-y-3 px-3">
        <div className="flex flex-row items-center justify-between divide-x-2 font-bold">
          <span className="w-20 text-center">작성자</span>
          <span className="w-3/5 text-center">제 목</span>
          <span className="w-20 text-center">작성일</span>
        </div>
        {data?.posts.map((post) => (
          <div
            key={post.id}
            className="flex w-full flex-row items-center justify-between space-x-3 divide-x-2"
          >
            <div className="w-20 text-start text-sm">{post.name}</div>
            <Link href={`/contact/${post.id}`}>
              <a
                className="flex w-3/5 cursor-pointer items-start justify-start pl-2 text-xl"
                title={
                  post.content.length <= 120
                    ? post.content
                    : `${post.content.slice(0, 120)}...`
                }
              >
                {post.title}
              </a>
            </Link>
            <div className="w-20 text-end text-sm">
              <RegDate regDate={post.created} y m d />
            </div>
          </div>
        ))}
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
      </div>
    </Layout>
  );
};

export default Home;
