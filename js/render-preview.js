import { openFullsizePhoto } from './render-fullsize-image.js';

const CARDS_COUNT = 25;
const startOfCount = CARDS_COUNT - 10;

const previewTemplate = document.querySelector('#picture').content
  .querySelector('.picture');

const previewsContainer = document.querySelector('.pictures');
const listOfPreviewsFragment = document.createDocumentFragment();

const clearPictureContainer = function () {
  const addedPictures = previewsContainer.querySelectorAll('.picture');
  addedPictures.forEach((picture) => picture.remove());
};

const addPhotoDescription = function ({url, likes, comments}) {
  const photoDescription = previewTemplate.cloneNode(true);

  photoDescription.querySelector('.picture__img').src = url;
  photoDescription.querySelector('.picture__likes').textContent = likes;
  photoDescription.querySelector('.picture__comments').textContent = comments.length;

  listOfPreviewsFragment.appendChild(photoDescription);
};


const renderCards = (cards) => {
  cards.forEach(({url, likes, comments}) => addPhotoDescription({url, likes, comments}));

  clearPictureContainer();
  previewsContainer.appendChild(listOfPreviewsFragment);

  openFullsizePhoto(previewsContainer, cards);
};

const getRandomCard = function() {
  return Math.random() - 0.5;
};

const getCommentsLength = function(card) {
  const numberOfComments = card.comments.length ;

  return numberOfComments;
};

const compareCommentsNumber = function(prevCard, nextCard) {
  const prevNum = getCommentsLength(prevCard);
  const nextNum = getCommentsLength(nextCard);

  return nextNum - prevNum;
};

const renderRandomCards = (cards) => {
  cards
    .slice()
    .sort(getRandomCard)
    .slice(startOfCount, CARDS_COUNT)
    .forEach(({url, likes, comments}) => addPhotoDescription({url, likes, comments}));

  clearPictureContainer();
  previewsContainer.appendChild(listOfPreviewsFragment);

  openFullsizePhoto(previewsContainer, cards);
};

const renderDiscussedCards = (cards) => {
  cards
    .slice()
    .sort(compareCommentsNumber)
    .slice(0, CARDS_COUNT)
    .forEach(({url, likes, comments}) => addPhotoDescription({url, likes, comments}));

  clearPictureContainer();
  previewsContainer.appendChild(listOfPreviewsFragment);

  openFullsizePhoto(previewsContainer, cards);
};

export { previewsContainer, previewTemplate, renderCards, renderRandomCards, renderDiscussedCards };
