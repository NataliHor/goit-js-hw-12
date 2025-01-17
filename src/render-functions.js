import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let lightbox = new SimpleLightbox('.gallery-item a', {
  captionsData: 'alt',
  captionDelay: 250,
}).refresh();

export function renderGallery(images) {
  const gallery = document.querySelector('.gallery');
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
        <li class="gallery-item">
          <a href="${largeImageURL}">
            <img src="${webformatURL}" alt="${tags}" loading="lazy" class="gallery-image"/>
          </a>
          <ul class="info">
            <li class="info-item"> <h2 class="info-text">Likes</h2> <p class="info-value">${likes}</p> </li>
            <li class="info-item"> <h2 class="info-text">Views</h2> <p class="info-value">${views}</p> </li>
            <li class="info-item"> <h2 class="info-text">Comments</h2> <p class="info-value">${comments}</p> </li>
            <li class="info-item"> <h2 class="info-text">Downloads</h2> <p class="info-value">${downloads}</p> </li>
          </ul>
        </li>
    `
    )
    .join('');
  gallery.innerHTML += markup;
  lightbox.refresh();
}
