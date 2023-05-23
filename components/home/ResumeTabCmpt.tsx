import { cls } from "@libs/client/utils";

interface ResumeTabProps {
  isToggle: boolean;
  label: "Resume" | "Self-Introduction";
}

export const ResumeTab = ({ isToggle, label }: ResumeTabProps) => {
  return (
    <>
      <h2
        className={cls(
          isToggle ? "text-amber-500" : "text-gray-400",
          "text-2xl font-bold transition-colors duration-300"
        )}
      >
        {label}
      </h2>
      <hr
        className={cls(
          isToggle ? "border-amber-500" : "border-gray-400",
          "w-full border-2 transition-colors duration-300"
        )}
      />
    </>
  );
};
