type OAuthResponse =
  | {
      access_token: string;
    }
  | { error: string; error_description: string };

export async function getAccessToken({
  oauthClientId,
  codeVerifier,
  code,
  redirect_uri,
}: {
  oauthClientId: string;
  codeVerifier: string;
  code: string;
  redirect_uri: string;
}): Promise<OAuthResponse> {
  const url = new URL("https://api.x.com/2/oauth2/token");
  url.searchParams.append("client_id", oauthClientId);
  url.searchParams.append("code_verifier", codeVerifier);
  url.searchParams.append("code", code);
  url.searchParams.append("redirect_uri", redirect_uri);
  url.searchParams.append("grant_type", "authorization_code");

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  const data = await response.json();

  return data;
}
