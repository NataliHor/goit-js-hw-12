import axios from 'axios';
const BASE_URL = 'https://pixabay.com';
const ENDPOINT = 'api';
const API_KEY = '44809751-3b2ccf197f9e8e95d68b14f11';

axios.defaults.baseURL = BASE_URL;

function getPictures({ q = '', page = 1, per_page = 15 } = {}) {
  return axios
    .get(ENDPOINT, {
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
    })
    .then(({ data }) => data);
}

export { getPictures };
