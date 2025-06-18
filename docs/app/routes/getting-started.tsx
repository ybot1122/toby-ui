import { Code } from "components/Code";
import { useLoaderData } from "@remix-run/react";
import React from "react";

export const clientLoader = async () => {
  const data = await fetch("/toby-ui/getting-started.md");
  const text = await data.text();
  return text;
};

const GettingStarted: React.FC = () => {
  const text = useLoaderData<typeof clientLoader>();

  return (
    <div className="p-8">
      <Code>{text}</Code>
    </div>
  );
};

export default GettingStarted;
