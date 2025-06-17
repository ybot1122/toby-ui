import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";

export const Code = ({ children }: { children: string }) => {
  return (
    <ReactMarkdown
      components={{
        h1({ children, ...props }) {
          return (
            <h1 {...props} className="text-2xl mb-2">
              {children}
            </h1>
          );
        },
        p({ children, ...props }) {
          return (
            <p {...props} className="mb-2">
              {children}
            </p>
          );
        },
        // @ts-expect-error inline not defined
        code({ inline, className, children, ...props }) {
          const match = (className || "").match(/language-(?<lang>[\w-]+)/);
          return !inline && match ? (
            <SyntaxHighlighter
              children={String(children).replace(/\n$/, "")}
              style={vscDarkPlus}
              language={match.groups?.lang}
              PreTag="div"
            />
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      }}
    >
      {children}
    </ReactMarkdown>
  );
};
