import crypto from "crypto";

export const decryptSymmetric = (
  key: string,
  ciphertext: string,
  tag: string,
  iv: string,
) => {
  // create a decipher object
  const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);

  // set the authentication tag for the decipher object
  decipher.setAuthTag(new Uint8Array(Buffer.from(tag, "base64")));

  // update the decipher object with the base64-encoded ciphertext
  let plaintext = decipher.update(ciphertext, "base64", "utf8");

  // finalize the decryption process
  plaintext += decipher.final("utf8");

  return plaintext;
};
