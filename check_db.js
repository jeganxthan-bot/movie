const { MongoClient } = require('mongodb');

async function checkDB() {
    const client = new MongoClient('mongodb+srv://jegan:1110@cluster0.i15dkw2.mongodb.net/?appName=Cluster0');
    try {
        await client.connect();
        const db = client.db('movie_database');
        const collection = db.collection('series_data');
        
        // Get one document to see structure
        const doc = await collection.findOne({});
        if (doc && doc.seasons_data && doc.seasons_data[0]) {
            const firstSeason = doc.seasons_data[0];
            const firstGroup = Object.keys(firstSeason)[0];
            const firstEpisode = firstSeason[firstGroup][0];
            console.log('Sample episode structure:');
            console.log(JSON.stringify(firstEpisode, null, 2));
        }
    } finally {
        await client.close();
    }
}

checkDB().catch(console.error);
