import { IEtc } from "interface/IEtc";

interface EtcProps {
  etc: IEtc.Payload[];
}

export const Etc = ({ etc }: EtcProps) => {
  return (
    <>
      {etc
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .map(({ title, classify, date, result }) => (
          <div
            key={title}
            className="grid grid-flow-row-dense grid-cols-[20%_80%] gap-2"
          >
            <header className="gap-1s col-span-full grid grid-cols-[20%_80%]">
              <div className="flex flex-col items-center space-y-2">
                <time className="flex flex-col items-center justify-start space-x-2 lg:flex-row">
                  <span>{date}</span>
                </time>
              </div>
              <div className="flex flex-col">
                <h2 className="text-xl font-semibold">{title}</h2>
                <div className="flex text-sm">
                  {result ? (
                    <p>
                      {classify} - {result}
                    </p>
                  ) : (
                    <p>{classify}</p>
                  )}
                </div>
              </div>
            </header>
          </div>
        ))}
    </>
  );
};
