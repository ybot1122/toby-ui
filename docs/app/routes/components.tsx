import { useLoaderData } from "@remix-run/react";

export function clientLoader() {
  return { message: "Hello from clientLoader" };
}

export default function Components() {
  const loader = useLoaderData<typeof clientLoader>();
  return <h1>{loader.message}</h1>;
}
