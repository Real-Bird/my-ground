// useIntersectionObserver custom hook

import { RefProps } from "@containers/Common";

const getIntersectionObserver = (
  setActiveId?: React.Dispatch<React.SetStateAction<string>>,
  headingElementsRef?: React.MutableRefObject<RefProps>,
  headingElements?: HTMLHeadingElement[]
) => {
  const getIndexFromId = (headingElements: Element[], id: string) =>
    headingElements.findIndex((heading) => heading.id === id);

  const callback: IntersectionObserverCallback = (headings) => {
    headingElementsRef.current = headings.reduce((map, headingElement) => {
      map[headingElement.target.id] = headingElement;
      return map;
    }, headingElementsRef.current);

    const visibleHeadings: IntersectionObserverEntry[] = [];
    Object.keys(headingElementsRef.current).forEach((key) => {
      const headingElement = headingElementsRef.current[key];

      if (headingElement.isIntersecting) visibleHeadings.push(headingElement);
    });

    if (visibleHeadings.length === 1) {
      setActiveId(visibleHeadings[0].target.id);
    } else if (visibleHeadings.length > 1) {
      const sortedVisibleHeadings = visibleHeadings.sort((a, b) =>
        Number(
          getIndexFromId(headingElements, a.target.id) >
            getIndexFromId(headingElements, b.target.id)
        )
      );
      setActiveId(sortedVisibleHeadings[0].target.id);
    }
  };

  const observer = new IntersectionObserver(callback, {
    rootMargin: "-48px 0% -40% 0%",
  });

  return observer;
};

export default getIntersectionObserver;
