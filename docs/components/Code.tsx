import SyntaxHighlighter from "react-syntax-highlighter";
import ReactMarkdown from "react-markdown";

export const Code = ({ children }: { children: string }) => {
  return (
    <ReactMarkdown
      components={{
        code({ children }) {
          return (
            <SyntaxHighlighter
              children={String(children)}
              language={"javascript"}
            />
          );
        },
      }}
    >
      {children}
    </ReactMarkdown>
  );
};
