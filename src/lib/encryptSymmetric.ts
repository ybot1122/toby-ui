// https://medium.com/@tony.infisical/guide-to-nodes-crypto-module-for-encryption-decryption-65c077176980

// Generate 32 len random string: https://www.random.org/strings/

import crypto from "node:crypto";

export const encryptSymmetric = ({
  key,
  plaintext,
}: {
  key: string;
  plaintext: string;
}): string => {
  const iv = crypto.randomBytes(12).toString("base64");
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
  let ciphertext = cipher.update(plaintext, "utf8", "base64");
  ciphertext += cipher.final("base64");
  const tag = cipher.getAuthTag().toString("base64");

  return `${ciphertext}.${tag}.${iv}`;
};
