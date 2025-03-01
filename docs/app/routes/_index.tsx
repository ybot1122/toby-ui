import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "TobyUI Documentation" },
    { name: "description", content: "TobyUI Documentation" },
  ];
};

export default function Index() {
  return (
    <div className="flex h-screen items-center justify-center">
      <p>Documentation</p>
      <p>
        <a href="/test">Test</a>
      </p>
    </div>
  );
}
