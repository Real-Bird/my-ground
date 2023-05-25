import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <main
      id="child"
      className="mb-20 mt-12 flex h-full w-full max-w-xl justify-center pb-4 pt-3 lg:mt-12 lg:h-full lg:max-w-full lg:pb-5"
    >
      {children}
    </main>
  );
};
