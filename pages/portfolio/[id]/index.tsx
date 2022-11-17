import Layout from "@components/common/layout";
import type { NextPage } from "next";
import PortfolioItemContainer from "@containers/portfolioItemContainer";

const PortfolioDetail: NextPage = () => {
  return (
    <Layout title="Portfolio" backUrl="/portfolio">
      <div className="w-full flex-col items-center justify-center space-y-2 px-3 lg:my-5 lg:flex">
        <PortfolioItemContainer />
      </div>
    </Layout>
  );
};

export default PortfolioDetail;
