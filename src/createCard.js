function createCard({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  return `<li class="photo-card">
              <a class="photo-link" href="${largeImageURL}">
                <img class="img"   style="display: block;" src="${webformatURL}"alt="${tags}" loading="lazy" /></a>
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
              </li> `;
}

export default createCard;
