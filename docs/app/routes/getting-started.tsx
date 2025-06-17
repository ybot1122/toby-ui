import { Code } from "components/Code";
import React from "react";
const markdown = `
    # Heading
    This is a paragraph with some code: \`console.log("hello")\`.

    \`\`\`javascript
    function hello() {
      console.log("world");
    }
    \`\`\`
  `;

const GettingStarted: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Getting Started with TobyUi</h1>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Introduction</h2>
        <p>Toby-Ui contains React components, React hooks, and SDK methods.</p>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Installation</h2>

        <p className="">Step One: npm install</p>
        <Code>{`npm install @ybot1122/toby-ui`}</Code>

        <p className="mt-8">Step Two: Add toby-ui to tailwind.config.js</p>
        <Code>{markdown}</Code>
      </section>
    </div>
  );
};

export default GettingStarted;
