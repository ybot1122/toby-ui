const VERCEL_API_URL = "https://api.vercel.com/v3/deployments";

/**
 * Returns the response object directly, because
 * of returning readablestream when follow = true
 */
export async function getDeploymentEvents({
  id,
  token,
  follow: followProp = false,
  limit = -1,
}: {
  id: string;
  token: string;
  follow?: boolean;
  limit?: number;
}): Promise<Response> {
  const follow = followProp ? "&follow=1" : "";
  const response = await fetch(
    `${VERCEL_API_URL}/${id}/events?limit=${limit}${follow}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  return response;
}
