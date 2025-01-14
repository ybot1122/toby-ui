export async function getInstagramLongLivedAccessToken({
  ig_app_id,
  ig_app_secret,
  accessToken,
}: {
  ig_app_id: string;
  ig_app_secret: string;
  accessToken: string;
}): Promise<string> {
  const latReq = await fetch(
    `https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=${ig_app_secret}&access_token=${accessToken}&client_id=${ig_app_id}`,
    {
      cache: "no-cache",
    },
  );

  if (latReq.status !== 200) {
    throw new Error(
      "Failed to exchange access token for long lived access token",
    );
  }

  const lat = await latReq.json();

  const longLivedAccessToken = lat.access_token;

  return longLivedAccessToken;
}
