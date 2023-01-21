import { MyPortfolio } from "@prisma/client";
import Link from "next/link";
import { Skeleton } from "@mui/material";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { Button, FloatingButton } from "@components/common";

interface PortfolioProps {
  isAuth: boolean;
  portfolio: MyPortfolio[];
}

const PortfolioListItem = dynamic(
  async () => await import("@components/portfolio/portfolioListItem"),
  { suspense: true }
);

const PortfolioList = ({ isAuth, portfolio }: PortfolioProps) => {
  return (
    <>
      <div className="mx-3 flex w-11/12 flex-col space-y-3 lg:my-5 lg:items-center">
        <div className="flex w-full flex-row items-center justify-center lg:relative lg:w-[80%]">
          <h1 className="text-center text-xl text-red-600 md:py-5 md:text-2xl md:font-bold">
            My Portfolio List
          </h1>
          {isAuth && (
            <Link href={"/portfolio/upload"}>
              <a className="hidden lg:absolute lg:right-0 lg:block lg:h-12 lg:w-24">
                <Button text="Upload" />
              </a>
            </Link>
          )}
        </div>
        <ul className="grid w-full grid-cols-2 gap-2 lg:grid-cols-4 lg:gap-4">
          {portfolio?.map((pf) => (
            <Suspense
              key={pf.id}
              fallback={
                <li className="flex aspect-video w-full flex-col items-center rounded-md shadow-md">
                  <Skeleton
                    animation="wave"
                    variant="rectangular"
                    height={"12rem"}
                    className="h-32 w-full rounded-md lg:h-48"
                  />
                  <Skeleton
                    variant="text"
                    height={"3rem"}
                    className="h-8 w-3/4 lg:h-12"
                  />
                </li>
              }
            >
              <PortfolioListItem
                id={pf.id}
                title={pf.title}
                thumbnail={pf.thumbnail}
              />
            </Suspense>
          ))}
        </ul>
      </div>
      {isAuth && (
        <FloatingButton href="/portfolio/upload" type="Portfolio Upload">
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
    </>
  );
};

export default PortfolioList;
