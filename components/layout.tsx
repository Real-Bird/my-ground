import React from "react";
import { cls } from "@libs/client/utils";

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  [key: string]: any;
}

export default function Layout({ title, children, ...rest }: LayoutProps) {
  return (
    <div>
      <div className="fixed top-0 z-10 flex h-12 w-full max-w-xl items-center  justify-center border-b bg-white px-10  text-lg font-medium text-gray-800">
        <span>{title}</span>
        <div
          className={cls(
            "peer absolute right-0 cursor-pointer p-5 hover:hidden"
          )}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
}
