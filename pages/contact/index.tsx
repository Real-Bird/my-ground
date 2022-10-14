import Button from "@components/buttonComponent";
import FloatingButton from "@components/floatingBtn";
import Layout from "@components/layout";
import RegDate from "@components/regDate";
import useAdmin from "@libs/client/useAdmin";
import useToken from "@libs/client/useToken";
import { cls } from "@libs/client/utils";
import { Skeleton } from "@mui/material";
import { MyGroundPost } from "@prisma/client";
import type { NextPage } from "next";
import Link from "next/link";
import useSWR from "swr";

interface ContactResponse {
  ok: boolean;
  posts: MyGroundPost[];
}

const Contact: NextPage = () => {
  const { admin, ok } = useAdmin();
  const { token, ok: tokenOk } = useToken();
  const { data } = useSWR<ContactResponse>("/api/contact");
  return (
    <Layout title="CONTACT" isFooter>
      <div className="mx-3 flex w-full flex-col space-y-3 text-center lg:my-5 lg:w-[80%]">
        <div className="flex w-full flex-row items-center justify-center lg:relative">
          <h1 className="text-center text-xl font-bold text-red-600 lg:py-5 lg:text-2xl">
            Posts List
          </h1>
          {ok && (
            <Link href={"/contact/upload"}>
              <a className="hidden lg:absolute lg:right-0 lg:block lg:h-12 lg:w-24">
                <Button text="Upload" />
              </a>
            </Link>
          )}
        </div>
        <div className="flex flex-row items-center justify-between space-x-2 divide-x-2 border-2 lg:text-xl lg:font-bold">
          <div className="w-24 lg:w-52 lg:py-2">작성자</div>
          <div className="w-3/5 lg:py-2">제 목</div>
          <div className="w-24 lg:w-52 lg:py-2">작성일</div>
        </div>
        <ul className="divide-y-2 border-2">
          {data
            ? data?.posts.map((post) => (
                <li
                  key={post.id}
                  className={cls(
                    ok
                      ? "block"
                      : !post.isSecret
                      ? "block"
                      : post.token === token
                      ? "block"
                      : "hidden",
                    "flex w-full flex-row items-center justify-between space-x-1 divide-x-2"
                  )}
                >
                  <div className="flex w-24 items-center justify-center py-2 pl-1 lg:w-52">
                    <div className="flex w-full items-center justify-start text-sm lg:w-44 lg:text-xl">
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
                      <span className="w-5/6">{post.name}</span>
                    </div>
                  </div>
                  <Link href={`/contact/${post.id}`}>
                    <a className="flex w-3/5 cursor-pointer items-center justify-center py-2 text-sm font-bold lg:text-xl">
                      {post.title.length > 15
                        ? `${post.title.slice(0, 15)}...`
                        : post.title}
                    </a>
                  </Link>
                  <div className="w-24 py-2 text-center text-sm lg:w-52 lg:text-xl">
                    <RegDate regDate={post.created} y m d />
                  </div>
                </li>
              ))
            : [...Array.from(Array(10).keys())].map((i) => (
                <li
                  key={i}
                  className="flex flex-row items-center justify-between space-x-6 divide-x-2 px-2"
                >
                  <Skeleton
                    variant="text"
                    animation="wave"
                    className="h-8 w-16 py-2 text-sm lg:h-11 lg:w-56"
                  />
                  <Skeleton
                    variant="text"
                    animation="wave"
                    className="h-8 flex-[0.8] py-2 font-semibold lg:h-11"
                  />
                  <Skeleton
                    variant="text"
                    animation="wave"
                    className="h-8 w-16 py-2 text-sm lg:h-11 lg:w-56"
                  />
                </li>
              ))}
        </ul>
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
