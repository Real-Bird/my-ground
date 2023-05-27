import { toBoldDangerousHtml } from "@libs/client/utils";
import { IEducations } from "interface/IEducations";

interface EducationsProps {
  educations: IEducations.Payload[];
}

export const Educations = ({ educations }: EducationsProps) => {
  return (
    <>
      {educations
        .sort(
          (a, b) =>
            new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime()
        )
        .map(({ title, startedAt, endedAt, status, addition, details }) => (
          <div
            key={title}
            className="grid grid-flow-row-dense grid-cols-[20%_80%] gap-2"
          >
            <header className="col-span-full grid grid-cols-[20%_minmax(min-content,_80%)] gap-3">
              <div className="flex flex-col items-center space-y-2">
                <time className="flex flex-col items-center justify-start space-x-2 lg:flex-row">
                  <span>{startedAt}</span>
                  <span>~</span>
                  <span>{endedAt}</span>
                </time>
              </div>
              <div className="flex flex-col">
                <h2 className="text-xl font-semibold">{title}</h2>
                <div className="flex text-sm">
                  {addition ? (
                    <p>
                      {status} - {addition}
                    </p>
                  ) : (
                    <p>{status}</p>
                  )}
                </div>
              </div>
            </header>
            <section className="col-start-2 row-start-2">
              <div className="space-y-1 divide-y-2 divide-dashed">
                <ul className="space-y-2 py-1 pl-5">
                  {details?.map((text, i) => (
                    <ol key={text + i} className="list-item">
                      <p
                        dangerouslySetInnerHTML={{
                          __html: toBoldDangerousHtml(text),
                        }}
                      />
                    </ol>
                  ))}
                </ul>
              </div>
            </section>
          </div>
        ))}
    </>
  );
};
