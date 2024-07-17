import { getPictures } from './pixabay-api';
import { renderGallery } from './render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const gallery = document.querySelector('.gallery');
const searchForm = document.querySelector('.search-form');
const loading = document.querySelector('.loading');
const loadBtn = document.querySelector('.load-btn');

const params = {
  q: '',
  page: 1,
  per_page: 15,
  maxPage: 0,
};

searchForm.addEventListener('submit', handleSearch);

async function handleSearch(event) {
  event.preventDefault();
  gallery.innerHTML = '';
  params.page = 1;
  const form = event.currentTarget;
  params.q = form.elements.query.value.toLowerCase();

  if (params.q === '') {
    iziToast.error({
      position: 'topRight',
      message:
        'Sorry, there are no images matching your search query. Please try again!',
    });

    return;
  }
  loading.style.display = 'flex';
  try {
    const data = await getPictures(params);
    if (data.hits.length === 0) {
      loadBtn.style.display = 'none';
      iziToast.error({
        position: 'topRight',
        message:
          'Sorry, there are no images matching your search query. Please try again!!!',
      });
    } else {
      params.maxPage = Math.ceil(data.totalHits / params.per_page);
      renderGallery(data.hits);
      if (data.hits.length > 0 && data.hits.length !== data.totalHits) {
        loadBtn.style.display = 'flex';
        loadBtn.addEventListener('click', handleLoadMore);
      }
    }
    if (params.page === params.maxPage) {
      iziToast.info({
        position: 'topRight',
        message: "We're sorry, but you've reached the end of search results.",
      });
      loadBtn.style.display = 'none';
      loadBtn.removeEventListener('click', handleLoadMore);
    }
  } catch (error) {
    iziToast.error({
      position: 'topRight',
      message:
        'Sorry, there was an error fetching images. Please try again later!',
    });
    loadBtn.style.display = 'none';
  } finally {
    loading.style.display = 'none';
  }
}

async function handleLoadMore() {
  loadBtn.style.display = 'none';
  loading.style.display = 'flex';
  params.page += 1;
  try {
    const data = await getPictures(params);
    renderGallery(data.hits);
    const galleryItem = document.querySelector('.gallery');
    const galleryItemHeight = galleryItem.getBoundingClientRect().height;
    window.scrollBy({
      top: galleryItemHeight * 2,
      behavior: 'smooth',
    });
    loadBtn.style.display = 'flex';
  } catch (error) {
    iziToast.error({
      position: 'topRight',
      message:
        'Sorry, there was an error fetching images. Please try again later!',
    });
  } finally {
    loading.style.display = 'none';
  }
}
