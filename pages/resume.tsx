import type { NextPage } from "next";
import Layout from "@components/layout";

const NotFound: NextPage = () => {
  return (
    <Layout title="RESUME">
      <div className="w-full">
        <iframe
          src="https://real-bird.github.io/RB_todo/resume.pdf"
          className="absolute right-0 left-0 top-0 bottom-0 h-[100vh] w-full"
        ></iframe>
      </div>
    </Layout>
  );
};

export default NotFound;
