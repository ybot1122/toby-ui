import { CloudinaryResource } from "../..";

export async function getImages({
  cloudinary_cloud_name,
  cloudinary_key,
  cloudinary_secret,
}: {
  cloudinary_cloud_name: string;
  cloudinary_key: string;
  cloudinary_secret: string;
}): Promise<CloudinaryResource[]> {
  if (!cloudinary_key || !cloudinary_secret || !cloudinary_cloud_name) {
    throw new Error("Cloudinary credentials not set");
  }

  const URL = `https://api.cloudinary.com/v1_1/${cloudinary_cloud_name}/resources/image`;

  const result: CloudinaryResource[] = [];
  let nextCursor: string | undefined = undefined;

  try {
    do {
      const response: Response = await fetch(
        `${URL}?next_cursor=${nextCursor || ""}&max_results=1000`,
        {
          headers: {
            Authorization: `Basic ${btoa(cloudinary_key + ":" + cloudinary_secret)}`,
          },
        },
      );
      const data = await response.json();

      if (response.status === 420) {
        throw new Error("Rate limit exceeded");
      }

      result.push(...data.resources);

      nextCursor = data.next_cursor;
    } while (nextCursor);
  } catch (error) {
    console.error("Error fetching images from Cloudinary:", error);
    throw error;
  }
  return result;
}
