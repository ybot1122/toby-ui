const GITHUB_API_URL = "https://api.github.com";

interface GithubContent {
  type: string;
  encoding: string;
  size: number;
  name: string;
  path: string;
  content: string;
  sha: string;
  url: string;
  git_url: string;
  html_url: string;
  download_url: string;
  _links: {
    self: string;
    git: string;
    html: string;
  };
}

export async function getRepositoryContent({
  token,
  owner,
  repo,
  path,
}: {
  token: string;
  owner: string;
  repo: string;
  path: string;
}): Promise<GithubContent> {
  try {
    const response = await fetch(
      `${GITHUB_API_URL}/repos/${owner}/${repo}/contents/${path}`,
      {
        headers: {
          Authorization: `token ${token}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
