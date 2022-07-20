import Layout from "@components/layout";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <Layout title="BLOG">
      <div className="mx-3 flex flex-col space-y-3">
        <h1 className="text-xl text-red-600">My Blog</h1>
      </div>
    </Layout>
  );
};

export default Home;
