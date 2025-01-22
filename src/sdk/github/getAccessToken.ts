type GithubOauthResponse =
  | {
      access_token: string;
    }
  | { error: string; error_description: string };

export async function getAccessToken({
  client_id,
  client_secret,
  code,
  redirect_uri,
  repository_id,
}: {
  client_id: string;
  client_secret: string;
  code: string;
  redirect_uri: string;
  repository_id?: string;
}): Promise<GithubOauthResponse> {
  const url = new URL("https://github.com/login/oauth/access_token");
  url.searchParams.append("client_id", client_id);
  url.searchParams.append("client_secret", client_secret);
  url.searchParams.append("code", code);
  url.searchParams.append("redirect_uri", redirect_uri);

  if (repository_id) {
    url.searchParams.append("repository_id", repository_id);
  }

  const response = await fetch(url, {
    headers: {
      Accept: "application/vnd.github.v3+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  return data;
}
