import { StackBadge } from "@components/home/StackBadgeCmpt";
import { ITechStacks } from "interface/ITechStacks";

interface StackListProps {
  stackArray: ITechStacks.Stack[];
  label: string;
}

export const StackList = ({ stackArray, label }: StackListProps) => {
  return (
    <div className="grid grid-cols-[15%_minmax(85%,_1fr)] items-center space-x-2">
      <h3 className="self-start break-words text-base font-medium">{label}</h3>
      <ul className="flex flex-wrap items-center pt-1">
        {stackArray.map(({ stack, color }) => (
          <li key={stack} className="p-0.5">
            <StackBadge stack={stack} color={color} />
          </li>
        ))}
      </ul>
    </div>
  );
};
