import { FloatingButton, Meta } from "@components/common";
import PortfolioLoading from "@components/portfolio/PortfolioLoadingCmpt";
import { LayoutContainer, TocContainer } from "@containers/Common";
import useAdmin from "@libs/client/useAdmin";
import { MyPortfolio, StackBadge } from "@prisma/client";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { Suspense, useEffect, useRef } from "react";
import useSWR from "swr";

export interface BadgeWithPf extends MyPortfolio {
  stackBadge: StackBadge[];
}

interface PortfolioProps {
  ok: boolean;
  portfolio: BadgeWithPf;
}

const PortfolioItem = dynamic(
  async () => await import("@components/portfolio/PortfolioItemCmpt"),
  { suspense: true }
);

const PortfolioItemContainer = () => {
  const router = useRouter();
  const { ok } = useAdmin();
  const { data } = useSWR<PortfolioProps>(
    router.query.id ? `/api/portfolio/${router.query.id}` : null,
    { fallback: <PortfolioLoading /> }
  );
  const headingsRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (data && !data.ok) {
      router.push("/404");
    }
  }, [data, router]);
  return (
    <>
      <Meta og_title={data?.portfolio.title} og_url={router.asPath} />
      <LayoutContainer
        title={data?.portfolio.title ?? "LOADING"}
        backUrl="/portfolio"
      >
        <div
          className="w-full flex-col items-center justify-center space-y-2 px-3 lg:my-5 lg:flex"
          ref={headingsRef}
        >
          <Suspense fallback={<PortfolioLoading />}>
            {data && <PortfolioItem ok={ok} portfolioData={data?.portfolio} />}
          </Suspense>
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
        </div>
        <TocContainer
          headingsRef={headingsRef}
          content={data ? data.portfolio.content : ""}
          title={data ? data.portfolio.title : ""}
        />
      </LayoutContainer>
    </>
  );
};

export default PortfolioItemContainer;
