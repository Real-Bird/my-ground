import { readdirSync } from "fs";
import matter from "gray-matter";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import dynamic from "next/dynamic";
import "@uiw/react-markdown-preview/markdown.css";
import { LayoutContainer } from "@containers/Common";
import { MarkdownPreviewProps } from "@uiw/react-markdown-preview";

const MarkdownPreview = dynamic<MarkdownPreviewProps>(
  () => import("@uiw/react-markdown-preview"),
  {
    ssr: false,
  }
);

const NoticeDetail: NextPage<{ post: string; data: any }> = ({
  post,
  data,
}) => {
  return (
    <LayoutContainer title="NOTICE" backUrl="/notice">
      <div className="m-5 w-[80%] space-y-2">
        <h1 className="py-5 text-center text-3xl font-bold">{data.title}</h1>
        <div
          className="min-h-[68vh] w-full rounded-md bg-slate-300 p-3"
          data-color-mode="light"
        >
          <MarkdownPreview
            source={post}
            wrapperElement={{ "data-color-mode": "light" }}
            style={{ backgroundColor: "#cbd5e1" }}
          />
        </div>
      </div>
    </LayoutContainer>
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  const files = readdirSync("./notice").map((file) => {
    const [name, extension] = file.split(".");
    return { params: { slug: name } };
  });
  return {
    paths: files,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { content, data } = matter.read(`./notice/${ctx.params?.slug}.md`);
  return { props: { data, post: content } };
};

export default NoticeDetail;
