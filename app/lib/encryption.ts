import crypto from "crypto";

// Grab the env variable
const rawKey = process.env.URL_SECRET_KEY;

if (!rawKey) {
  throw new Error("URL_SECRET_KEY is not set in environment variables");
}

// Tell TypeScript this is now definitely a string
const SECRET_KEY: string = rawKey;

export function encryptUrl(url: string) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(
    "aes-256-cbc",
    Buffer.from(SECRET_KEY, "hex"), // now TypeScript knows it's a string
    iv
  );

  let encrypted = cipher.update(url, "utf-8", "hex");
  encrypted += cipher.final("hex");

  return iv.toString("hex") + ":" + encrypted;
}

export function decryptUrl(encrypted: string) {
  const [ivHex, encryptedData] = encrypted.split(":");
  const iv = Buffer.from(ivHex, "hex");
  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    Buffer.from(SECRET_KEY, "hex"),
    iv
  );

  let decrypted = decipher.update(encryptedData, "hex", "utf-8");
  decrypted += decipher.final("utf-8");

  return decrypted;
}
