export async function publishMediaContainer({
  mediaContainerId,
  igId,
  accessToken,
}: {
  mediaContainerId: string;
  igId: string;
  accessToken: string;
}): Promise<string> {
  const mediaContainerPublishReq = await fetch(
    `https://graph.instagram.com/v21.0/${igId}/media_publish`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        creation_id: mediaContainerId,
        access_token: accessToken,
      }),
    },
  );
  const mediaContainerPublish = await mediaContainerPublishReq.json();

  return mediaContainerPublish.id;
}
