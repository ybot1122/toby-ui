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

## Create Media Container

Creates a media container for Instagram posts. Supports single images, carousel items, and carousel posts.

Parameters:

- **accessToken**: string - access token
- **igId**: string - Instagram account ID
- **image**: string - image URL (for single images and carousel items)
- **caption**: string - post caption (for single images only)
- **isCarouselItem**: boolean - whether this is a carousel item
- **mediaType**: "CAROUSEL" - specify for carousel posts
- **children**: string[] - array of media container IDs for carousel posts

Returns: `Promise<string>` - media container ID

Example:

```ts
import { createMediaContainer } from "@ybot1122/toby-ui/Sdk/Instagram/media";

// Single image post
const mediaContainerId = await createMediaContainer({
  accessToken: "123",
  igId: "456",
  image: "https://example.com/image.jpg",
  caption: "My awesome post!",
  isCarouselItem: false,
});

// Carousel item
const carouselItemId = await createMediaContainer({
  accessToken: "123",
  igId: "456",
  image: "https://example.com/image1.jpg",
  isCarouselItem: true,
});

// Carousel post
const carouselId = await createMediaContainer({
  accessToken: "123",
  igId: "456",
  mediaType: "CAROUSEL",
  children: ["item1_id", "item2_id", "item3_id"],
});
```

## Publish Media Container

Publishes a media container to Instagram. This converts a media container into a live Instagram post.

Parameters:

- **mediaContainerId**: string - ID of the media container to publish
- **igId**: string - Instagram account ID
- **accessToken**: string - access token

Returns: `Promise<string>` - published media ID

Example:

```ts
import { publishMediaContainer } from "@ybot1122/toby-ui/Sdk/Instagram/mediaPublish";

// First create a media container
const mediaContainerId = await createMediaContainer({
  accessToken: "123",
  igId: "456",
  image: "https://example.com/image.jpg",
  caption: "My awesome post!",
  isCarouselItem: false,
});

// Then publish it
const publishedMediaId = await publishMediaContainer({
  mediaContainerId,
  igId: "456",
  accessToken: "123",
});
```