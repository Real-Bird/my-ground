import Layout from "@components/layout";
import { MyGroundPost } from "@prisma/client";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import useSWR from "swr";

interface PostResponse {
  ok: boolean;
  post: MyGroundPost;
}

const Home: NextPage = () => {
  const router = useRouter();
  const { data } = useSWR<PostResponse>(
    router.query.id ? `/api/contact/${router.query.id}` : null
  );
  return (
    <Layout title="POST">
      <h1>{data?.post.title}</h1>
      <div>{data?.post.content}</div>
    </Layout>
  );
};

export default Home;
