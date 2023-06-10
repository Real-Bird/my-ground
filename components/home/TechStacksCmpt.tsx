import { StackListOverview } from "@components/home/StackListOverview";
import { ITechStacks } from "interface/ITechStacks";

interface TechStacksProps {
  stacks: ITechStacks.Payload;
}

export const TechStacks = ({ stacks }: TechStacksProps) => {
  const { fields } = stacks;
  return (
    <>
      {fields.map((field) => (
        <StackListOverview key={field.type} field={field} />
      ))}
    </>
  );
};
