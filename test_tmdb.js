const apiKey = '179f42113c390d075522d894da159c37';
const title = 'Breaking Bad';
const url = `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${encodeURIComponent(title)}`;

async function test() {
    try {
        const res = await fetch(url);
        console.log('Status:', res.status);
        const data = await res.json();
        console.log('Result 0 Poster Path:', data?.results?.[0]?.poster_path);
    } catch (e) {
        console.error('Test failed:', e);
    }
}

test();
