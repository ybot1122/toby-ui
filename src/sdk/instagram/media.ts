type Params = { accessToken: string; igId: string } & (
  | { image: string; isCarouselItem: true }
  | { caption: string; image: string; isCarouselItem: false }
  | {
      mediaType: "CAROUSEL";
      children: string[];
    }
);

export async function createMediaContainer({
  accessToken,
  igId,
  ...rest
}: Params): Promise<string> {
  const body: {
    image_url?: string;
    access_token: string;
    caption?: string;
    isCarouselItem?: boolean;
    media_type?: "CAROUSEL";
    children?: string;
  } = {
    access_token: accessToken,
  };

  if ("image" in rest && rest.image) {
    body.image_url = rest.image;
  }

  if ("caption" in rest && rest.caption) {
    body.caption = rest.caption;
  }

  if ("isCarouselItem" in rest && rest.isCarouselItem) {
    body.isCarouselItem = true;
  }

  if ("mediaType" in rest && rest.mediaType) {
    body.media_type = rest.mediaType;
  }

  if ("children" in rest && rest.children) {
    body.children = rest.children.join(",");
  }

  // Create Media Container
  const mediaContainerReq = await fetch(
    `https://graph.instagram.com/v21.0/${igId}/media`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  );
  const mediaContainer = await mediaContainerReq.json();
  const mediaContainerId = mediaContainer.id;

  return mediaContainerId;
}
