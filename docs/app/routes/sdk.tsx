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
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">getDeployment</h2>
        <p>
          The <code>getDeployment</code> function retrieves information about a
          specific Vercel deployment.
        </p>
        <h3 className="text-xl font-semibold mb-2">Parameters</h3>
        <ul className="list-disc list-inside">
          <li>
            <code>id</code> (string): The ID of the deployment.
          </li>
          <li>
            <code>token</code> (string): The Vercel API token.
          </li>
        </ul>
        <h3 className="text-xl font-semibold mb-2">Returns</h3>
        <p>
          A promise that resolves to a <code>VercelDeployment</code> object
          containing the deployment details.
        </p>
        <h3 className="text-xl font-semibold mb-2">Example</h3>
        <pre className="bg-gray-100 text-gray-600 p-4 rounded">
          <code>
            {`import { getDeployment } from 'your-sdk-package';

async function fetchDeployment() {
  try {
    const deployment = await getDeployment({ id: 'deployment-id', token: 'your-vercel-token' });
    console.log(deployment);
  } catch (error) {
    console.error('Error fetching deployment:', error);
  }
}

fetchDeployment();`}
          </code>
        </pre>
      </section>
    </div>
  );
};

export default SdkDocumentation;
