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
let commentCounter;
// const loadMoreComments = document.querySelector('.comments-loader');

// function loadMoreComments () {
//   commentCounter += NUMBER_OF_LOADING_COMMENTS;
// }

function openPhotoPopup (evt, data) {
  fullSizePhotoContainer.classList.remove('hidden');
  document.body.classList.add('modal-open');

  closeFullPhotoButton.addEventListener('click', closePhotoPopup);
  document.addEventListener('keydown', closePhotoPopupOnEsc);
  // loadCommentsButton.addEventListener('click', () => {
  //   commentCounter += NUMBER_OF_LOADING_COMMENTS;
  // });

  fullSizePhoto.src = evt.target.src;
  fullSizePhoto.alt = evt.target.alt;

  data.forEach((item) => {

    if (evt.target.src.includes(item.url)) {
      photoCaption.textContent = item.description;
      commentsNumber.textContent = item.comments.length;
      likesNumber.textContent = item.likes;

      item.comments
        .slice(0, 5)
        .forEach(({avatar, message, name}) => {
          const photoComment = commentTemplate.cloneNode(true);

          photoComment.querySelector('.social__picture').src = avatar;
          photoComment.querySelector('.social__picture').alt = name;
          photoComment.querySelector('.social__text').textContent = message;

          listOfFullPhotoComments.appendChild(photoComment);
        });

      // if (item.comments.length <= NUMBER_OF_LOADING_COMMENTS) {
      //   commentCounter = item.comments.length;
      // }

      commentContainer.innerHTML = '';
      commentContainer.appendChild(listOfFullPhotoComments);

      //shownComments.textContent = `${commentCounter} из ${commentsNumber.textContent} комментариев`;
    }
  });
}

function closePhotoPopup () {
  fullSizePhotoContainer.classList.add('hidden');
  document.body.classList.remove('modal-open');

  closeFullPhotoButton.removeEventListener('click', closePhotoPopup);
  document.removeEventListener('keydown', closePhotoPopupOnEsc);
  //loadCommentsButton.removeEventListener('click', loadMoreComments);

}

function closePhotoPopupOnEsc (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
  }

  closePhotoPopup();
}

function openFullsizePhoto (previewsContainer, data) {
  // const listOfAddedPreviews = previewsContainer.querySelectorAll('.picture');
  // listOfAddedPreviews.forEach((preview) => {
  //   preview.addEventListener('click', (evt) => {
  //     openPhotoPopup(evt, data);
  //   });
  // });
  function onPreviewClick (evt) {
    if (evt.target.matches('.picture__img')) {
      openPhotoPopup(evt, data);
    }
  }

  previewsContainer.addEventListener('click', onPreviewClick);
}

export { openFullsizePhoto };
