import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('search-form');
    const gallery = document.querySelector('.gallery');
    const loadMoreBtn = document.querySelector('.load-more');
    const modal = document.querySelector('.modal');
    const modalContent = document.querySelector('.modal-content');
    let currentPage = 1;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const searchQuery = e.target.elements.searchQuery.value.trim();

        currentPage = 1;

        if (searchQuery) {
            await searchImages(searchQuery);
        } else {
            iziToast.error({
                title: 'Error',
                message: 'Please enter a search query.',
            });
        }
    });

    loadMoreBtn.addEventListener('click', async () => {
        const searchQuery = form.elements.searchQuery.value.trim();
        currentPage++;

        if (searchQuery) {
            await searchImages(searchQuery);
        }
    });

    modal.addEventListener('click', () => closeModal());

    async function searchImages(query) {
        try {
            const response = await axios.get('https://pixabay.com/api/', {
                params: {
                    key: '41114250-186ebd042d251d6e26d9d298e',
                    q: query,
                    image_type: 'photo',
                    orientation: 'horizontal',
                    safesearch: true,
                    page: currentPage,
                    per_page: 40,
                },
            });

            const images = response.data.hits;

            if (images.length > 0) {
                if (currentPage === 1) {
                    gallery.innerHTML = '';
                }

                images.forEach((image) => {
                    const card = createImageCard(image, images);
                    gallery.appendChild(card);
                });

                loadMoreBtn.style.display = 'block';
            } else {
                loadMoreBtn.style.display = 'none';

                iziToast.info({
                    title: 'Info',
                    message: "Sorry, there are no images matching your search query. Please try again.",
                });
            }
        } catch (error) {
            console.error('Error fetching images:', error.message);
        }
    }

    function createImageCard(image, images) {
        const card = document.createElement('div');
        card.classList.add('photo-card');

        const img = document.createElement('img');
        img.src = image.webformatURL;
        img.alt = image.tags;
        img.loading = 'lazy';

        img.addEventListener('click', () => openModal(images, images.indexOf(image)));

        const info = document.createElement('div');
        info.classList.add('info');

        const likes = document.createElement('p');
        likes.classList.add('info-item');
        likes.innerHTML = `<b>Likes:</b> ${image.likes}`;

        const views = document.createElement('p');
        views.classList.add('info-item');
        views.innerHTML = `<b>Views:</b> ${image.views}`;

        const comments = document.createElement('p');
        comments.classList.add('info-item');
        comments.innerHTML = `<b>Comments:</b> ${image.comments}`;

        const downloads = document.createElement('p');
        downloads.classList.add('info-item');
        downloads.innerHTML = `<b>Downloads:</b> ${image.downloads}`;

        info.appendChild(likes);
        info.appendChild(views);
        info.appendChild(comments);
        info.appendChild(downloads);

        card.appendChild(img);
        card.appendChild(info);

        return card;
    }

    function openModal(images, index) {
        modalContent.innerHTML = '';

        const modalImg = document.createElement('img');
        modalImg.src = images[index].largeImageURL;
        modalImg.alt = images[index].tags;

        const prevBtn = document.createElement('button');
        prevBtn.innerText = 'Previous';
        prevBtn.addEventListener('click', () => showImage(images, index - 1));

        const nextBtn = document.createElement('button');
        nextBtn.innerText = 'Next';
        nextBtn.addEventListener('click', () => showImage(images, index + 1));

        modalContent.appendChild(modalImg);
        modalContent.appendChild(prevBtn);
        modalContent.appendChild(nextBtn);

        modal.style.display = 'flex';
    }

    function showImage(images, index) {
        if (index >= 0 && index < images.length) {
            const modalImg = document.querySelector('.modal-content img');
            modalImg.src = images[index].largeImageURL;
            modalImg.alt = images[index].tags;
        }
    }

    function closeModal() {
        modal.style.display = 'none';
    }
});