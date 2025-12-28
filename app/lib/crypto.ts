export interface TokenData {
  url: string;
  expire: number;
}

const ALGORITHM = "AES-GCM";
const IV_LENGTH = 12;

/* -------------------------
   Utils
-------------------------- */
function fromHex(hex: string): Uint8Array {
  const match = hex.match(/.{1,2}/g);
  if (!match) return new Uint8Array();
  return new Uint8Array(match.map(b => parseInt(b, 16)));
}

function toHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

function toABView(u8: Uint8Array): Uint8Array<ArrayBuffer> {
  const ab = u8.buffer.slice(
    u8.byteOffset,
    u8.byteOffset + u8.byteLength
  ) as ArrayBuffer;

  return new Uint8Array(ab);
}

/* -------------------------
   Key
-------------------------- */
function getKeyMaterial(): Uint8Array<ArrayBuffer> {
  const keyStr = process.env.ENCRYPTION_KEY || "";
  if (!keyStr) throw new Error("ENCRYPTION_KEY missing");
  return toABView(fromHex(keyStr));
}

async function getCryptoKey(): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    getKeyMaterial(),
    { name: ALGORITHM },
    false,
    ["encrypt", "decrypt"]
  );
}

/* -------------------------
   Encrypt
-------------------------- */
export async function encrypt(text: string): Promise<string> {
  const key = await getCryptoKey();

  const iv = toABView(
    crypto.getRandomValues(new Uint8Array(IV_LENGTH))
  );

  const encoded = toABView(
    new TextEncoder().encode(text)
  );

  const encrypted = await crypto.subtle.encrypt(
    { name: ALGORITHM, iv },
    key,
    encoded
  );

  return `${toHex(iv.buffer)}:${toHex(encrypted)}`;
}

/* -------------------------
   Decrypt
-------------------------- */
export async function decrypt(text: string): Promise<string> {
  const [ivHex, dataHex] = text.split(":");
  if (!ivHex || !dataHex) throw new Error("Invalid cipher");

  const iv = toABView(fromHex(ivHex));
  const data = toABView(fromHex(dataHex));
  const key = await getCryptoKey();

  const decrypted = await crypto.subtle.decrypt(
    { name: ALGORITHM, iv },
    key,
    data
  );

  return new TextDecoder().decode(decrypted);
}
export interface TokenData {
  url: string;
  expire: number;
}

export async function encryptToken(data: TokenData): Promise<string> {
  return encrypt(JSON.stringify(data));
}

export async function decryptToken(token: string): Promise<TokenData> {
  try {
    const json = await decrypt(token);
    return JSON.parse(json) as TokenData;
  } catch (error) {
    console.error("Decrypt error", error);
    throw new Error("Invalid token");
  }
}
