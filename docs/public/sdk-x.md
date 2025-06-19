## Get Access Token

Exchange OAuth authorization code for an access token using PKCE flow.

Parameters:

- **oauthClientId**: string - X OAuth client ID
- **codeVerifier**: string - PKCE code verifier
- **code**: string - authorization code from OAuth callback
- **redirect_uri**: string - redirect URI (must match OAuth app configuration)

Returns: `Promise<OAuthResponse>`

```ts
type OAuthResponse =
  | {
      access_token: string;
    }
  | { error: string; error_description: string };
```

Example:

```ts
import { getAccessToken } from "@ybot1122/toby-ui/Sdk/x/getAccessToken";

const tokenResponse = await getAccessToken({
  oauthClientId: "your-client-id",
  codeVerifier: "generated-code-verifier",
  code: "authorization-code-from-callback",
  redirect_uri: "https://yourapp.com/callback",
});

if ("access_token" in tokenResponse) {
  console.log("Access token:", tokenResponse.access_token);
} else {
  console.error("Error:", tokenResponse.error_description);
}
```

## Get Me

Retrieve information about the authenticated user.

Parameters:

- **accessToken**: string - X access token

Returns: `Promise<{ name: string }>` - user information (returns "Rate Limited :)" if rate limited)

Example:

```ts
import { getMe } from "@ybot1122/toby-ui/Sdk/x/getMe";

const userInfo = await getMe({
  accessToken: "your-access-token",
});

console.log(`User name: ${userInfo.name}`);
```

## Post Tweet

Create a new tweet with optional media attachments.

Parameters:

- **text**: string - tweet content
- **accessToken**: string - X access token
- **media**: object (optional) - media attachments
  - **media_ids**: string[] - array of media IDs from uploaded media

Returns: `Promise<XPostResponse>`

```ts
type XPostResponse =
  | {
      data: { id: string };
    }
  | { errors: { message: string }[] };
```

Example:

```ts
import { postTweet } from "@ybot1122/toby-ui/Sdk/x/postTweet";

// Simple text tweet
const tweetResponse = await postTweet({
  text: "Hello X API!",
  accessToken: "your-access-token",
});

if ("data" in tweetResponse) {
  console.log(`Tweet posted with ID: ${tweetResponse.data.id}`);
} else {
  console.error("Tweet failed:", tweetResponse.errors);
}

// Tweet with media
const mediaResponse = await postTweet({
  text: "Check out this image!",
  media: {
    media_ids: ["media_id_1", "media_id_2"],
  },
  accessToken: "your-access-token",
});
```

## Upload Media

Upload media files to X for use in tweets. Uses OAuth 1.0a authentication.

Parameters:

- **data**: string - base64 encoded media data
- **consumerKey**: string - X API consumer key
- **consumerSecret**: string - X API consumer secret
- **accessToken**: string - X access token (OAuth 1.0a)
- **accessTokenSecret**: string - X access token secret (OAuth 1.0a)

Returns: `Promise<string>` - media ID string

Example:

```ts
import { uploadMedia } from "@ybot1122/toby-ui/Sdk/x/uploadMedia";

try {
  const mediaId = await uploadMedia({
    data: "base64-encoded-image-data",
    consumerKey: "your-consumer-key",
    consumerSecret: "your-consumer-secret",
    accessToken: "your-oauth1-token",
    accessTokenSecret: "your-oauth1-token-secret",
  });

  console.log(`Media uploaded with ID: ${mediaId}`);

  // Use the media ID in a tweet
  const tweetResponse = await postTweet({
    text: "Check out this uploaded image!",
    media: {
      media_ids: [mediaId],
    },
    accessToken: "your-oauth2-access-token",
  });
} catch (error) {
  console.error("Media upload failed:", error.message);
}
```
