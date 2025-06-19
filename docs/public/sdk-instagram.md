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

## Get Long Lived Access Token

Exchange access token fora long lived access token.

Parameters:

- **igId**: string - from your Instagram OAuth app
- **igSecret**: string - from your Instagram OAuth app
- **accessTolken** string - access token

Returns: `Promise<string>`

Example:

```ts
import { getInstagramLongLivedAccessToken } from "@ybot1122/toby-ui/Sdk/Instagram/longLivedAccessToken";

let longAccessToken;
try {
  longAccessToken = await getInstagramLongLivedAccessToken({
    igId: "IG_APP_ID",
    igSecret: "IG_APP_SECRET",
    accessToken: "12345",
  });
} catch (e) {
  console.error(e);
}
```

## Me

Return info about the authenticated user.

Parameters:

- **accessToken**: string - access token
- **fields** - string[] - field you want returned.

Returns: `Promise<InstagramMeResponse>`

```ts
interface InstagramMeResponse {
  name: string;
  id: string;
}
```

Example:

```ts
import { getInstagramMe } from "@ybot1122/toby-ui/Sdk/Instagram/me";

const igMe = await getInstagramMe({ accessToken: "123", fields: ["name"] });
```
