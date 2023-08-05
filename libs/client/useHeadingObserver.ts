import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

const useHeadingObserver = () => {
  const router = useRouter();
  const [headingElements, setHeadingElements] = useState<Element[]>([]);
  const [activeId, setActiveId] = useState("");
  const observerRef = useRef<IntersectionObserver | null>(null);

  const getIndexFromId = (id: string) =>
    headingElements.findIndex((heading) => heading.id === id);

  const callback: IntersectionObserverCallback = (headings) => {
    const visibleHeadings = headings
      .filter((heading) => heading.isIntersecting)
      .map((heading) => heading.target.id);

    if (visibleHeadings.length > 0) {
      const sortedVisibleHeadings = visibleHeadings.sort(
        (a, b) => getIndexFromId(a) - getIndexFromId(b)
      );
      setActiveId(sortedVisibleHeadings[0]);
    }
  };

  useEffect(() => {
    if (headingElements.length === 0) return;

    observerRef.current = new IntersectionObserver(callback, {
      rootMargin: "-48px 0% -80% 0%",
      threshold: 1,
    });

    headingElements.forEach((header) => {
      observerRef.current.observe(header);
    });

    return () => {
      observerRef.current.disconnect();
    };
  }, [headingElements, observerRef.current, router]);

  return { activeId, setHeadingElements };
};

export default useHeadingObserver;
