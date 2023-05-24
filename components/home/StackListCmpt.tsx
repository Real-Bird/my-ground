import { StackBadge } from "@components/home/StackBadgeCmpt";
import { ITechStacks } from "interface/ITechStacks";

interface StackListProps {
  stackArray: ITechStacks.Stack[];
  label: string;
}

export const StackList = ({ stackArray, label }: StackListProps) => {
  return (
    <div className="grid grid-cols-[15%_minmax(85%,_1fr)] items-center space-x-2">
      <h3 className="break-words text-base font-medium">{label}</h3>
      <ul className="flex items-center space-x-1">
        {stackArray.map(({ stack, color }) => (
          <li key={stack}>
            <StackBadge stack={stack} color={color} />
          </li>
        ))}
      </ul>
    </div>
  );
};
