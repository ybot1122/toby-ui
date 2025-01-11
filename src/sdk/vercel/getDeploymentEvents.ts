const VERCEL_API_URL = "https://api.vercel.com/v3/deployments";

export async function getDeploymentEvents({
  id,
  token,
  follow = false,
  limit = -1,
}: {
  id: string;
  token: string;
  follow?: boolean;
  limit?: number;
}): Promise<Response> {
  const response = await fetch(
    `${VERCEL_API_URL}/${id}/events&limit=${limit}${follow ? "?follow=1" : ""}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  console.log(response);

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  const data = await response.json();

  return data;
}
