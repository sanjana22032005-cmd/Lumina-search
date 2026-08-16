import axios from 'axios';

const UNSPLASH_KEY = process.env.VITE_UNSPLASH_KEY;
const PEXELS_KEY = process.env.VITE_PEXELS_KEY;
const GIPHY_KEY = process.env.VITE_GIPHY_KEY;

async function test() {
    try {
        const uRes = await axios.get("https://api.unsplash.com/search/photos", { params: { query: 'cats', per_page: 1 }, headers: { Authorization: `Client-ID ${UNSPLASH_KEY}` } });
        console.log("Unsplash:", Object.keys(uRes.data));
    } catch(e) { console.error("Unsplash error:", e.message) }

    try {
        const pRes = await axios.get("https://api.pexels.com/videos/search", { params: { query: 'cats', per_page: 1 }, headers: { Authorization: PEXELS_KEY } });
        console.log("Pexels:", Object.keys(pRes.data));
    } catch(e) { console.error("Pexels error:", e.message) }

    try {
        const gRes = await axios.get("https://api.giphy.com/v1/gifs/search", { params: { api_key: GIPHY_KEY, q: 'cats', limit: 1 } });
        console.log("Giphy keys:", Object.keys(gRes.data));
        console.log("Giphy data[0] keys:", Object.keys(gRes.data.data[0]));
        console.log("Giphy data[0].images keys:", gRes.data.data[0].images ? Object.keys(gRes.data.data[0].images) : 'no images');
    } catch(e) { console.error("Giphy error:", e.response?.data || e.message) }
}
test();
