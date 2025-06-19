## Get Access Token

Helper method to get access token during Instagram Oauth.

Parameters:

- **igId**: string - from your Instagram OAuth app
- **igSecret**: string - from your Instagram OAuth app
- **code**: string - provided in OAuth callback url
- **redirect_uri** string - required to match the redirect uri set in OAuth app

Returns: `Promise<string>`

Example:

```ts
import { getInstagramAccessToken } from "@ybot1122/toby-ui/Sdk/Instagram/accessToken";

let accessToken;
try {
  accessToken = await getInstagramAccessToken({
    igId: "IG_APP_ID",
    igSecret: "IG_APP_SECRET",
    redirectUri: "mywebsite.com/instagram",
    code: "1234",
  });
} catch (e) {
  console.error("failed to exchange code for access token");
}
```
