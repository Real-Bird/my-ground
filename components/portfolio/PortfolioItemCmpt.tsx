import { BadgeWithPf } from "@containers/Portfolio/PortfolioItemContainer";
import dynamic from "next/dynamic";
import Link from "next/link";
import { PostNavBtn } from "@components/common";
import { RefObject } from "react";

const MarkDownViewer = dynamic(
  async () => await import("@components/common/MarkdownViewer"),
  { loading: () => <div>Loading...</div> }
);

interface PortfolioItemProps {
  ok: boolean;
  portfolioData: BadgeWithPf;
  theme: "light" | "dark";
}

const PortfolioItem = ({ ok, portfolioData, theme }: PortfolioItemProps) => {
  const {
    title,
    id,
    stackBadge,
    github,
    deploy,
    deployIcon,
    startDate,
    endDate,
    content,
  } = portfolioData;
  return (
    <div className="lg:w-2/3">
      <div className="flex w-full flex-row items-center justify-center border-b-2 border-dotted lg:relative">
        <h1 className="break-all pb-5 pt-1 text-start text-2xl font-bold lg:text-5xl">
          {title}
        </h1>
      </div>
      <div className="py-5">
        <div className="flex flex-row justify-center md:justify-between">
          <div className="flex items-end space-x-2">
            <PostNavBtn link="/portfolio" text="목록" />
            {ok && <PostNavBtn link={`/portfolio/${id}/revised`} text="수정" />}
          </div>
          <div className="flex w-40 flex-col items-center space-y-1 md:w-[20%]">
            <span className="font-semibold">Stack</span>
            <div className="mx-auto w-36">
              <ul className="flex flex-row flex-wrap justify-start">
                {stackBadge.map(({ id, stackName, stackColor }) => (
                  <li key={id}>
                    <img
                      src={`https://img.shields.io/badge/${stackName}-${stackColor}?style=flat&logo=${stackName}&logoColor=white`}
                      alt={stackName}
                      className="m-0.5"
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex w-1/3 flex-row justify-evenly space-x-5">
            <Link href={github}>
              <a
                target="_blank"
                className="flex flex-1 flex-col items-center space-y-1"
              >
                <span className="font-semibold">Github</span>
                <svg
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 dark:fill-white"
                >
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
              </a>
            </Link>
            <Link href={deploy}>
              <a
                target="_blank"
                className="flex flex-1 flex-col items-center space-y-1"
              >
                <span className="font-semibold">Deploy</span>
                <div
                  className="h-8 w-8 py-1.5"
                  dangerouslySetInnerHTML={{
                    __html: deployIcon,
                  }}
                />
              </a>
            </Link>
          </div>
          <div className="flex w-1/3 flex-col items-center md:w-1/5">
            <div className="font-semibold">Develop Date</div>
            <div className="w-36 text-center">
              <div className="text-sm">
                <span className="letter-spacing-1.5">Start</span>: {startDate}
              </div>
              <div className="text-sm">
                <span>Finish</span>: {endDate}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="min-h-[68vh] rounded-md bg-slate-300 p-3 dark:bg-slate-600"
        data-color-mode={theme}
      >
        <MarkDownViewer markdown={content} title={title} />
      </div>
    </div>
  );
};

export default PortfolioItem;
