import {
  Educations,
  Etc,
  HomeOverview,
  Introduce,
  Portfolios,
  TechStacks,
} from "@components/home";
import { FooterContainer, LayoutContainer } from "@containers/Common";
import useAdmin from "@libs/client/useAdmin";
import { educations, etc, introduction, portfolios, stacks } from "payload";

const HomeContainer = () => {
  // const [isResumeTab, setIsResumeTab] = useState(true);
  const { ok } = useAdmin();

  return (
    <>
      <LayoutContainer title="WELCOME">
        <section className="mx-3 my-5 flex h-fit w-full max-w-3xl flex-col space-y-3">
          <header>
            <div className="flex flex-wrap items-end gap-2 lg:flex-nowrap lg:space-x-10">
              <div className="flex items-end space-x-2">
                <h1 className="text-2xl font-extrabold lg:text-4xl">김진영</h1>
                <h3 className="text-lg font-semibold text-gray-500 lg:text-xl">
                  Kim Jin Young
                </h3>
              </div>
              <h2 className="text-xl font-bold lg:text-2xl">
                Web Front-End Developer
              </h2>
            </div>
            <div className="w-full text-center">
              <strong>
                내가 <em className="font-bold text-amber-500">겪는</em> 에러는
                이미 누군가가 <em className="font-bold text-amber-500">해결</em>
                한 에러이다.
              </strong>
            </div>
            {/* <nav className="mt-5">
              <ul className="flex items-end justify-between">
                <li
                  className="flex w-5/12 cursor-pointer flex-col"
                  onClick={() => setIsResumeTab(true)}
                >
                  <ResumeTab isToggle={isResumeTab} label="Resume" />
                </li>
                <li
                  className="flex w-5/12 cursor-pointer flex-col"
                  onClick={() => setIsResumeTab(false)}
                >
                  <ResumeTab
                    isToggle={!isResumeTab}
                    label="Self-Introduction"
                  />
                </li>
              </ul>
            </nav> */}
          </header>
          <main className="w-full">
            {/* {isResumeTab ? ( */}
            <section
              key="resume"
              className="animate-fadein space-y-2 divide-y-2"
            >
              <HomeOverview
                title="Profile"
                opt={
                  ok && <div className="h-2 w-2 rounded-full bg-green-500" />
                }
              >
                <Introduce intros={introduction} />
              </HomeOverview>
              <HomeOverview title="Tech Stacks">
                <TechStacks stacks={stacks} />
              </HomeOverview>
              <HomeOverview title="Portfolios">
                <Portfolios portfolios={portfolios} />
              </HomeOverview>
              <HomeOverview title="Educations">
                <Educations educations={educations} />
              </HomeOverview>
              <HomeOverview title="ETC">
                <Etc etc={etc} />
              </HomeOverview>
            </section>
            {/*  ) : (
              <section
                key="self-introduction"
                className="animate-fadein space-y-2 divide-y-2"
              >
                {selfIntroduction.map((intro) => (
                  <HomeOverview key={intro.title} title={intro.title}>
                    <SelfIntroduction details={intro.details} />
                  </HomeOverview>
                ))}
              </section>
                )}*/}
          </main>
        </section>
      </LayoutContainer>
      <FooterContainer />
    </>
  );
};

export default HomeContainer;
