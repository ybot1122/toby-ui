import crypto from "crypto";

export async function uploadImage({
  imageFile,
  cloudinary_key,
  cloudinary_secret,
  cloudinary_cloud_name,
  public_id,
  folder,
}: {
  imageFile: File;
  cloudinary_key: string;
  cloudinary_secret: string;
  cloudinary_cloud_name: string;
  public_id: string;
  folder: string;
}): Promise<string> {
  if (!cloudinary_key || !cloudinary_secret) {
    throw new Error("Cloudinary credentials not set");
  }

  if (!(imageFile instanceof File)) {
    throw new Error("Invalid file");
  }

  const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${cloudinary_cloud_name}/image/upload`;

  const formData = new FormData();
  const timestamp = Date.now().toString();
  const upload_preset = "u4kwvaih";
  formData.append("file", imageFile);
  formData.append("public_id", public_id);
  formData.append("folder", folder);
  formData.append("upload_preset", "u4kwvaih");
  formData.append("timestamp", timestamp);
  formData.append(
    "signature",
    generateSignature(
      folder,
      public_id,
      timestamp,
      upload_preset,
      cloudinary_secret,
    ),
  );
  formData.append("api_key", cloudinary_key);

  const response = await fetch(CLOUDINARY_URL, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Failed to upload image: ${response.statusText}`);
  }

  const result = await response.json();

  if (result.existing) {
    throw new Error("Image with that name already exists");
  }

  return result.secure_url;
}

function generateSignature(
  folder: string,
  public_id: string,
  timestamp: string,
  upload_preset: string,
  CLOUDINARY_SECRET: string,
): string {
  const string = `folder=${folder}&public_id=${public_id}&timestamp=${timestamp}&upload_preset=${upload_preset}${CLOUDINARY_SECRET}`;

  return crypto.createHash("sha1").update(string).digest("hex");
}
