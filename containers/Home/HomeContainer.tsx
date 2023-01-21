import { AboutMe, Introduce, TechStacks } from "@components/home";
import { FooterContainer, LayoutContainer } from "@containers/Common";
import useAdmin from "@libs/client/useAdmin";

const HomeContainer = () => {
  const { ok } = useAdmin();
  return (
    <>
      <LayoutContainer title="HOME">
        <section className="mx-3 my-5 flex h-fit flex-col space-y-3 divide-y-2">
          <Introduce ok={ok} />
          <TechStacks />
          <AboutMe />
        </section>
      </LayoutContainer>
      <FooterContainer />
    </>
  );
};

export default HomeContainer;
