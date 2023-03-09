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
refs.button.addEventListener('click', onLoadMore);

refs.button.classList.add('hidden');

const apiService = new ApiService();

let lengthContainer = 40;
let totalLengthContainer = 0;

async function checksTerms(event) {
  event.preventDefault();
  refs.button.classList.add('hidden');

  apiService.query = event.currentTarget.elements.searchQuery.value.trim();
  lengthContainer = 40;
  apiService.resetPage();
  resetGalery(refs.containerGalery);
  refs.button.disabled = false;

  try {
    const data = await apiService.fetchSearch();

    if (!apiService.query) {
      resetGalery(refs.containerGalery);
      refs.button.classList.add('hidden');
      return;
    } else if (data.totalHits === 0) {
      resetGalery(refs.containerGalery);
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else if (data.hits.length > 0 && data.totalHits > 0) {
      createGalery(data);
      Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
    }
  } catch (error) {
    console.log(error);
  }
}

async function onLoadMore() {
  lengthContainer += 40;

  try {
    const data = await apiService.fetchSearch();
    if (lengthContainer >= totalLengthContainer) {
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );

      console.log(lengthContainer);
      console.log(totalLengthContainer);
      refs.button.disabled = true;
    }
    createGalery(data);
  } catch (error) {
    console.log(error);
  }
}

function createGalery(data) {
  const { hits, totalHits } = data;
  totalLengthContainer = totalHits;

  if (hits.length > 0) {
    const markupCard = `${hits.map(createCard).join('')}`;

    refs.containerGalery.insertAdjacentHTML('beforeend', markupCard);
    smoothScroll();
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

function smoothScroll() {
  const { height: cardHeight } =
    refs.containerGalery.firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 1,
    behavior: 'smooth',
  });
}
