import Layout from "@components/common/layout";
import PortfolioList from "@components/portfolio/portfolioList";

const PortfolioContainer = () => {
  return (
    <Layout title="PORTFOLIO" isFooter>
      <PortfolioList />
    </Layout>
  );
};

export default PortfolioContainer;
