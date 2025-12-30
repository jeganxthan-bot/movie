import { getDatabase } from "./app/lib/mongodb";
import * as dotenv from "dotenv";

dotenv.config();

async function checkMovies() {
    try {
        const db = await getDatabase();
        const movie = await db.collection("movie_data").findOne({ title: "JUJUTSU KAISEN: Hidden Inventory / Premature Death - The Movie" });
        console.log("Movie Data:", JSON.stringify(movie, null, 2));
    } catch (error) {
        console.error("Error checking movies:", error);
    } finally {
        process.exit(0);
    }
}

checkMovies();
