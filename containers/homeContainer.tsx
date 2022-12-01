import Layout from "@components/common/layout";
import AboutMe from "@components/home/aboutMe";
import Introduce from "@components/home/introduce";
import TechStacks from "@components/home/techStacks";
import useAdmin from "@libs/client/useAdmin";

const HomeContainer = () => {
  const { ok } = useAdmin();
  return (
    <Layout title="HOME" isFooter>
      <section className="mx-3 my-5 flex h-fit flex-col space-y-3 divide-y-2">
        <Introduce ok={ok} />
        <TechStacks />
        <AboutMe />
      </section>
    </Layout>
  );
};

export default HomeContainer;
