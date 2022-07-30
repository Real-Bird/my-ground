import Layout from "@components/layout";
import { MyGroundPost } from "@prisma/client";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import useSWR from "swr";
import "@uiw/react-markdown-preview/markdown.css";
import RegDate from "@components/regDate";
import FloatingButton from "@components/floating-btn";
import { useEffect } from "react";

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
  useEffect(() => {
    if (data && !data.ok) {
      router.push("/404");
    }
  }, [data]);
  return (
    <Layout title="POST" backUrl="/contact">
      <div className="space-y-2 px-3">
        {data && data.post ? (
          <>
            <h1 className="py-1 text-center text-5xl font-bold">
              {data?.post.title}
            </h1>
            <div className="flex flex-col items-end py-1">
              <div className="text-sm">
                <div>작성자: {data?.post.name}</div>
                <div>
                  작성일: <RegDate regDate={data?.post.updated} y m d />
                </div>
              </div>
            </div>
            <div className="min-h-[68vh] rounded-md bg-slate-300 p-3">
              <MarkdownViewer source={data?.post.content} />
            </div>
          </>
        ) : null}
      </div>
      <FloatingButton
        href={`/contact/${router.query.id}/revised`}
        type="Revised"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
          <path
            fillRule="evenodd"
            d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
            clipRule="evenodd"
          />
        </svg>
      </FloatingButton>
    </Layout>
  );
};

export default PostDetail;
