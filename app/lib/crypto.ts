export interface TokenData {
  url: string;
  expire: number;
}

const ALGORITHM = "AES-GCM";
const IV_LENGTH = 12; // 12 bytes for GCM

function fromHex(hex: string): Uint8Array {
  const match = hex.match(/.{1,2}/g);
  if (!match) return new Uint8Array();
  return new Uint8Array(match.map((byte) => parseInt(byte, 16)));
}

function toHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function getKeyMaterial(): Uint8Array {
  const keyStr =
    process.env.ENCRYPTION_KEY || process.env.URL_SECRET_KEY || "";
  
  if (!keyStr) {
    // Return a dummy key or throw? Original threw.
    throw new Error("ENCRYPTION_KEY is not defined");
  }

  // Original logic assumed hex.
  return fromHex(keyStr);
}

async function getCryptoKey(): Promise<CryptoKey> {
  const keyData = getKeyMaterial();
  return crypto.subtle.importKey(
    "raw",
    keyData as any,
    { name: ALGORITHM },
    false,
    ["encrypt", "decrypt"]
  );
}

export async function encrypt(text: string): Promise<string> {
  const key = await getCryptoKey();
  const iv = crypto.getRandomValues(new Uint8Array(IV_LENGTH));
  const encoded = new TextEncoder().encode(text);

  const encrypted = await crypto.subtle.encrypt(
    { name: ALGORITHM, iv },
    key,
    encoded
  );

  return `${toHex(iv as any)}:${toHex(encrypted as any)}`;
}

export async function decrypt(text: string): Promise<string> {
  const [ivHex, dataHex] = text.split(":");
  if (!ivHex || !dataHex) throw new Error("Invalid cipher text format");

  const iv = fromHex(ivHex);
  const data = fromHex(dataHex);
  const key = await getCryptoKey();

  const decrypted = await crypto.subtle.decrypt(
    { name: ALGORITHM, iv },
    key,
    data
  );

  return new TextDecoder().decode(decrypted);
}

export async function encryptToken(data: TokenData): Promise<string> {
  const json = JSON.stringify(data);
  return encrypt(json);
}

export async function decryptToken(token: string): Promise<TokenData> {
  try {
    const json = await decrypt(token);
    return JSON.parse(json);
  } catch (error) {
    console.error("Decrypt error", error);
    throw new Error("Invalid token");
  }
}
