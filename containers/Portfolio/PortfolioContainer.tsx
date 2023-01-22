import PortfolioList from "@components/portfolio/PortfolioListCmpt";
import { FooterContainer, LayoutContainer } from "@containers/Common";
import useAdmin from "@libs/client/useAdmin";
import { MyPortfolio } from "@prisma/client";
import useSWR from "swr";

interface PortfolioResponse {
  ok: boolean;
  portfolio: MyPortfolio[];
}

const PortfolioContainer = () => {
  const { ok } = useAdmin();
  const { data } = useSWR<PortfolioResponse>("/api/portfolio");
  return (
    <>
      <LayoutContainer title="PORTFOLIO">
        <PortfolioList isAuth={ok} portfolio={data?.portfolio} />
      </LayoutContainer>
      <FooterContainer />
    </>
  );
};
export default PortfolioContainer;
