import { Toc } from "@components/form";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useTocList } from "@libs/client/useTocList";
import useHeadingObserver from "@libs/client/useHeadingObserver";

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

const TocContainer = ({ title, content, headingsRef }: TocContainer) => {
  const router = useRouter();
  const results = useTocList(content);
  const { activeId, setHeadingElements } = useHeadingObserver();

  useEffect(() => {
    if (headingsRef.current) {
      setHeadingElements(
        Array.from(headingsRef.current.querySelectorAll("h1,h2,h3"))
      );
    }
  }, [headingsRef.current, router]);

  return (
    <div className="fixed right-5 top-20 hidden w-48 text-sm text-slate-400 lg:block">
      <h1 className="mb-1 border-b-2 border-dotted border-gray-400 text-center text-lg font-bold">
        {title}
      </h1>
      <Toc result={results} activeId={activeId} />
    </div>
  );
};

export default TocContainer;
