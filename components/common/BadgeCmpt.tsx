interface BadgeProps {
  label: string;
  onClick?: () => void;
  hasCancel?: boolean;
}

export const Badge = ({ label, onClick, hasCancel }: BadgeProps) => {
  return (
    <div className="mx-0.5 flex flex-wrap items-center justify-center rounded-md bg-amber-400 py-0.5 px-1 hover:bg-amber-500">
      <div className="px-1 text-sm">{label}</div>
      {hasCancel && (
        <div className="cursor-pointer px-0.5" onClick={onClick}>
          <svg
            height="14"
            width="14"
            viewBox="0 0 20 20"
            aria-hidden="true"
            focusable="false"
            className="h-4 w-4"
          >
            <path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"></path>
          </svg>
        </div>
      )}
    </div>
  );
};
