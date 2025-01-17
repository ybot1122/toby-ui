export async function getInstagramLongLivedAccessToken({
  igId,
  igSecret,
  accessToken,
}: {
  igId: string;
  igSecret: string;
  accessToken: string;
}): Promise<string> {
  const latReq = await fetch(
    `https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=${igSecret}&access_token=${accessToken}&client_id=${igId}`,
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
