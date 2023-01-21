import { cls } from "@libs/client/utils";
import type { Ref } from "react";

interface FooterProps {
  refFooter: Ref<HTMLElement>;
  isSleep: boolean;
  onScroll: () => void;
}

export function Footer({ refFooter, isSleep, onScroll }: FooterProps) {
  return (
    <footer
      ref={refFooter}
      className={cls(
        isSleep ? "opacity-0" : "opacity-1",
        "fixed bottom-0 hidden max-h-40 min-h-[5rem] w-full w-full items-center justify-center bg-amber-500 transition-opacity duration-500 lg:flex"
      )}
      onScroll={onScroll}
    >
      <div>
        &copy; 2022 <strong>RB&apos;s Ground</strong> by Real-Bird
      </div>
    </footer>
  );
}
