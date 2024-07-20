import axios from 'axios';
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '44809751-3b2ccf197f9e8e95d68b14f11';

export async function getPictures({ q = '', page = 1, per_page = 15 } = {}) {
  try {
    const response = await axios.get(`${BASE_URL}`, {
      params: {
        key: API_KEY,
        q,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page,
        per_page,
        language: 'en',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
}
