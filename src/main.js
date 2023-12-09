import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const elements = {
  searchForm: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

let currentPage = 1;
elements.loadMoreBtn.style.display = 'none';

const lightbox = new SimpleLightbox('.gallery a', {
  captionData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});

iziToast.settings({
  position: 'topRight',
});

elements.searchForm.addEventListener('submit', handlerFormSubmit);
elements.loadMoreBtn.addEventListener('click', loadMoreImages);

async function loadMoreImages() {
  currentPage += 1;
  try {
    const searchQuery = elements.searchForm.elements.searchQuery.value;
    const data = await serviceImage(searchQuery, currentPage);

    elements.gallery.insertAdjacentHTML('beforeend', createMarkup(data.hits));

    if (currentPage === Math.ceil(data.totalHits / 40)) {
      elements.loadMoreBtn.style.display = 'none';
      iziToast.show({
        message: "We're sorry, but you've reached the end of search results.",
      });
    } else {
      elements.loadMoreBtn.style.display = 'block';
      lightbox.refresh();
    }
  } catch (error) {
    console.error('Error loading more images:', error);
    iziToast.error({
      message: 'Error fetching more images. Please try again.',
    });
  }
}

async function handlerFormSubmit(evt) {
  evt.preventDefault();
  currentPage = 1;
  elements.gallery.innerHTML = '';
  elements.loadMoreBtn.style.display = 'none';
  const searchQuery = evt.currentTarget.elements.searchQuery.value.trim();
  if (!searchQuery) {
    iziToast.show({
      message:
        'Sorry, there are no images matching your search query. Please try again.',
    });

    return;
  }
  try {
    const data = await serviceImage(searchQuery);

    if (data.hits.length === 0) {
      iziToast.show({
        message:
          'Sorry, there are no images matching your search query. Please try again.',
      });
      elements.loadMoreBtn.style.display = 'none';
      return;
    }

    elements.gallery.insertAdjacentHTML('afterbegin', createMarkup(data.hits));
    lightbox.refresh();
    elements.loadMoreBtn.style.display = 'block';
    if (currentPage === Math.ceil(data.totalHits / 40)) {
      elements.loadMoreBtn.style.display = 'none';
      iziToast.show({
        message: "We're sorry, but you've reached the end of search results.",
      });
    }
  } catch (error) {
    console.error('Error fetching images:', error);
    iziToast.error({
      message: 'Error fetching images. Please try again.',
    });
  }
}

async function serviceImage(q, page = 1) {
  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '41114250-186ebd042d251d6e26d9d298e';

  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page,
        per_page: 40,
      },
    });

    if (response.data.hits.length === 0) {
      return { hits: [], totalHits: 0 };
    }
    return response.data;
  } catch (error) {
    throw new Error(error.message || 'Error fetching images');
  }
}

function createMarkup(arr) {
  return arr
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
    <div class="photo-card"><a class="img-link" href="${largeImageURL}">
    <img class="photo-card-img"src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
    <div class="info">
        <p class="info-item">
            <b>Likes ${likes}</b>
        </p>
            <p class="info-item">
        <b>Views ${views}</b>
        </p>
        <p class="info-item">
            <b>Comments ${comments}</b>
        </p>
        <p class="info-item">
            <b>Downloads ${downloads}</b>
        </p>
    </div>
</div>
    `
    )
    .join('');
}