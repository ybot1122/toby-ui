import { useLoaderData } from "@remix-run/react";
import { Code } from "components/Code";
import { SdkSection } from "components/SdkSection";
import React from "react";

const apis = ["brevo", "cloudinary", "github", "instagram", "x", "vercel"];

export const clientLoader = async () => {
  const [brevoMd, cloudinaryMd, githubMd] = await Promise.all([
    fetch("/toby-ui/sdk-brevo.md"),
    fetch("/toby-ui/sdk-cloudinary.md"),
    fetch("/toby-ui/sdk-github.md"),
  ]);
  const [brevoText, cloudinaryText, githubText] = await Promise.all([
    brevoMd.text(),
    cloudinaryMd.text(),
    githubMd.text(),
  ]);
  return [brevoText, cloudinaryText, githubText];
};

const SdkDocumentation: React.FC = () => {
  const [brevoText, cloudinaryText, githubText] =
    useLoaderData<typeof clientLoader>();
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
        <Code>{brevoText}</Code>
      </SdkSection>

      <SdkSection id={apis[1]} title="Cloudinary">
        <Code>{cloudinaryText}</Code>
      </SdkSection>

      <SdkSection id={apis[2]} title="GitHub">
        <Code>{githubText}</Code>
      </SdkSection>
    </div>
  );
};

export default SdkDocumentation;
