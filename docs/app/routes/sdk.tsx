import { useLoaderData } from "@remix-run/react";
import { Code } from "components/Code";
import { SdkSection } from "components/SdkSection";
import React from "react";

const apis = ["brevo", "cloudinary", "github", "instagram", "x", "vercel"];

export const clientLoader = async () => {
  const brevoMd = await fetch("/toby-ui/sdk-brevo.md");
  const brevoRaw = await brevoMd.text();
  return brevoRaw;
};

const SdkDocumentation: React.FC = () => {
  const brevoRaw = useLoaderData<typeof clientLoader>();
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">SDK Documentation</h1>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Introduction</h2>
        <p>
          There are methods provided for{" "}
          {apis.map((s) => (
            <>
              <a href={`#${s}`} className="underline">
                {s.toUpperCase()}
              </a>
              ,{" "}
            </>
          ))}
        </p>
      </section>
      <SdkSection id={apis[0]} title="Brevo">
        <Code>{brevoRaw}</Code>
      </SdkSection>

      <section className="mb-8" id={apis[1]}>
        <h2>Cloudinary</h2>
      </section>

      <section className="mb-8" id={apis[2]}>
        <h2>GitHub</h2>
      </section>

      <section className="mb-8" id={apis[3]}>
        <h2>Instagram</h2>
      </section>

      <section className="mb-8" id={apis[4]}>
        <h2>X</h2>
      </section>

      <section className="mb-8" id={apis[5]}>
        <h2>Vercel</h2>
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
