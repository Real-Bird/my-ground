import Layout from "@components/layout";
import { MyGroundPost } from "@prisma/client";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import useSWR from "swr";
import "@uiw/react-markdown-preview/markdown.css";
import RegDate from "@components/regDate";
import FloatingButton from "@components/floating-btn";
import { useEffect, useState } from "react";
import { Skeleton } from "@mui/material";
import Link from "next/link";
import Button from "@components/button-component";

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
  const [preview, setPreview] = useState(false);
  const handleResize = () => {
    setPreview(window.innerWidth >= 1280 ? true : false);
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    if (data && !data.ok) {
      router.push("/404");
    }
  }, [data]);
  return (
    <Layout title="POST" backUrl="/contact">
      <div className="space-y-2 px-3 xl:w-[80%] xl:py-4">
        {data && data.post ? (
          <>
            <div className="flex w-full flex-row items-center justify-center xl:relative">
              <h1 className="py-1 text-center text-5xl font-bold">
                {data?.post.title}
              </h1>
              <Link href={`/contact/${router.query.id}/revised`}>
                <Button
                  text="Revised"
                  className="hidden xl:absolute xl:right-0 xl:block xl:h-12 xl:w-24"
                />
              </Link>
            </div>
            <div className="flex flex-col items-end py-1 px-1">
              <div className="text-sm xl:text-[1rem]">
                <div>작성자: {data?.post.name}</div>
                <div className="flex flex-col xl:text-[1rem]">
                  <span>
                    작성일: <RegDate regDate={data?.post.created} y m d />
                  </span>
                  <span>
                    수정일: <RegDate regDate={data?.post.updated} y m d />
                  </span>
                </div>
              </div>
            </div>
            <div className="min-h-[68vh] rounded-md bg-slate-300 p-4">
              <MarkdownViewer source={data?.post.content} />
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center">
            <Skeleton
              variant="text"
              animation="wave"
              height={60}
              width={preview ? 980 : 320}
            />
            <div className="mr-3 flex w-full flex-col items-end py-3 pr-4">
              <Skeleton
                variant="text"
                animation="wave"
                height={20}
                width={120}
              />
              <Skeleton
                variant="text"
                animation="wave"
                height={20}
                width={120}
              />
              <Skeleton
                variant="text"
                animation="wave"
                height={20}
                width={120}
              />
            </div>
            <Skeleton
              variant="rectangular"
              className="min-h-[68vh] rounded-md p-3"
              width={preview ? 980 : 440}
              animation="wave"
            />
          </div>
        )}
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
