import crypto from 'crypto';

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || process.env.URL_SECRET_KEY || ''; // Must be 256 bits (32 characters)
const IV_LENGTH = 16; // For AES, this is always 16

function getCipherKey() {
    if (!ENCRYPTION_KEY) {
        throw new Error("ENCRYPTION_KEY is not defined");
    }
    // Ensure key is 32 bytes. If hex, parse it. If string, hash it or pad it?
    // The existing code assumed hex. Let's stick to that or be more flexible.
    // If it's 64 chars hex, it's 32 bytes.
    if (ENCRYPTION_KEY.length === 64) {
        return Buffer.from(ENCRYPTION_KEY, 'hex');
    }
    // If it's 32 chars, assume it's utf8 (not ideal for security but common in envs)
    // Or maybe the user provided a hex string.
    // Let's try to follow the previous pattern but make it robust.
    return Buffer.from(ENCRYPTION_KEY, 'hex');
}

export function encrypt(text: string): string {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv('aes-256-cbc', getCipherKey(), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
}

export function decrypt(text: string): string {
    const textParts = text.split(':');
    const iv = Buffer.from(textParts.shift()!, 'hex');
    const encryptedText = Buffer.from(textParts.join(':'), 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', getCipherKey(), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}

export interface TokenData {
    url: string;
    expire: number;
}

export function encryptToken(data: TokenData): string {
    const json = JSON.stringify(data);
    return encrypt(json);
}

export function decryptToken(token: string): TokenData {
    try {
        const json = decrypt(token);
        return JSON.parse(json);
    } catch (error) {
        throw new Error("Invalid token");
    }
}
