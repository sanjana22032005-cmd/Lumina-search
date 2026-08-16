import axios from "axios";

const UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_KEY;
const PEXELS_KEY = import.meta.env.VITE_PEXELS_KEY;
const GIPHY_KEY = import.meta.env.VITE_GIPHY_KEY;

export async function fetchPhotos(query, page = 1, per_page = 20) {
  const res = await axios.get("https://api.unsplash.com/search/photos", {
    params: { query, page, per_page },
    headers: {
      Authorization: `Client-ID ${UNSPLASH_KEY}`,
    },
  });

  return res.data;
}

<<<<<<< HEAD
export async function fetchVideos(query, page = 1, per_page = 15) {
  const res = await axios.get("https://api.pexels.com/videos/search", {
    params: { query, page, per_page },
=======
export async function fetchVideos(query, per_page = 15) {
  const res = await axios.get("https://api.pexels.com/videos/search", {
    params: { query, per_page },
>>>>>>> d52f16b2d67d4f1ce8208ddcbbe38e691ca6ded3
    headers: {
      Authorization: PEXELS_KEY,
    },
  });

  return res.data;
}

<<<<<<< HEAD
export async function fetchGIF(query, page = 1, limit = 20) {
  const offset = (page - 1) * limit;
=======
export async function fetchGIF(query, limit = 20) {
>>>>>>> d52f16b2d67d4f1ce8208ddcbbe38e691ca6ded3
  const res = await axios.get("https://api.giphy.com/v1/gifs/search", {
    params: {
      api_key: GIPHY_KEY,
      q: query,
      limit,
<<<<<<< HEAD
      offset
=======
>>>>>>> d52f16b2d67d4f1ce8208ddcbbe38e691ca6ded3
    },
  });

  return res.data;
}