import { Footer } from "@components/common";
import { useEffect, useRef, useState } from "react";

export const FooterContainer = () => {
  const refFooter = useRef<HTMLElement>();
  const [isSleep, setIsSleep] = useState(false);
  const sleepFooter = () => setIsSleep(true);
  const onScroll = () => setIsSleep(false);
  useEffect(() => {
    let sleeper = setTimeout(sleepFooter, 5000);
    return () => clearTimeout(sleeper);
  }, [isSleep]);
  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return <Footer refFooter={refFooter} isSleep={isSleep} onScroll={onScroll} />;
};
