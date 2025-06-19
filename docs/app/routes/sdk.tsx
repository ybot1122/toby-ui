import { useLoaderData } from "@remix-run/react";
import { Code } from "components/Code";
import { SdkSection } from "components/SdkSection";
import React from "react";

const apis = ["brevo", "cloudinary", "github", "instagram", "x", "vercel"];

export const clientLoader = async () => {
  const raw = await Promise.all(apis.map((s) => fetch(`/toby-ui/sdk-${s}.md`)));
  const text = await Promise.all(raw.map((s) => s.text()));
  return text;
};

const SdkDocumentation: React.FC = () => {
  const text = useLoaderData<typeof clientLoader>();
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

      {apis.map((s, ind) => (
        <SdkSection id={s} title={s}>
          <Code>{text[ind]}</Code>
        </SdkSection>
      ))}
    </div>
  );
};

export default SdkDocumentation;
