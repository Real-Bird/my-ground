import Layout from "@components/layout";
import { MyPortfolio, StackBadge } from "@prisma/client";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import useSWR from "swr";
import "@uiw/react-markdown-preview/markdown.css";
import FloatingButton from "@components/floating-btn";
import Link from "next/link";
import { useEffect, useState } from "react";
import useAdmin from "@libs/client/useAdmin";
import Button from "@components/button-component";

interface BadgeWithPf extends MyPortfolio {
  stackBadge: StackBadge[];
}

interface PortfolioProps {
  ok: boolean;
  portfolio: BadgeWithPf;
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

const PortfolioDetail: NextPage = () => {
  const router = useRouter();
  const { admin, ok } = useAdmin();
  const { data } = useSWR<PortfolioProps>(
    router.query.id ? `/api/portfolio/${router.query.id}` : null
  );
  useEffect(() => {
    if (data && !data.ok) {
      router.push("/404");
    }
  }, [data]);
  return (
    <Layout title="Portfolio" backUrl="/portfolio">
      <div className="flex-col items-center justify-center space-y-2 px-3 xl:my-5 xl:flex">
        {data && data?.portfolio ? (
          <div className="xl:w-2/3">
            <div className="flex w-full flex-row items-center justify-center border-b-2 border-dotted xl:relative">
              <h1 className="pt-1 pb-5 text-center text-5xl font-bold">
                {data?.portfolio.title}
              </h1>
              {ok && (
                <Link href={`/portfolio/${router.query.id}/revised`}>
                  <Button
                    text="Revised"
                    className="hidden xl:absolute xl:right-0 xl:block xl:h-12 xl:w-24"
                  />
                </Link>
              )}
            </div>
            <div className="py-5">
              <div className="flex flex-row justify-center md:justify-between">
                <div className="flex w-40 flex-col items-center space-y-1 md:w-[20%]">
                  <span className="font-semibold">Stack</span>
                  <div className="mx-auto w-36">
                    <div className="flex flex-row flex-wrap justify-start">
                      {data?.portfolio.stackBadge.map((stack) => (
                        <img
                          key={stack.id}
                          src={`https://img.shields.io/badge/${stack.stackName}-${stack.stackColor}?style=flat&logo=${stack.stackName}&logoColor=white`}
                          alt={stack.stackName}
                          className="m-0.5"
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex w-1/3 flex-row justify-evenly space-x-5">
                  <Link href={data?.portfolio.github}>
                    <a
                      target="_blank"
                      className="flex flex-1 flex-col items-center space-y-1"
                    >
                      <span className="font-semibold">Github</span>
                      <svg
                        role="img"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8"
                      >
                        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                      </svg>
                    </a>
                  </Link>
                  <Link href={data?.portfolio.deploy}>
                    <a
                      target="_blank"
                      className="flex flex-1 flex-col items-center"
                    >
                      <span className="font-semibold">Deploy</span>
                      <div
                        className="h-8 w-8 py-1.5"
                        dangerouslySetInnerHTML={{
                          __html: data?.portfolio.deployIcon,
                        }}
                      />
                    </a>
                  </Link>
                </div>
                <div className="flex w-1/3 flex-col items-center md:w-[20%]">
                  <div className="font-semibold">Develop Date</div>
                  <div className="w-28 text-center">
                    <div className="text-sm">
                      <span className="letter-spacing-1.5">Start</span>:{" "}
                      {data?.portfolio.startDate}
                    </div>
                    <div className="text-sm">
                      <span>Finish</span>: {data?.portfolio.endDate}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="min-h-[68vh] rounded-md bg-slate-300 p-3">
              <MarkdownViewer source={data?.portfolio.content} />
            </div>
          </div>
        ) : null}
      </div>
      {ok && (
        <FloatingButton
          href={`/portfolio/${router.query.id}/revised`}
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
      )}
    </Layout>
  );
};

export default PortfolioDetail;
