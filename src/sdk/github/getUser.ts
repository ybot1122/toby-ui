const GITHUB_API_URL = "https://api.github.com";

interface GithubUser {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name: string;
  company: string;
  blog: string;
  location: string;
  email: string;
  hireable: boolean;
  bio: string;
  twitter_username: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

export async function getUser({
  token,
}: {
  token: string;
}): Promise<GithubUser> {
  const response = await fetch(`${GITHUB_API_URL}/user`, {
    headers: {
      Accept: "application/vnd.github.v3+json",
      "X-GitHub-Api-Version": "2022-11-28",
      Authorization: `token ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Error fetching user data: ${response.statusText}`);
  }

  const data = await response.json();

  return data;
}
