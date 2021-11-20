import { addPreviewClickHandler } from './render-fullsize-image.js';

const NUMBER_OF_RANDOM_CARDS = 10;
const START_OF_COUNT = 0;

const previewTemplate = document.querySelector('#picture').content
  .querySelector('.picture');

const previewsContainer = document.querySelector('.pictures');
const listOfPreviewsFragment = document.createDocumentFragment();

function clearPictureContainer () {
  const addedPictures = previewsContainer.querySelectorAll('.picture');
  addedPictures.forEach((picture) => picture.remove());
}

function addPhotoDescription ({url, likes, comments}) {
  const photoDescription = previewTemplate.cloneNode(true);

  photoDescription.querySelector('.picture__img').src = url;
  photoDescription.querySelector('.picture__likes').textContent = likes;
  photoDescription.querySelector('.picture__comments').textContent = comments.length;

  listOfPreviewsFragment.appendChild(photoDescription);
}

function renderCards (cards) {
  cards.forEach(({url, likes, comments}) => addPhotoDescription({url, likes, comments}));

  clearPictureContainer();
  previewsContainer.appendChild(listOfPreviewsFragment);

  addPreviewClickHandler(previewsContainer, cards);
}

function getRandomCard () {
  return Math.random() - 0.5;
}

function getCommentsLength (card) {
  const numberOfComments = card.comments.length ;

  return numberOfComments;
}

function compareCommentsNumber (prevCard, nextCard) {
  const prevNum = getCommentsLength(prevCard);
  const nextNum = getCommentsLength(nextCard);

  return nextNum - prevNum;
}

function renderRandomCards (cards) {
  cards
    .slice()
    .sort(getRandomCard)
    .slice(START_OF_COUNT, NUMBER_OF_RANDOM_CARDS)
    .forEach(({url, likes, comments}) => addPhotoDescription({url, likes, comments}));

  clearPictureContainer();
  previewsContainer.appendChild(listOfPreviewsFragment);

  addPreviewClickHandler(previewsContainer, cards);
}

function renderDiscussedCards (cards) {
  cards
    .slice()
    .sort(compareCommentsNumber)
    .forEach(({url, likes, comments}) => addPhotoDescription({url, likes, comments}));

  clearPictureContainer();
  previewsContainer.appendChild(listOfPreviewsFragment);

  addPreviewClickHandler(previewsContainer, cards);
}

export { previewsContainer, previewTemplate, renderCards, renderRandomCards, renderDiscussedCards };
