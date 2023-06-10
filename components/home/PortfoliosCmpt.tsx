import { StackBadge } from "@components/home/StackBadgeCmpt";
import {
  cls,
  toBoldDangerousHtml,
  toUnderlineDangerousHtml,
} from "@libs/client/utils";
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
            stacks,
            description,
            issues,
          }) => (
            <div key={title} className="grid grid-flow-row-dense gap-3 pt-1">
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
              <em
                dangerouslySetInnerHTML={{
                  __html: toUnderlineDangerousHtml(description),
                }}
              />
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
                  <ul className="flex flex-wrap py-2">
                    {stacks.map(({ stack }) => (
                      <li key={stack} className="p-0.5">
                        <p className="text-sm font-semibold">{stack}</p>
                      </li>
                    ))}
                  </ul>
                  <ul className="space-y-2 py-2 pl-5">
                    {issues.map(({ issue, solution }, i) => (
                      <li key={issue + i} className="list-disc">
                        <div>
                          <h4 className="inline font-semibold text-red-500">
                            Issue
                          </h4>
                          <span> : </span>
                          <p
                            className="inline"
                            dangerouslySetInnerHTML={{
                              __html: toUnderlineDangerousHtml(issue),
                            }}
                          />
                        </div>
                        <div>
                          <h4 className="inline font-semibold text-cyan-600 dark:text-cyan-400">
                            Solution
                          </h4>
                          <span> : </span>
                          <p
                            className="inline"
                            dangerouslySetInnerHTML={{
                              __html: toUnderlineDangerousHtml(solution),
                            }}
                          />
                        </div>
                      </li>
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
