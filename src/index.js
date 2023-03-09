import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import createCard from './createCard';
import ApiService from './api/fetchSearch';

const refs = {
  form: document.querySelector('#search-form'),
  containerGalery: document.querySelector('.gallery-list'),
  button: document.querySelector('.load-more'),
};
refs.form.addEventListener('submit', checksTerms);
refs.button.classList.add('hidden');

const apiService = new ApiService();

refs.button.addEventListener('click', onLoadMore);
refs.button.classList.add('hidden');
let lengthContainer = 40;
let totalLengthContainer = 0;

function checksTerms(event) {
  event.preventDefault();
  refs.button.classList.add('hidden');

  apiService.query = event.currentTarget.elements.searchQuery.value.trim();

  apiService.resetPage();
  resetGalery(refs.containerGalery);

  apiService
    .fetchSearch()
    .then(data => {
      createGalery(data);
      if (!apiService.query) {
        resetGalery(refs.containerGalery);
        refs.button.classList.add('hidden');
        return;
      } else if (data.totalHits === 0) {
        resetGalery(refs.containerGalery);
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else if (data.hits.length > 0)
        Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
    })
    .catch(console.log);
}

function onLoadMore() {
  lengthContainer += 40;

  if (+lengthContainer >= +totalLengthContainer && +totalLengthContainer > 0) {
    refs.button.classList.add('hidden');
    Notiflix.Notify.info(
      "We're sorry, but you've reached the end of search results."
    );
  }

  apiService.fetchSearch().then(createGalery).catch(console.log);
}

function createGalery(data) {
  const { hits, totalHits } = data;
  totalLengthContainer = totalHits;

  if (hits.length > 0) {
    const markupCard = `${hits.map(createCard).join('')}`;

    refs.containerGalery.insertAdjacentHTML('beforeend', markupCard);

    refs.button.classList.remove('hidden');

    const lightbox = new SimpleLightbox('.photo-link', {
      captionsData: 'alt',
      captionDelay: 250,
    });
  }
}

function resetGalery(element) {
  element.innerHTML = '';
}
