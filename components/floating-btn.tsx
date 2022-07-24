import { cls } from "@libs/client/utils";
import Link from "next/link";
import React from "react";

interface FloatingButton {
  children: React.ReactNode;
  href: string;
}

export default function FloatingButton({ children, href }: FloatingButton) {
  return (
    <Link href={href}>
      <a
        className={cls(
          "fixed bottom-24 right-5 flex aspect-square w-14 cursor-pointer items-center justify-center rounded-full border-0 border-transparent bg-amber-500 text-white shadow-xl transition-colors hover:bg-amber-600 sm:right-[8%] md:right-[15%] lg:right-1/4 xl:right-[30%] 2xl:right-[36%]"
        )}
      >
        {children}
      </a>
    </Link>
  );
}
