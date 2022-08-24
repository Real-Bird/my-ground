import Layout from "@components/layout";
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
      <div className="w-3/4 divide-y-2 text-center">
        {posts?.map((item, idx) => (
          <div key={idx} className="mx-10 mb-5 mt-2 px-10 pt-5">
            <Link href={`/notice/${item.slug}`}>
              <a>
                <span className="text-xl font-semibold text-red-500">
                  {item.title}
                </span>
                <div>
                  <span>
                    {item.date} / {item.category}
                  </span>
                </div>
              </a>
            </Link>
          </div>
        ))}
      </div>
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
