import crypto from "node:crypto";

const generateOAuthSignature = (
  method: string,
  url: string,
  params: Record<string, string>,
  consumerSecret: string,
  tokenSecret: string,
) => {
  const sortedParams = Object.keys(params)
    .sort()
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`,
    )
    .join("&");
  const baseString = `${method.toUpperCase()}&${encodeURIComponent(url)}&${encodeURIComponent(sortedParams)}`;
  const signingKey = `${encodeURIComponent(consumerSecret)}&${encodeURIComponent(tokenSecret)}`;
  return crypto
    .createHmac("sha1", signingKey)
    .update(baseString)
    .digest("base64");
};

export const uploadMedia = async ({
  data,
  consumerKey,
  consumerSecret,
  accessToken,
  accessTokenSecret,
}: {
  data: string;
  consumerKey: string;
  consumerSecret: string;
  accessToken: string;
  accessTokenSecret: string;
}): Promise<string> => {
  if (!consumerKey || !consumerSecret || !accessToken || !accessTokenSecret) {
    throw new Error("Invalid X Credentials");
  }

  const url = "https://upload.twitter.com/1.1/media/upload.json";
  const method = "POST";
  const oauthParams: Record<string, string> = {
    media_data: decodeURIComponent(data),
    oauth_consumer_key: consumerKey,
    oauth_nonce: crypto.randomUUID().toString(),
    oauth_signature_method: "HMAC-SHA1",
    oauth_timestamp: Math.floor(Date.now() / 1000).toString(),
    oauth_token: accessToken,
    oauth_version: "1.0",
  };

  oauthParams["oauth_signature"] = generateOAuthSignature(
    method,
    url,
    { ...oauthParams },
    consumerSecret,
    accessTokenSecret,
  );

  delete oauthParams.media_data;

  const authHeader = `OAuth ${Object.keys(oauthParams)
    .map(
      (key) =>
        `${encodeURIComponent(key)}="${encodeURIComponent(oauthParams[key])}"`,
    )
    .join(",")}`;

  const req = await fetch(url, {
    method,
    headers: {
      Accept: "*/*",
      Authorization: authHeader,
      "accept-encoding": "gzip, deflate",
      "Content-Type": "application/x-www-form-urlencoded",
      host: "upload.twitter.com",
      "User-Agent": "twit-client",
    },
    body: `media_data=${encodeURIComponent(data)}`,
  });

  const body = await req.json();

  if (body.errors) {
    if (
      body.errors.some(
        (err: { code: number }) => err.code === 215 || err.code === 32,
      )
    ) {
      throw new Error("failed to authenticate for media upload");
    } else {
      throw new Error("failed media upload");
    }
  }

  return body.media_id_string;
};
