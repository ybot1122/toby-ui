const GITHUB_API_URL = "https://api.github.com";

export async function putRepositoryContent({
  token,
  owner,
  repo,
  commitMessage,
  content,
  path,
  sha,
}: {
  token: string;
  owner: string;
  repo: string;
  commitMessage: string;
  content: string;
  path: string;
  sha?: string;
}): Promise<GitHubPutContentResponse> {
  const payload: { message: string; content: string; sha?: string } = {
    message: commitMessage,
    content: content,
  };

  if (sha) {
    payload["sha"] = sha;
  }
  const response = await fetch(
    `${GITHUB_API_URL}/repos/${owner}/${repo}/contents/${path}`,
    {
      method: "PUT",
      headers: {
        Accept: "application/vnd.github.v3+json",
        "X-GitHub-Api-Version": "2022-11-28",
        Authorization: `token ${token}`,
      },
      body: JSON.stringify(payload),
    },
  );

  console.log(response.status);

  if (response.status === 422) {
    throw new Error("SHA is required to update a file that already exists.");
  }

  if (!response.ok) {
    throw new Error(`${response.statusText}`);
  }

  const data = await response.json();

  return data;
}
interface GitHubPutContentResponse {
  content: Content;
  commit: Commit;
}

interface Content {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string;
  git_url: string;
  download_url: string;
  type: string;
  _links: Links;
}

interface Links {
  self: string;
  git: string;
  html: string;
}

interface Commit {
  sha: string;
  node_id: string;
  url: string;
  html_url: string;
  author: Author;
  committer: Committer;
  message: string;
  tree: Tree;
  parents: Parent[];
  verification: Verification;
}

interface Author {
  date: string;
  name: string;
  email: string;
}

interface Committer {
  date: string;
  name: string;
  email: string;
}

interface Tree {
  url: string;
  sha: string;
}

interface Parent {
  url: string;
  html_url: string;
  sha: string;
}

interface Verification {
  verified: boolean;
  reason: string;
  signature: unknown;
  payload: unknown;
  verified_at: unknown;
}
