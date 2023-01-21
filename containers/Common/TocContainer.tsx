import Toc from "@components/portfolio/Toc";
import { useIntersectionObserver } from "@libs/client/useIntersectionObserver";
import { useState } from "react";

interface TocContainer {
  title: string;
  content: string;
}

export interface TOCList {
  title: string;
  link: string;
  count: number;
}

export const TocContainer = ({ title, content }: TocContainer) => {
  const [activeId, setActiveId] = useState("");

  useIntersectionObserver(setActiveId, content);

  const titles = content.split(`\n`).filter((t) => t.includes("# "));
  const result: TOCList[] = titles
    .filter((str) => str[0] === "#")
    .map((item) => {
      let count = item.match(/#/g)?.length;
      if (count) {
        count = count * 5;
      }
      const title = item.split("# ")[1].replace(/`/g, "").trim();
      const link = title
        .replaceAll(/[`~!@#\$%\^&\*()=\+\\|\/\?<>,.\[\]_]/g, "")
        .replaceAll(" ", "-")
        .toLowerCase();
      return {
        title,
        link,
        count,
      };
    });
  return (
    <div className="fixed top-20 right-5 hidden w-48 text-sm text-slate-400 lg:block">
      <h1 className="mb-1 border-b-2 border-dotted border-gray-400 text-center text-lg font-bold">
        {title}
      </h1>
      <Toc result={result} activeId={activeId} />
    </div>
  );
};
