import FloatingButton from "@components/floatingBtn";
import Layout from "@components/layout";
import useAdmin from "@libs/client/useAdmin";
import { MyPortfolio } from "@prisma/client";
import type { NextPage } from "next";
import Link from "next/link";
import useSWR from "swr";
import { Skeleton } from "@mui/material";
import Button from "@components/buttonComponent";

interface PortfolioProps {
  ok: boolean;
  portfolio: MyPortfolio[];
}

const Portfolio: NextPage = () => {
  const { admin, ok } = useAdmin();
  const { data } = useSWR<PortfolioProps>("/api/portfolio");
  return (
    <Layout title="PORTFOLIO" isFooter>
      <div className="mx-3 flex w-11/12 flex-col space-y-3 lg:my-5 lg:items-center">
        <div className="flex w-full flex-row items-center justify-center lg:relative lg:w-[80%]">
          <h1 className="text-center text-xl text-red-600 md:py-5 md:text-2xl md:font-bold">
            My Portfolio List
          </h1>
          {ok && (
            <Link href={"/portfolio/upload"}>
              <a className="hidden lg:absolute lg:right-0 lg:block lg:h-12 lg:w-24">
                <Button text="Upload" />
              </a>
            </Link>
          )}
        </div>
        {data ? (
          <ul className="grid w-full grid-cols-2 gap-2 lg:grid-cols-4 lg:gap-4">
            {data?.portfolio?.map((pf) => (
              <li key={pf.id}>
                <Link href={`/portfolio/${pf.id}`}>
                  <a className="flex aspect-video w-full flex-col items-center rounded-md shadow-md">
                    <img
                      src={pf.thumbnail}
                      className="h-32 w-full rounded-md bg-slate-400 lg:h-48"
                      alt={pf.thumbnail}
                    />
                    <div className="py-1 text-center text-xl font-bold">
                      {pf.title}
                    </div>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="grid grid-cols-2 gap-2 lg:w-full lg:grid-cols-4 lg:gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <li
                key={i}
                className="flex aspect-video w-full flex-col items-center rounded-md shadow-md"
              >
                <Skeleton
                  animation="wave"
                  variant="rectangular"
                  height="80%"
                  className="h-32 w-full rounded-md lg:h-48"
                />
                <Skeleton
                  variant="text"
                  height="15%"
                  className="h-8 w-3/4 lg:h-12"
                />
              </li>
            ))}
          </ul>
        )}
      </div>
      {ok && (
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
    </Layout>
  );
};

export default Portfolio;
