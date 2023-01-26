import { Toc } from "@components/form";
import getIntersectionObserver from "@libs/client/getIntersectionObserver";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

interface TocContainer {
  title: string;
  content: string;
  headingsRef: React.MutableRefObject<HTMLDivElement>;
}

export interface TOCList {
  title: string;
  link: string;
  count: number;
}
export type RefProps = { [key: string]: IntersectionObserverEntry };

export const TocContainer = ({ title, content, headingsRef }: TocContainer) => {
  const [results, setResults] = useState<TOCList[]>([]);

  useEffect(() => {
    const titles = content.split(`\n`).filter((t) => t.includes("# "));
    setResults(
      titles
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
        })
    );
  }, [content]);

  const [activeId, setActiveId] = useState("");
  const headingElementsRef = useRef<RefProps>({});
  const router = useRouter();
  useEffect(() => {
    const headingElements = Array.from<HTMLHeadingElement>(
      headingsRef?.current?.querySelectorAll("h1, h2, h3")
    );

    const observer = getIntersectionObserver(
      setActiveId,
      headingElementsRef,
      headingElements
    );
    headingElements.map((header) => {
      observer.observe(header);
    });
    return () => observer.disconnect();
  }, [router, headingsRef, activeId, headingElementsRef]);
  return (
    <div className="fixed top-20 right-5 hidden w-48 text-sm text-slate-400 lg:block">
      <h1 className="mb-1 border-b-2 border-dotted border-gray-400 text-center text-lg font-bold">
        {title}
      </h1>
      <Toc result={results} activeId={activeId} />
    </div>
  );
};
