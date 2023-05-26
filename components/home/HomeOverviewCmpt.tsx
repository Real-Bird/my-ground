import { ReactNode } from "react";

interface HomeOverviewProps {
  title: string;
  opt?: ReactNode;
  children: ReactNode;
}

export const HomeOverview = ({ children, title, opt }: HomeOverviewProps) => {
  return (
    <article className="space-y-3 py-1">
      <header className="flex items-center gap-1">
        <h1 className="w-fit text-2xl font-bold">{title}</h1>
        {opt}
      </header>
      <main className="flex flex-col gap-3 divide-y-2 divide-dotted">
        {children}
      </main>
    </article>
  );
};
