export async function postTweet({
  text,
  media,
  accessToken,
}: {
  text: string;
  media?: { media_ids: string[] };
  accessToken: string;
}) {
  const body: { text: string; media?: { media_ids: string[] } } = {
    text,
  };

  if (media) {
    body["media"] = media;
  }

  const postReq = await fetch("https://api.x.com/2/tweets", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (postReq.status === 429) {
    throw new Error("Post failed due to rate limiting");
  }

  const post = await postReq.json();

  if (!post.data.id) {
    throw new Error("failed to make post.");
  }

  return post;
}
