import FloatingButton from "@components/floating-btn";
import Layout from "@components/layout";
import useAdmin from "@libs/client/useAdmin";
import { MyPortfolio } from "@prisma/client";
import type { NextPage } from "next";
import Link from "next/link";
import useSWR from "swr";

interface PortfolioProps {
  ok: boolean;
  portfolio: MyPortfolio[];
}

const Portfolio: NextPage = () => {
  const { admin, ok } = useAdmin();
  const { data } = useSWR<PortfolioProps>("/api/portfolio");
  return (
    <Layout title="PORTFOLIO">
      <div className="mx-3 flex flex-col space-y-3">
        <h1 className="text-center text-xl text-red-600">My Portfolio List</h1>
        {data ? (
          <div className="flex flex-row">
            {data?.portfolio.map((pf) => (
              <Link href={`/portfolio/${pf.id}`} key={pf.id}>
                <a className="flex aspect-video w-56 flex-col items-center rounded-md shadow-md">
                  <img src={pf.thumbnail} className="h-32 w-56 rounded-md" />
                  <div className="py-1 text-center text-xl font-bold">
                    {pf.title}
                  </div>
                </a>
              </Link>
            ))}
          </div>
        ) : (
          <div className="h-32 w-56 rounded-md bg-slate-300 shadow-md" />
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
