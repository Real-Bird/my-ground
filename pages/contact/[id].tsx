import Layout from "@components/layout";
import { MyGroundPost } from "@prisma/client";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import useSWR from "swr";
import "@uiw/react-markdown-preview/markdown.css";
import RegDate from "@components/regDate";

interface PostResponse {
  ok: boolean;
  post: MyGroundPost;
}

const MarkdownViewer: any = dynamic(
  () =>
    import("@uiw/react-md-editor").then((mod: any) => {
      return mod.default.Markdown;
    }),
  {
    ssr: false,
  }
);

const PostDetail: NextPage = () => {
  const router = useRouter();
  const { data } = useSWR<PostResponse>(
    router.query.id ? `/api/contact/${router.query.id}` : null
  );
  return (
    <Layout title="POST">
      <div className="space-y-2 px-3">
        <h1 className="py-1 text-center text-5xl font-bold">
          {data?.post.title}
        </h1>
        <div className="flex flex-col items-end py-1">
          <div className="text-sm">
            <div>작성자: {data?.post.name}</div>
            <div>
              작성일: <RegDate regDate={data?.post.created} y m d />
            </div>
          </div>
        </div>
        <div className="min-h-[68vh] rounded-md bg-slate-300 p-3">
          <MarkdownViewer source={data?.post.content} />
        </div>
      </div>
    </Layout>
  );
};

export default PostDetail;
