import React from "react";

const SdkDocumentation: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">SDK Documentation</h1>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Introduction</h2>
        <p>
          Welcome to the SDK documentation. This guide will help you understand
          how to use our SDK effectively.
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Installation</h2>
        <p>To install the SDK, run the following command:</p>
        <pre className="bg-gray-100 text-gray-600 p-4 rounded">
          <code>npm install your-sdk-package</code>
        </pre>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Usage</h2>
        <p>Here is an example of how to use the SDK:</p>
        <pre className="bg-gray-100 text-gray-600 p-4 rounded">
          <code>
            {`import { YourSdk } from 'your-sdk-package';

const sdk = new YourSdk();
sdk.doSomething();`}
          </code>
        </pre>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-2">API Reference</h2>
        <p>
          For detailed API reference, please visit our{" "}
          <a
            href="https://your-api-reference-url.com"
            className="text-blue-500 underline"
          >
            API documentation
          </a>
          .
        </p>
      </section>
    </div>
  );
};

export default SdkDocumentation;
