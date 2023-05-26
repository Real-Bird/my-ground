import { toBoldDangerousHtml } from "@libs/client/utils";

export const SelfIntroduction = ({ details }: { details: string[] }) => {
  return (
    <article className="space-y-1 px-1">
      {details.map((text, i) => (
        <p
          key={text + i}
          className="whitespace-pre-wrap break-words pb-1 font-sans text-lg"
          dangerouslySetInnerHTML={{
            __html: toBoldDangerousHtml(text),
          }}
        />
      ))}
    </article>
  );
};
