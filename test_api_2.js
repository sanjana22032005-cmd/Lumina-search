import axios from 'axios';

async function test() {
    try {
        const uRes = await axios.get("https://api.unsplash.com/search/photos", { 
            params: { query: 'cats', per_page: 1 }, 
            headers: { Authorization: `Client-ID jdouxCQSjhIFfsU9nc8dLgR-zOZpcp3_2s2DAZhUGBM` } 
        });
        console.log("Unsplash data:", uRes.data);
    } catch(e) { 
        console.error("Unsplash error:", e.response?.data || e.message);
    }
}
test();
