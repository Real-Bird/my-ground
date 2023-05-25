import { StackBadge } from "@components/home/StackBadgeCmpt";
import { cls } from "@libs/client/utils";
import { IPortfolios } from "interface/IPortfolios";
import Link from "next/link";

interface PortfoliosProps {
  portfolios: IPortfolios.Payload[];
}

export const Portfolios = ({ portfolios }: PortfoliosProps) => {
  return (
    <article className="space-y-3 py-1">
      <header className="flex items-center gap-1">
        <h1 className="w-fit text-2xl font-bold">Portfolios</h1>
      </header>
      <main className="flex flex-col gap-3 divide-y-2 divide-dotted">
        {portfolios
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          .map(
            ({
              title,
              classify,
              people,
              createdAt,
              lastUpdated,
              github,
              deploy,
              summary,
              stacks,
              details,
            }) => (
              <div key={title} className="grid grid-flow-row-dense gap-3">
                <header className="flex items-center justify-start gap-2">
                  <h2 className="text-xl font-semibold">{title}</h2>
                  <div className="flex text-sm">
                    {people ? (
                      <p>
                        ({classify}/{people}인)
                      </p>
                    ) : (
                      <p>({classify})</p>
                    )}
                  </div>
                </header>
                <section className="grid grid-cols-[20%_80%]">
                  <div className="flex flex-col items-start space-y-2">
                    <time className="flex flex-col items-center -space-y-2 text-sm">
                      <span>{createdAt}</span>
                      <span>~</span>
                      <span>{lastUpdated}</span>
                    </time>
                    <Link href={github}>
                      <a
                        className="text-sm hover:scale-110 hover:font-bold"
                        target="_blank"
                      >
                        Github
                      </a>
                    </Link>
                    {deploy && (
                      <Link href={deploy}>
                        <a
                          className="text-sm hover:scale-110 hover:font-bold"
                          target="_blank"
                        >
                          Deploy
                        </a>
                      </Link>
                    )}
                  </div>
                  <div className="space-y-1 divide-y-2 divide-dashed">
                    <h3 className="font-medium">{summary}</h3>
                    <ul className="flex flex-wrap">
                      {stacks.map(({ stack, color }) => (
                        <li key={stack} className="p-0.5">
                          <StackBadge stack={stack} color={color} />
                        </li>
                      ))}
                    </ul>
                    <ul className="space-y-2">
                      {details.map((text, i) => (
                        <ol key={text + i} className="list-item">
                          <p>{text}</p>
                        </ol>
                      ))}
                    </ul>
                  </div>
                </section>
              </div>
            )
          )}
      </main>
    </article>
  );
};
