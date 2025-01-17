// https://medium.com/@tony.infisical/guide-to-nodes-crypto-module-for-encryption-decryption-65c077176980

import crypto from "node:crypto";

export const encryptSymmetric = ({
  key,
  plaintext,
}: {
  key: string;
  plaintext: string;
}): string => {
  const iv = crypto.randomBytes(12).toString("base64");
  const cipher = crypto.createCipheriv(
    "aes-256-gcm",
    Buffer.from(key, "base64"),
    Buffer.from(iv, "base64"),
  );
  let ciphertext = cipher.update(plaintext, "utf8", "base64");
  ciphertext += cipher.final("base64");
  const tag = cipher.getAuthTag().toString("base64");

  return `${ciphertext}.${tag}.${iv}`;
};

/*

How to generate a key:

const { generateKey } = require("node:crypto");

generateKey("hmac", { length: 128 }, (err, key) => {
  if (err) throw err;
  console.log(key.export().toString("hex")); // 46e..........620
});

*/
