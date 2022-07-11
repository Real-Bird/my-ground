import Layout from "@components/layout";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <Layout title="HOME">
      <h1 className="text-xl text-red-600">My Home</h1>
    </Layout>
  );
};

export default Home;
