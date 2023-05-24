import { StackBadge } from "@components/home/StackBadgeCmpt";
import { StackList } from "@components/home/StackListCmpt";
import { cls } from "@libs/client/utils";
import { ITechStacks } from "interface/ITechStacks";
import { useState } from "react";

interface TechStacksProps {
  stacks: ITechStacks.Payload;
}

export const TechStacks = ({ stacks }: TechStacksProps) => {
  const { main, sub, knowledge } = stacks;
  const [isHover, setIsHover] = useState(false);
  return (
    <article className="space-y-3 py-1">
      <header className="flex items-center gap-1">
        <h1 className="text-2xl font-bold">Tech Stacks</h1>
        <div
          className="relative h-5 w-5 cursor-help self-start"
          onMouseOver={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
            />
          </svg>
          <div
            className={cls(
              isHover ? "block" : "hidden",
              "absolute -top-14 left-6 w-[26rem] rounded-md border-2 bg-gray-50 p-1"
            )}
          >
            <p className="text-sm">
              <strong className="font-bold">Main</strong> : 능숙하게 사용하고
              별다른 도움 없이 자가 발전 가능
            </p>
            <p className="text-sm">
              <strong className="font-bold">Sub</strong> : 사용 가능하나
              능숙하지 않아 추가적인 도움 및 조언 필요
            </p>
            <p className="text-sm">
              <strong className="font-bold">Knowledge</strong> : 사용해 본
              경험이 있으나 상당한 공부와 도움 필요
            </p>
          </div>
        </div>
      </header>
      <main className="flex flex-col gap-5">
        <article className="grid grid-cols-[20%_minmax(80%,_1fr)]">
          <h2 className="flex flex-row items-center space-x-2 self-start text-lg font-medium">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </span>
            <span>Main</span>
          </h2>
          <figure className="flex flex-col justify-start gap-2 divide-y-2 py-1">
            <StackList stackArray={main.languages} label="Languages" />
            <StackList
              stackArray={main.librariesAndFrameworks}
              label="Libraries & Frameworks"
            />
            <StackList stackArray={main.tools} label="Tools" />{" "}
          </figure>
        </article>
        <article className="grid grid-cols-[20%_minmax(80%,_1fr)]">
          <h2 className="flex flex-row items-center space-x-2 self-start text-lg font-medium">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
                />
              </svg>
            </span>
            <span>Sub</span>
          </h2>
          <figure className="flex flex-col justify-start gap-2 divide-y-2 py-1">
            <StackList stackArray={sub.languages} label="Languages" />
            <StackList
              stackArray={sub.librariesAndFrameworks}
              label="Libraries & Frameworks"
            />
            <StackList stackArray={sub.tools} label="Tools" />{" "}
          </figure>
        </article>
        <article className="grid grid-cols-[20%_minmax(80%,_1fr)]">
          <h2 className="flex flex-row items-center space-x-2 self-start text-lg font-medium">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12"
                />
              </svg>
            </span>
            <span>Knowledge</span>
          </h2>
          <figure className="flex flex-col justify-start gap-2 divide-y-2 py-1">
            <StackList stackArray={knowledge.languages} label="Languages" />
            <StackList
              stackArray={knowledge.librariesAndFrameworks}
              label="Libraries & Frameworks"
            />
            <StackList stackArray={knowledge.tools} label="Tools" />{" "}
          </figure>
        </article>
      </main>
    </article>
  );
};
