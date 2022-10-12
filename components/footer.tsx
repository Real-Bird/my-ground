import { cls } from "@libs/client/utils";
import { useEffect, useRef, useState } from "react";

export default function Footer() {
  const footerTag = useRef<HTMLElement>();
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
  return (
    <footer
      ref={footerTag}
      className={cls(
        isSleep ? "opacity-0" : "opacity-1",
        "fixed bottom-0 hidden max-h-40 min-h-[5rem] w-full items-center justify-center bg-amber-500 transition-opacity duration-500 lg:flex"
      )}
      onScroll={onScroll}
    >
      <div>&copy; 2022.07 My Ground by Real-Bird</div>
    </footer>
  );
}
