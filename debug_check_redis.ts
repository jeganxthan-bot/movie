import { Redis } from "@upstash/redis";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
dotenv.config();

const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL;
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

console.log("URL:", UPSTASH_URL ? "Found" : "Missing");
console.log("TOKEN:", UPSTASH_TOKEN ? "Found" : "Missing");

async function test() {
    if (!UPSTASH_URL || !UPSTASH_TOKEN) {
        console.error("Missing Upstash credentials");
        return;
    }

    try {
        const redis = new Redis({ url: UPSTASH_URL, token: UPSTASH_TOKEN });
        const key = "debug_test_key";
        const val = "hello world " + Date.now();

        console.log("Setting key...");
        await redis.set(key, val);

        console.log("Getting key...");
        const res = await redis.get(key);

        console.log("Result:", res);
        console.log("Match:", res === val);

        await redis.del(key);
    } catch (err) {
        console.error("Redis error:", err);
    }
}

test();
