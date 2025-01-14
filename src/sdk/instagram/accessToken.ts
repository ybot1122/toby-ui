export async function getInstagramAccessToken({
  igId,
  igSecret,
  redirectUri,
  code,
}: {
  igId: string;
  igSecret: string;
  redirectUri: string;
  code: string;
}): Promise<string> {
  const formData = new FormData();
  formData.append("client_id", igId);
  formData.append("client_secret", igSecret);
  formData.append("grant_type", "authorization_code");
  formData.append("redirect_uri", redirectUri);
  formData.append("code", code);

  // Exchange code for access token
  const atReq = await fetch("https://api.instagram.com/oauth/access_token", {
    method: "POST",
    body: formData,
    cache: "no-cache",
  });

  const at = await atReq.json();
  const accessToken = at.access_token;

  return accessToken;
}
