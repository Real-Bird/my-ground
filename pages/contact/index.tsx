import FloatingButton from "@components/floating-btn";
import Layout from "@components/layout";
import { MyGroundPost } from "@prisma/client";
import type { NextPage } from "next";
import Link from "next/link";
import useSWR from "swr";

interface ContactReponse {
  ok: boolean;
  posts: MyGroundPost[];
}

const Home: NextPage = () => {
  const { data } = useSWR<ContactReponse>("/api/contact");
  return (
    <Layout title="CONTACT">
      <div className="mx-3 flex flex-col space-y-3">
        {data?.posts.map((post) => (
          <Link key={post.id} href={`/contact/${post.id}`}>
            <a className="cursor-pointer">{post.title}</a>
          </Link>
        ))}
        <FloatingButton href="/contact/upload">
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
