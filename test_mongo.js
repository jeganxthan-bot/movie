const { MongoClient } = require('mongodb');

async function test() {
    const uri = 'mongodb+srv://jegan:1110@cluster0.i15dkw2.mongodb.net/?appName=Cluster0';
    const client = new MongoClient(uri);
    
    try {
        console.log('Connecting to MongoDB...');
        await client.connect();
        console.log('Connected successfully!');
        
        const admin = client.db().admin();
        const dbs = await admin.listDatabases();
        console.log('Available databases:');
        dbs.databases.forEach(db => console.log(' -', db.name));
        
        // Try to find the right database
        for (const dbInfo of dbs.databases) {
            if (dbInfo.name.includes('movie') || dbInfo.name.includes('series')) {
                console.log(`\nChecking database: ${dbInfo.name}`);
                const db = client.db(dbInfo.name);
                const collections = await db.listCollections().toArray();
                console.log('Collections:', collections.map(c => c.name).join(', '));
            }
        }
    } catch (err) {
        console.error('Error:', err.message);
    } finally {
        await client.close();
    }
}

test();
