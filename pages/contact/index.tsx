import FloatingButton from "@components/floating-btn";
import Layout from "@components/layout";
import RegDate from "@components/regDate";
import useAdmin from "@libs/client/useAdmin";
import useTimer from "@libs/client/useTimer";
import useToken from "@libs/client/useToken";
import { cls } from "@libs/client/utils";
import { Skeleton } from "@mui/material";
import { MyGroundPost } from "@prisma/client";
import type { NextPage } from "next";
import Link from "next/link";
import { useEffect } from "react";
import useSWR from "swr";

interface ContactResponse {
  ok: boolean;
  posts: MyGroundPost[];
}

interface NoticeResponse {
  ok: boolean;
  noticePosts: {
    title: string;
    category: string;
    slug: string;
    date: string;
    newer: boolean;
  }[];
}

const Contact: NextPage = () => {
  const { admin, ok } = useAdmin();
  const { token, ok: tokenOk } = useToken();
  const { data } = useSWR<ContactResponse>("/api/contact");
  const { data: noticeData } = useSWR<NoticeResponse>("/api/notice");
  useEffect(() => {
    if (noticeData && noticeData.ok) {
      noticeData.noticePosts.map((e) => {
        const alterDate = new Date(e.date);
        const today = new Date();
        e.date = alterDate.toString();
        if (
          Math.floor(
            (today.getTime() - alterDate.getTime()) / (1000 * 60 * 60 * 24)
          ) > 7
        ) {
          e.newer = false;
        } else {
          e.newer = true;
        }
      });
    }
  }, [noticeData]);
  return (
    <Layout title="CONTACT">
      <div className="flex flex-col space-y-3 px-3">
        <div className="flex w-full flex-row items-center border-2">
          <div className="w-24 border-r-2 text-center font-bold">공지사항</div>
          <div className="flex flex-1 flex-col items-center justify-center">
            {noticeData?.noticePosts
              ?.filter((e) => e.category === "main")
              .sort((a, b) => (a.date > b.date ? -1 : 1))
              .map(
                (notice) =>
                  notice.newer && (
                    <div key={notice.slug} className="flex-1 text-center">
                      <Link href={`notice/${notice.slug}`}>
                        <a
                          target="_blank"
                          className="animate-pulse text-center font-bold text-slate-500"
                        >
                          {notice.title}
                        </a>
                      </Link>
                    </div>
                  )
              )}
          </div>
        </div>
        <div className="flex flex-row items-center justify-between divide-x-2 font-bold">
          <span className="w-20 text-center">작성자</span>
          <span className="w-3/5 text-center">제 목</span>
          <span className="w-20 text-center">작성일</span>
        </div>
        {data
          ? data?.posts.map((post) => (
              <div
                key={post.id}
                className={cls(
                  ok
                    ? "block"
                    : !post.isSecret
                    ? "block"
                    : post.token === token
                    ? "block"
                    : "hidden",
                  "flex w-full flex-row items-center justify-between space-x-3 divide-x-2"
                )}
              >
                <div className="relative flex w-20 flex-row items-center text-center text-sm">
                  <div className="absolute -right-2.5 sm:-right-5">
                    {post.isSecret ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-amber-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
                        />
                      </svg>
                    )}
                  </div>
                  <div>{post.name}</div>
                </div>
                <Link href={`/contact/${post.id}`}>
                  <a className="flex w-3/5 cursor-pointer items-start justify-start pl-2 text-xl">
                    {post.title}
                  </a>
                </Link>
                <div className="w-20 text-center text-sm">
                  <RegDate regDate={post.created} y m d />
                </div>
              </div>
            ))
          : [...Array.from(Array(10).keys())].map((i) => (
              <div
                key={i}
                className="flex w-full flex-row items-center justify-between space-x-3 divide-x-2"
              >
                <div className="flex w-20 items-center justify-center">
                  <Skeleton
                    variant="text"
                    animation="wave"
                    height={40}
                    width={60}
                  />
                </div>
                <div className="flex w-3/5 items-center justify-center pl-2">
                  <Skeleton
                    variant="text"
                    animation="wave"
                    height={40}
                    width={270}
                  />
                </div>
                <div className="flex w-20 items-center justify-center">
                  <Skeleton
                    variant="text"
                    animation="wave"
                    height={40}
                    width={60}
                  />
                </div>
              </div>
            ))}
        <FloatingButton href="/contact/upload" type="Upload">
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
      </div>
    </Layout>
  );
};

export default Contact;
