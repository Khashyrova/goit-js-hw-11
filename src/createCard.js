function createCard({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) {
    return `<li class="photo-card">
              <a class="photo-link" href="${largeImageURL}">
                <img class="img" width=300 height=200  style="display: block;" src="${webformatURL}"alt="${tags}" loading="lazy" /></a>
                  <div class="info">
                      <p class="info-item">
                        <b>Likes:</b>
                        <span>${likes}</span>
                      </p>
                      <p class="info-item">
                        <b>Views:</b>
                        <span>${views}</span>
                      </p>
                      <p class="info-item">
                        <b>Comments:</b>
                        <span>${comments}</span>
                      </p>
                      <p class="info-item">
                        <b>Downloads:</b>
                        <span>${downloads}</span>
                      </p>
                  </div>
              </li> `
}

export default createCard;

// let page = 1;

// refs.form.addEventListener('submit', createGalery)
// refs.button.addEventListener('click', () => {
//     page += 1
//     fetchSearch(info, page)
//         .then(good).catch(console.log)
// })
// refs.button.classList.add('hidden') 
// let info = '';


// function createGalery(event) {
//     event.preventDefault()

//   info = event.currentTarget.elements.searchQuery.value.trim()


//     fetchSearch(info)
//         .then(good)
//         .catch(console.log) 
// }

// function resetGalery(element) {
//     element.innerHTML = '';
// }

// function good (data){
//         const { hits, totalHits } = data;
        
//         if (!info) {
//             resetGalery(refs.containerGalery)
//             return
//         } else if (hits.length === 0) {
//             resetGalery(refs.containerGalery)
//             Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")

//         } else if (hits.length > 0) {
//             Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`)

//             const markupCard = `
//             ${hits.map(createCard).join('')}
            
//              `
//             refs.containerGalery.insertAdjacentHTML('beforeend', markupCard)
//             refs.button.classList.remove('hidden') 
            

//             const lightbox = new SimpleLightbox('.photo-link', {
//                 captionsData: 'alt',
//                 captionDelay: 250,
//                 });

//         } else if (hits.length === totalHits) {
//             Notiflix.Notify.info("We're sorry, but you've reached the end of search results.")
//         }
//     }

