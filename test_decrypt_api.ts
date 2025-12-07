
import { encrypt } from "./app/lib/crypto";

async function testDecryptApi() {
    const originalUrl = "https://example.com/video.mp4";
    const encryptedUrl = encrypt(originalUrl);

    console.log("Original URL:", originalUrl);
    console.log("Encrypted URL:", encryptedUrl);

    try {
        const response = await fetch("http://localhost:3000/api/decrypt", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ encryptedUrl }),
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Decrypted URL from API:", data.decryptedUrl);

        if (data.decryptedUrl === originalUrl) {
            console.log("SUCCESS: Decrypted URL matches original.");
        } else {
            console.error("FAILURE: Decrypted URL does not match.");
        }
    } catch (error) {
        console.error("Test failed:", error);
    }
}

testDecryptApi();
