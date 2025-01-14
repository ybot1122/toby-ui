const INSTAGRAM_API_URL = "https://graph.instagram.com/me";

interface InstagramMeResponse {
  name: string;
  id: string;
}

export async function getInstagramMe({
  accessToken,
  fields: fieldsParam,
}: {
  accessToken: string;
  fields: string[];
}): Promise<InstagramMeResponse> {
  const fields = fieldsParam.join(",");

  const response = await fetch(
    `${INSTAGRAM_API_URL}?access_token=${accessToken}&fields=${fields}`,
  );
  if (!response.ok) {
    throw new Error("Error fetching Instagram user data");
  }
  const data = await response.json();
  return data;
}
