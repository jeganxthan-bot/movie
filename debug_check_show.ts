import { getDatabase } from "./app/lib/mongodb";
import { decrypt } from "./app/lib/crypto";

async function checkShows() {
    try {
        const db = await getDatabase();
        const collection = db.collection("series_data");
        const show = await collection.findOne({ show_title: "Breaking Bad" });

        if (show && show.seasons_data && show.seasons_data[0]) {
            const season1 = show.seasons_data[0];
            const episodes = Object.values(season1)[0] as any[];
            if (episodes && episodes.length > 0) {
                const ep = episodes[0];
                console.log("Encrypted URL from DB:", ep.url);
                try {
                    const decrypted = decrypt(ep.url);
                    console.log("Decrypted successfully:", decrypted);
                } catch (e: any) {
                    console.log("Decryption failed:", e.message);
                }
            }
        }
    } catch (error) {
        console.error("Error checking shows:", error);
    } finally {
        process.exit(0);
    }
}

checkShows();
