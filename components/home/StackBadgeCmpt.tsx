interface StackBadgeProps {
  stack: string;
  color: string;
}

export const StackBadge = ({ stack, color = "ffffff" }: StackBadgeProps) => {
  return (
    <img
      src={`https://img.shields.io/badge/${stack}-${color}?style=flat&logo=${stack}&logoColor=white`}
      alt={stack}
    />
  );
};
