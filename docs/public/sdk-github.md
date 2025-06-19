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
