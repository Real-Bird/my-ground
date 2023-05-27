import { StackBadge } from "@components/home/StackBadgeCmpt";
import { cls, toBoldDangerousHtml } from "@libs/client/utils";
import { IPortfolios } from "interface/IPortfolios";
import Link from "next/link";

interface PortfoliosProps {
  portfolios: IPortfolios.Payload[];
}

export const Portfolios = ({ portfolios }: PortfoliosProps) => {
  return (
    <>
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
              <section className="grid grid-cols-[20%_minmax(min-content,_80%)] gap-2">
                <div className="flex flex-col items-center space-y-2">
                  <time className="flex flex-col items-center -space-y-2 lg:flex-row lg:space-x-2 lg:space-y-0">
                    <span>{createdAt}</span>
                    <span>~</span>
                    <span>{lastUpdated}</span>
                  </time>
                  <Link href={github}>
                    <a
                      className="hover:scale-110 hover:font-bold"
                      target="_blank"
                    >
                      Github
                    </a>
                  </Link>
                  {deploy && (
                    <Link href={deploy}>
                      <a
                        className="hover:scale-110 hover:font-bold"
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
                  <ul className="space-y-2 py-1 pl-5">
                    {details.map((text, i) => (
                      <ol key={text + i} className="list-item">
                        <p
                          dangerouslySetInnerHTML={{
                            __html: toBoldDangerousHtml(text),
                          }}
                        />
                      </ol>
                    ))}
                  </ul>
                </div>
              </section>
            </div>
          )
        )}
    </>
  );
};
