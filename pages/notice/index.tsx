import Layout from "@components/layout";
import RegDate from "@components/regDate";
import { readdirSync, readFileSync } from "fs";
import matter from "gray-matter";
import { NextPage } from "next";
import Link from "next/link";

interface Post {
  title: string;
  date: string;
  category: string;
  slug: string;
}

const Notices: NextPage<{ posts: Post[] }> = ({ posts }) => {
  return (
    <Layout title="NOTICES" isFooter>
      <section className="mx-3 flex w-full flex-col space-y-3 text-center lg:my-5 lg:w-[80%]">
        <div className="flex w-full flex-row items-center justify-center lg:relative">
          <h1 className="text-center text-xl font-bold text-red-600 lg:py-5 lg:text-2xl">
            Notifications
          </h1>
        </div>
        <ul className="divide-y-2 border-2">
          {posts?.map((post) => (
            <li
              key={post.slug}
              className="flex flex-row items-center justify-between space-x-2 divide-x-2"
            >
              <span className="w-20 py-2 text-sm lg:w-64 lg:text-xl">
                {post.category}
              </span>
              <Link href={`/notice/${post.slug}`}>
                <a className="w-3/5 cursor-pointer overflow-x-clip text-ellipsis whitespace-pre py-2 text-sm font-semibold lg:text-xl">
                  {post.title}
                </a>
              </Link>
              <div className="w-24 py-2 text-sm lg:w-64 lg:text-xl">
                <RegDate regDate={new Date(post.date)} y m d />
              </div>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
};

export default Notices;

export async function getStaticProps() {
  const noticePosts = readdirSync("./notice").map((file) => {
    const content = readFileSync(`./notice/${file}`, "utf-8");
    const [slug, _] = file.split(".");
    return { ...matter(content).data, slug };
  });
  return {
    props: { posts: noticePosts.reverse() },
  };
}
