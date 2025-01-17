// https://medium.com/@tony.infisical/guide-to-nodes-crypto-module-for-encryption-decryption-65c077176980

import crypto from "node:crypto";

export const decryptSymmetric = ({
  key,
  ciphertext,
}: {
  key: string;
  ciphertext: string;
}): string => {
  const parts = ciphertext.split(".");
  if (parts.length !== 3) {
    throw new Error("Please decrypt a string that was encrypted using Toby UI");
  }

  const message = parts[0];
  const tag = parts[1];
  const iv = parts[2];

  // create a decipher object
  const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);

  // set the authentication tag for the decipher object
  decipher.setAuthTag(new Uint8Array(Buffer.from(tag, "base64")));

  // update the decipher object with the base64-encoded ciphertext
  let plaintext = decipher.update(message, "base64", "utf8");

  // finalize the decryption process
  plaintext += decipher.final("utf8");

  return plaintext;
};
