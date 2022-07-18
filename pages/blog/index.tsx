import Layout from "@components/layout";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <Layout title="BLOG">
      <h1 className="text-xl text-red-600">My Blog</h1>
    </Layout>
  );
};

export default Home;
