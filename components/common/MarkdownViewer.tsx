import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import remarkGfm from "remark-gfm";
import { darcula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import rehypeRaw from "rehype-raw";
import { makeHeadingId } from "@libs/client/utils";
import { useRef } from "react";
import dynamic from "next/dynamic";

const TocContainer = dynamic(
  async () => await import("@containers/Common/TocContainer"),
  {
    ssr: false,
    loading: () => <div>Loading...</div>,
  }
);

export const MarkDownViewer = ({ title, markdown }: MarkDownViewerProps) => {
  const mdWithHeadingId = makeHeadingId(markdown);
  const headingsRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={headingsRef}>
      <ReactMarkdown
        linkTarget={"_blank"}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        className="px-3 py-1"
        components={{
          h1: ({ children }) => {
            const [title, id] = children[0].toString().split("#");
            return (
              <h1 id={id} className="text-4xl font-extrabold">
                {title}
              </h1>
            );
          },
          h2: ({ children }) => {
            const [title, id] = children[0].toString().split("#");
            return (
              <h2 id={id} className="text-3xl font-extrabold">
                {title}
              </h2>
            );
          },
          h3: ({ children }) => {
            const [title, id] = children[0].toString().split("#");
            return (
              <h3 id={id} className="text-2xl font-extrabold">
                {title}
              </h3>
            );
          },
          h4: ({ children }) => (
            <h4 className="text-xl font-extrabold">{children}</h4>
          ),
          h5: ({ children }) => (
            <h5 className="text-lg font-extrabold">{children}</h5>
          ),
          h6: ({ children }) => (
            <h6 className="text-base font-extrabold">{children}</h6>
          ),
          p: ({ children }) => <p className="text-lg">{children}</p>,
          a: ({ children, href }) => (
            <a href={href} className="text-blue-600 underline">
              {children}
            </a>
          ),
          ul: ({ children }) => <ul className="pl-8 ">{children}</ul>,
          li: ({ children }) => <li className="list-disc">{children}</li>,
          hr: () => (
            <hr className="my-3 h-0 border-t-2 border-solid border-slate-700" />
          ),
          em: ({ children }) => <em className="italic">{children}</em>,
          strong: ({ children }) => (
            <strong className="font-bold">{children}</strong>
          ),
          blockquote: ({ children }) => (
            <blockquote className="my-6 border-l-[0.25rem] border-s-[0.25rem] border-solid bg-gray-300 p-4 dark:bg-gray-600">
              {children}
            </blockquote>
          ),
          table: ({ children }) => (
            <table className="border-2 border-solid">{children}</table>
          ),
          thead: ({ children }) => (
            <thead className="border-b-4 border-double font-bold">
              {children}
            </thead>
          ),
          tr: ({ children }) => (
            <tr className="divide-x divide-solid">{children}</tr>
          ),
          th: ({ children }) => <th className="px-2 py-1">{children}</th>,
          td: ({ children }) => <td className="px-2 py-1">{children}</td>,
          code: ({ node, inline, className, children, style, ...props }) => {
            const match = /language-(\w+)/.exec(className || "");
            return !inline || match ? (
              <SyntaxHighlighter
                style={darcula}
                language={match ? match[1] : "language-shell"}
                PreTag={"pre"}
                {...props}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code
                className={[
                  className,
                  "rounded-md bg-neutral-800 px-1.5 py-0.5 text-gray-300 dark:bg-neutral-400 dark:text-gray-700",
                ].join("")}
              >
                {children}
              </code>
            );
          },
        }}
      >
        {mdWithHeadingId}
      </ReactMarkdown>
      <TocContainer
        headingsRef={headingsRef}
        content={markdown}
        title={title}
      />
    </div>
  );
};

interface MarkDownViewerProps {
  title: string;
  markdown: string;
}

export default MarkDownViewer;
