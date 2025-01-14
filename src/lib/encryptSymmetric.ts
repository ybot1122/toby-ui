import crypto from "crypto";

export const encryptSymmetric = (key: string, plaintext: string) => {
  const iv = crypto.randomBytes(12).toString("base64");
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
  let ciphertext = cipher.update(plaintext, "utf8", "base64");
  ciphertext += cipher.final("base64");
  const tag = cipher.getAuthTag().toString("base64");

  return { ciphertext, tag, iv };
};
