const CARDS_COUNT = 25;

const previewTemplate = document.querySelector('#picture').content
  .querySelector('.picture');

const previewsContainer = document.querySelector('.pictures');


const renderCards = (cards) => {
  const listOfPreviewsFragment = document.createDocumentFragment();
  console.log(cards);

  cards.forEach(({url, likes, comments}) => {
    const photoDescription = previewTemplate.cloneNode(true);

    photoDescription.querySelector('.picture__img').src = url;
    photoDescription.querySelector('.picture__likes').textContent = likes;
    photoDescription.querySelector('.picture__comments').textContent = comments.length;

    listOfPreviewsFragment.appendChild(photoDescription);
  });

  previewsContainer.appendChild(listOfPreviewsFragment);
};


const getRandomFilter = function () {

};

const getDefaultFilter = function () {

};

const getDiscussedFilter = function () {

};
/*
const renderCards = (cards) => {
  const listOfPreviewsFragment = document.createDocumentFragment();

  cards
    .slice()
    .sort(sortdiss)
    .slice(0, CARDS_COUNT)
    .forEach(({url, likes, comments}) => {
      const photoDescription = previewTemplate.cloneNode(true);

      photoDescription.querySelector('.picture__img').src = url;
      photoDescription.querySelector('.picture__likes').textContent = likes;
      photoDescription.querySelector('.picture__comments').textContent = comments.length;

      listOfPreviewsFragment.appendChild(photoDescription);
    });

  previewsContainer.innerHTML = '';
  previewsContainer.appendChild(listOfPreviewsFragment);
};
*/
export { renderCards };
