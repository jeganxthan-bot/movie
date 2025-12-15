const { MongoClient, ObjectId } = require('mongodb');

async function check() {
    const uri = 'mongodb+srv://jegan:1110@cluster0.i15dkw2.mongodb.net/?appName=Cluster0';
    const client = new MongoClient(uri);
    
    try {
        await client.connect();
        const db = client.db('series_db');
        const col = db.collection('series_data');
        
        const count = await col.countDocuments();
        console.log('Total documents:', count);
        
        const id = '69396e5a058d6c1172e30e84';
        console.log('\nLooking for document with _id:', id);
        const doc = await col.findOne({ _id: new ObjectId(id) });
        
        if (doc) {
            console.log('Found document!');
            console.log('Show title:', doc.show_title);
            console.log('Has seasons_data:', !!doc.seasons_data);
            if (doc.seasons_data && doc.seasons_data[0]) {
                const s1 = doc.seasons_data[0];
                const groups = Object.keys(s1);
                console.log('Season 1 groups:', groups);
                if (groups[0]) {
                    const eps = s1[groups[0]];
                    console.log('First group has', eps.length, 'episodes');
                    if (eps[0]) {
                        console.log('First episode:', {
                            title: eps[0].title,
                            hasUrl: !!eps[0].url,
                            url: eps[0].url ? eps[0].url.substring(0, 50) + '...' : 'NO URL'
                        });
                    }
                }
            }
        } else {
            console.log('Document NOT found!');
        }
    } finally {
        await client.close();
    }
}

check();
