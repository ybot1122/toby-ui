export async function getInstagramAccessToken({
  ig_app_id,
  ig_app_secret,
  redirect_uri,
  code,
}: {
  ig_app_id: string;
  ig_app_secret: string;
  redirect_uri: string;
  code: string;
}): Promise<string> {
  const formData = new FormData();
  formData.append("client_id", ig_app_id);
  formData.append("client_secret", ig_app_secret);
  formData.append("grant_type", "authorization_code");
  formData.append("redirect_uri", redirect_uri);
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
