## Get Access Token

Helper method to get access token during GitHub Oauth.

Parameters:

- **client_id**: string - from your GitHub OAuth app
- **client_secret**: string - from your GitHub OAuth app
- **code**: string - provided in OAuth callback url
- **redirect_uri** string - required to match the redirect uri set in OAuth app
- **repository_id**: string (optional) - passed along as `repository_id` query parameter

Returns: `Promise<{access_token: string} | {error: string, errorDescription: string}>`

Example:

```ts
import { getAccessToken } from "@ybot1122/toby-ui/Sdk/x/getAccessToken";

async function GET(request: Request) {
  const code = new URL(request.url).searchParams.get("code");

  const data = await getAccessToken({
    client_id: "CLIENT_ID",
    client_secret: "CLIENT_SECRET",
    code,
    redirect_uri: "https://mywebsite.com/redirect",
  });

  if (data.error) {
    throw new Error("failed to get access token");
  }

  return data.access_token;
}
```

## Get User

Get information about the currently authenticated user.

Parameters:

- **token**: string - Access Token. Will be sent via Authorization HTTP Header

Returns: `Promise<GithubUser>`

```ts
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
```

Example:

```ts
import { getUser } from "@ybot1122/toby-ui/Sdk/GitHub/getUser";

const user = await getUser({token: "ACCESS TOKEN"});
console.log(`Welcome, ${user.login}`).
```

## Get Repository Content

Get contents from a repository.

Parameters:

- **token**: string - Access Token. Will be sent via Authorization HTTP Header
- **owner**: string - Repository owner
- **repo**: string - Repository name
- **path** string - Path to the file

Returns: `Promise<GithubContent>`

```ts
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
```

Example:

```ts
import { getRepositoryContent } from "@ybot1122/toby-ui/Sdk/GitHub/getRepositoryContent";

try {
  const data = await getRepositoryContent({
    path: `content/file.json`,
    owner: "me",
    repo: "my_repo",
    token: "ACCESS TOKEN",
  });

  if (data.sha) {
    return {
      status: "success",
      message: data.sha,
    };
  }
} catch (e: any) {
  console.log(e);
}

return {
  status: "fail",
  message: "unknown fail",
};
```

## Put Repository Content

Given a file path, sha, and content, update the file.

Parameters:

- **token**: string - Access Token. Will be sent via Authorization HTTP Header
- **owner**: string - Repository owner
- **repo**: string - Repository name
- **path** string - Path to the file
- **commitMessage**: string - commit message you want to make
- **content**: string - base64 encoded content
- **sha**: string (optional) - only requried if updating an existing file. Creating new file, it is not required.

Returns: `Promise<GitHubPutContentResponse>`

```ts
interface GitHubPutContentResponse {
  content: Content;
  commit: Commit;
}
```

Example:

```ts
import { putRepositoryContent } from "@ybot1122/toby-ui/Sdk/GitHub/putRepositoryContent";

const content = btoa("Hello World!")

const response = await putRepositoryContent({
  content,
  owner: "Me",
  repo: "my-repo",
  path: `content/post.json`,
  commitMessage: "update the post"
  token: accessToken,
  sha,
});

if (response.commit.sha) {
  console.log('success')
} else {
  console.log('fail';)
}
```
