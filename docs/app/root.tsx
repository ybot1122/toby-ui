import {
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";

import "./tailwind.css";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
        <Meta />
        <Links />
      </head>
      <nav className="grid grid-cols-5 p-5 items-center align-center">
        <Link to="/" className="hover:underline">
          Home
        </Link>
        <Link to="/getting-started" className="hover:underline">
          Getting Started
        </Link>
        <Link to="/sdk" className="hover:underline">
          SDK Reference
        </Link>
        <Link to="/components" className="hover:underline">
          Components
        </Link>
        <a
          href="https://github.com/ybot1122/toby-ui"
          className="flex flex-col items-end justify-end hover:underline"
        >
          <img
            src="/toby-ui/github.svg"
            alt="Project is on GitHub"
            width={25}
          />
        </a>
      </nav>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function HydrateFallback() {
  return <p>Loading...</p>;
}
