import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "TobyUI Documentation" },
    { name: "description", content: "TobyUI Documentation" },
  ];
};

export default function Index() {
  return (
    <div className="flex h-screen items-center justify-center p-10">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Welcome to TobyUI Documentation</h1>
        <p className="mt-4 text-lg">
          Get started by exploring the sections below:
        </p>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Link
            to="/getting-started"
            className="block p-6 border rounded-lg shadow hover:bg-gray-100 hover:text-gray-600"
          >
            <h2 className="text-2xl font-semibold">Getting Started</h2>
            <p className="mt-2 text-gray-600">
              Learn how to set up and use TobyUI in your projects.
            </p>
          </Link>
          <Link
            to="/components"
            className="block p-6 border rounded-lg shadow hover:bg-gray-100 hover:text-gray-600"
          >
            <h2 className="text-2xl font-semibold">Components</h2>
            <p className="mt-2 text-gray-600">
              Explore the available components and their usage.
            </p>
          </Link>
          <Link
            to="/sdk"
            className="block p-6 border rounded-lg shadow hover:bg-gray-100 hover:text-gray-600"
          >
            <h2 className="text-2xl font-semibold">SDK</h2>
            <p className="mt-2 text-gray-600">
              Check out some the SDK which offers integration to commonly used
              APIs.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
