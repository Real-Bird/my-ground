import { cls, toBoldDangerousHtml } from "@libs/client/utils";
import { ITechStacks } from "interface/ITechStacks";

interface StackListOverviewProps {
  field?: ITechStacks.StackList;
}

export const StackListOverview = ({ field }: StackListOverviewProps) => {
  return (
    <article className="grid grid-cols-[20%_minmax(80%,_1fr)] py-1">
      <h2 className="flex flex-row items-center space-x-2 self-start text-lg font-medium">
        <span className="hidden sm:block">
          {field?.type === "Front" && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          )}
          {field?.type === "Back" && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
              />
            </svg>
          )}
          {field?.type === "ETC" && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12"
              />
            </svg>
          )}
        </span>
        <span>{field?.type}</span>
      </h2>
      <ul
        className={cls(
          field?.type === "ETC"
            ? "flex-row"
            : "flex-col justify-start space-y-2 divide-y-2",
          "flex flex-wrap gap-2"
        )}
      >
        {field?.stackAndDescriptions.map(({ stack, descriptions }) => (
          <li key={stack}>
            <h3
              className={cls(
                field?.type === "ETC" ? "text-base" : "text-xl font-bold",
                "m-1 w-fit rounded-md px-1 py-0.5"
              )}
            >
              <strong>{stack}</strong>
            </h3>
            <ul className="pl-5">
              {descriptions?.map((description, i) => (
                <li key={description + i} className="list-disc">
                  <p
                    className="py-0.5"
                    dangerouslySetInnerHTML={{
                      __html: toBoldDangerousHtml(description),
                    }}
                  />
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </article>
  );
};
