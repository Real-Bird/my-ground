import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <main
      id="child"
      className="mb-16 mt-12 flex h-[86vh] w-full max-w-xl justify-center overflow-y-scroll pb-4 pt-3 lg:mt-12 lg:h-full lg:max-w-full lg:pb-5"
    >
      {children}
    </main>
  );
};
