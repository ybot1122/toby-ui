import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";

export const Code = ({ children }: { children: string }) => {
  return (
    <ReactMarkdown
      components={{
        ol({ children }) {
          return (
            <ol
              style={{
                listStyleType: "decimal",
                margin: "0 0 0 50px",
              }}
            >
              {children}
            </ol>
          );
        },
        li({ children }) {
          return (
            <li
              style={{
                margin: "0 0 10px 0",
              }}
            >
              {children}
            </li>
          );
        },
        h1({ children, ...props }) {
          return (
            <h1
              {...props}
              className="text-2xl"
              style={{
                borderBottom: "1px gray solid",
                margin: "10px 0",
                padding: "5px",
              }}
            >
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
            <code className={className + " mb-2 inline"} {...props}>
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
