import { openFullsizePhoto } from './render-fullsize-image.js';

const CARDS_COUNT = 25;
const startOfCount = CARDS_COUNT - 10;

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

  openFullsizePhoto(previewsContainer, cards);
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
    .slice(startOfCount, CARDS_COUNT)
    .forEach(({url, likes, comments}) => addPhotoDescription({url, likes, comments}));

  clearPictureContainer();
  previewsContainer.appendChild(listOfPreviewsFragment);

  openFullsizePhoto(previewsContainer, cards);
}

function renderDiscussedCards (cards) {
  cards
    .slice()
    .sort(compareCommentsNumber)
    .slice(0, CARDS_COUNT)
    .forEach(({url, likes, comments}) => addPhotoDescription({url, likes, comments}));

  clearPictureContainer();
  previewsContainer.appendChild(listOfPreviewsFragment);

  openFullsizePhoto(previewsContainer, cards);
}

export { previewsContainer, previewTemplate, renderCards, renderRandomCards, renderDiscussedCards };
