import Layout from "@components/layout";
import { readdirSync } from "fs";
import matter from "gray-matter";
import { GetStaticProps, NextPage } from "next";
import dynamic from "next/dynamic";
import remarkHtml from "remark-html";
import remarkParse from "remark-parse/lib";
import { unified } from "unified";
import "@uiw/react-markdown-preview/markdown.css";

const MarkdownViewer: any = dynamic(
  () =>
    import("@uiw/react-md-editor").then((mod: any) => {
      return mod.default.Markdown;
    }),
  {
    ssr: false,
  }
);

const NoticeDetail: NextPage<{ post: string; data: any }> = ({
  post,
  data,
}) => {
  return (
    <Layout head={data.title} title={data.title} canGoBack backUrl="back">
      <div className="min-h-[68vh] rounded-md bg-slate-300 p-3">
        <MarkdownViewer source={post} />
      </div>
    </Layout>
  );
};

export function getStaticPaths() {
  const files = readdirSync("./notice").map((file) => {
    const [name, extension] = file.split(".");
    return { params: { slug: name } };
  });
  return {
    paths: files,
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { content, data } = matter.read(`./notice/${ctx.params?.slug}.md`);
  const { value } = await unified()
    .use(remarkParse)
    .use(remarkHtml)
    .process(content);
  return { props: { data, post: value } };
};

export default NoticeDetail;
