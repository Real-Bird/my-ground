import { Button } from "@components/common";

interface ClientErrorBoundaryProps {
  errCode: number;
  errDescription: string;
  countDown: number;
  onGoHome: () => void;
}

export const ClientErrorBoundary = ({
  errCode,
  errDescription,
  countDown,
  onGoHome,
}: ClientErrorBoundaryProps) => {
  return (
    <div className="mx-3 flex h-3/5 flex-col items-center justify-center space-y-3">
      <div className="text-4xl font-bold">{errCode}</div>
      <div className="text-2xl font-semibold">{errDescription}</div>
      <div>
        <span className="font-semibold text-red-600">{countDown} 초</span> 후
        홈으로 돌아갑니다.
      </div>
      <div>
        <Button text="Go to HOME" onClick={onGoHome} />
      </div>
    </div>
  );
};
