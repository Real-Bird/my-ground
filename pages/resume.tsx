import { LayoutContainer } from "@containers/Common";
import type { NextPage } from "next";

const Resume: NextPage = () => {
  return (
    <LayoutContainer title="RESUME">
      <div className="w-full">
        <iframe
          src="https://real-bird.github.io/RB_todo/resume.pdf"
          className="absolute right-0 left-0 top-0 bottom-0 h-[100vh] w-full"
        ></iframe>
      </div>
    </LayoutContainer>
  );
};

export default Resume;
