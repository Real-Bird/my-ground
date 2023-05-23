import { AboutMe, Introduce, ResumeTab, TechStacks } from "@components/home";
import { FooterContainer, LayoutContainer } from "@containers/Common";
import useAdmin from "@libs/client/useAdmin";
import { cls } from "@libs/client/utils";
import { introduction } from "payload";
import { useState } from "react";

const HomeContainer = () => {
  const [isResumeTab, setIsResumeTab] = useState(true);
  const { ok } = useAdmin();

  return (
    <>
      <LayoutContainer title="WELCOME">
        <section className="mx-3 my-5 flex h-fit w-full max-w-3xl flex-col space-y-3">
          <header>
            <div className="flex items-end space-x-10">
              <div className="flex items-end space-x-2">
                <h1 className="text-4xl font-extrabold">김진영</h1>
                <h3 className="text-xl font-semibold text-gray-500">
                  Kim Jin Young
                </h3>
              </div>
              <h2 className="text-2xl font-bold">Web Front-End Developer</h2>
            </div>
            <nav className="mt-5">
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
            </nav>
          </header>
          <main className="w-full">
            {isResumeTab ? (
              <section className="w-full animate-fadein">
                <Introduce ok={ok} intros={introduction} />
              </section>
            ) : (
              <section>
                <p className="w-full animate-fadein">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Integer viverra pulvinar nunc, et fringilla ante. Donec vel
                  diam id ligula blandit scelerisque eget non leo. In posuere
                  finibus lacus non fringilla. Aenean quis tempus libero.
                  Maecenas posuere, ante cursus eleifend feugiat, eros elit
                  ultrices urna, pharetra tristique purus eros at sem. Integer
                  sodales tempor dui. Phasellus vehicula iaculis ante id
                  efficitur. Suspendisse et mi eros. Nulla dictum, magna et
                  scelerisque ultrices, dui leo bibendum tortor, nec accumsan
                  felis nisl ac lectus. Duis vel turpis suscipit, pharetra
                  libero eu, consequat felis. Maecenas luctus tincidunt velit,
                  sit amet suscipit nunc pharetra a. In hac habitasse platea
                  dictumst. Ut pharetra venenatis leo in condimentum. In gravida
                  dapibus sapien, nec sodales purus consequat at. Aenean quis
                  leo quam. Aliquam erat volutpat.
                </p>
              </section>
            )}
          </main>
        </section>
      </LayoutContainer>
      <FooterContainer />
    </>
  );
};

export default HomeContainer;
