import { StackListOverview } from "@components/home/StackListOverview";
import { cls } from "@libs/client/utils";
import { ITechStacks } from "interface/ITechStacks";
import { useState } from "react";

interface TechStacksProps {
  stacks: ITechStacks.Payload;
}

interface TechStacksOptProps {
  onMouseOver: () => void;
  onMouseLeave: () => void;
  isHover: boolean;
}

export const TechStacksOpt = ({
  onMouseOver,
  onMouseLeave,
  isHover,
}: TechStacksOptProps) => {
  return (
    <div
      className="relative flex-1 cursor-help self-start"
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="h-5 w-5"
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
          "absolute -top-14 left-6 rounded-md border-2 bg-gray-50 p-1"
        )}
      >
        <p className="grid grid-cols-[12%_88%] text-sm">
          <strong className="font-bold">High</strong>
          <span>능숙하게 사용하고 별다른 도움 없이 자가 발전 가능</span>
        </p>
        <p className="grid grid-cols-[12%_88%] text-sm ">
          <strong className="font-bold">Mid</strong>
          <span>사용 가능하나 능숙하지 않아 추가적인 도움 및 조언 필요</span>
        </p>
        <p className="grid grid-cols-[12%_88%] text-sm ">
          <strong className="font-bold">Low</strong>
          <span>사용해 본 경험이 있으나 상당한 공부와 도움 필요</span>
        </p>
      </div>
    </div>
  );
};

export const TechStacks = ({ stacks }: TechStacksProps) => {
  const { main, sub, knowledge } = stacks;
  return (
    <>
      <StackListOverview
        label="High"
        langs={main.languages}
        libsFw={main.librariesAndFrameworks}
        tools={main.tools}
      />
      <StackListOverview
        label="Mid"
        langs={sub.languages}
        libsFw={sub.librariesAndFrameworks}
        tools={sub.tools}
      />
      <StackListOverview
        label="Low"
        langs={knowledge.languages}
        libsFw={knowledge.librariesAndFrameworks}
        tools={knowledge.tools}
      />
    </>
  );
};
