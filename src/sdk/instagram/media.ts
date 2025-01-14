export async function createMediaContainer({
  image,
  accessToken,
  caption,
  igId,
  isCarouselItem,
  mediaType,
  children,
}: {
  image: string;
  accessToken: string;
  caption?: string;
  igId: string;
  isCarouselItem: boolean;
  mediaType?: "CAROUSEL";
  children?: string[];
}): Promise<string> {
  const body: {
    image_url: string;
    access_token: string;
    caption?: string;
    isCarouselItem?: boolean;
    media_type?: "CAROUSEL";
    children?: string[];
  } = {
    image_url: image,
    access_token: accessToken,
  };

  if (caption) {
    body.caption = caption;
  }

  if (isCarouselItem) {
    body.isCarouselItem = true;
  }

  if (mediaType) {
    body.media_type = mediaType;
  }

  if (children) {
    body.children = children;
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
