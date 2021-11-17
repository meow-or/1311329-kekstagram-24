import { isEscapeKey } from './utils.js';

const NUMBER_OF_LOADING_COMMENTS = 5;

const fullSizePhotoContainer = document.querySelector('.big-picture');
const closeFullPhotoButton = document.querySelector('.big-picture__cancel');
const loadCommentsButton = document.querySelector('.comments-loader');
const fullSizePhoto = fullSizePhotoContainer.querySelector('.big-picture__img img');
const commentsNumber = document.querySelector('.comments-count');
const likesNumber = document.querySelector('.likes-count');

const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
const commentContainer = document.querySelector('.social__comments');
const listOfFullPhotoComments = document.createDocumentFragment();
const photoCaption = document.querySelector('.social__caption');
const shownComments = document.querySelector('.social__comment-count');
const pictureClass = '.picture__img';
let commentCounter = NUMBER_OF_LOADING_COMMENTS;

function loadMoreComments (data) {
  commentCounter += NUMBER_OF_LOADING_COMMENTS;
  console.log(commentCounter);
  shownComments.textContent = `${commentCounter} из ${commentsNumber.textContent} комментариев`;
  renderComments(data.card);
}

function renderComments (card) {
  card.comments
    .slice(0, commentCounter)
    .forEach(({avatar, message, name}) => fillCardCommentsData ({avatar, message, name}));

  commentContainer.innerHTML = '';
  commentContainer.appendChild(listOfFullPhotoComments);
}


function fillCardCommentsData ({avatar, message, name}) {
  const photoComment = commentTemplate.cloneNode(true);

  photoComment.querySelector('.social__picture').src = avatar;
  photoComment.querySelector('.social__picture').alt = name;
  photoComment.querySelector('.social__text').textContent = message;

  listOfFullPhotoComments.appendChild(photoComment);
}

function fillCardData (evt, card) {

  if (evt.target.src.includes(card.url)) {
    photoCaption.textContent = card.description;
    commentsNumber.textContent = card.comments.length;
    likesNumber.textContent = card.likes;

    renderComments (card);
  }
}

function openPhotoPopup (evt, data) {
  fullSizePhotoContainer.classList.remove('hidden');
  document.body.classList.add('modal-open');

  closeFullPhotoButton.addEventListener('click', closePhotoPopup);
  document.addEventListener('keydown', closePhotoPopupOnEsc);
  loadCommentsButton.addEventListener('click', loadMoreComments);

  fullSizePhoto.src = evt.target.src;
  fullSizePhoto.alt = evt.target.alt;

  data.forEach((card) => fillCardData(evt, card));
}

function closePhotoPopup () {
  fullSizePhotoContainer.classList.add('hidden');
  document.body.classList.remove('modal-open');

  closeFullPhotoButton.removeEventListener('click', closePhotoPopup);
  document.removeEventListener('keydown', closePhotoPopupOnEsc);
  loadCommentsButton.removeEventListener('click', loadMoreComments);
  shownComments.textContent = `${NUMBER_OF_LOADING_COMMENTS} из ${commentsNumber.textContent} комментариев`;
  commentCounter = NUMBER_OF_LOADING_COMMENTS;
}

function closePhotoPopupOnEsc (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
  }

  closePhotoPopup();
}

function openFullsizePhoto (previewsContainer, data) {
  function onPreviewClick (evt) {
    if (evt.target.matches(pictureClass)) {
      openPhotoPopup(evt, data);
    }
  }
  previewsContainer.addEventListener('click', onPreviewClick);
}

export { openFullsizePhoto };
