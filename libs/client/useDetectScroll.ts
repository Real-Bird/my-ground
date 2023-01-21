import useDebounce from "@libs/client/useDebounce";
import useThrottle from "@libs/client/useThrottle";
import { useState, useCallback, useEffect } from "react";

export default function useDetectScroll() {
  const [prevY, setPrevY] = useState(0);
  const [isHeaderShow, setIsHeaderShow] = useState(true);
  const handleScroll = useCallback(
    (e: any) => {
      const diff = document.documentElement.scrollTop - prevY;
      if (diff > 0) {
        setIsHeaderShow(false);
      } else if (diff < 0) {
        setIsHeaderShow(true);
      }
      setPrevY(document.documentElement.scrollTop);
    },
    [prevY]
  );

  const stopScroll = useCallback((e: any) => {
    if (document.documentElement.scrollTop === 0) {
      setIsHeaderShow(true);
    } else {
      setIsHeaderShow(false);
    }
  }, []);

  const throttleScroll = useThrottle(handleScroll, 300);

  const debounceScroll = useDebounce(stopScroll, 3000);
  const scrollDetectHandler = useCallback(
    (...e: any[]) => {
      throttleScroll(e);
      debounceScroll(e);
    },
    [prevY]
  );

  useEffect(() => {
    window.addEventListener("scroll", scrollDetectHandler);
    return () => {
      if (!window) return;
      window.removeEventListener("scroll", scrollDetectHandler);
    };
  }, [prevY]);

  return isHeaderShow;
}
