import { isEscapeKey } from './utils.js';

const fullSizePhotoContainer = document.querySelector('.big-picture');
const closeFullPhotoButton = document.querySelector('.big-picture__cancel');
const fullSizePhoto = fullSizePhotoContainer.querySelector('.big-picture__img img');
const commentsNumber = document.querySelector('.comments-count');
const likesNumber = document.querySelector('.likes-count');

const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
const commentContainer = document.querySelector('.social__comments');
const listOfFullPhotoComments = document.createDocumentFragment();
const photoCaption = document.querySelector('.social__caption');
const shownComments = document.querySelector('.social__comment-count');
const loadMoreComments = document.querySelector('.comments-loader');

const closePhotoPopup = function () {
  fullSizePhotoContainer.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

const closePhotoPopupOnEsc = function (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
  }

  closePhotoPopup();
};

const openFullsizePhoto = function (previewsContainer, data) {
  const listOfAddedPreviews = previewsContainer.querySelectorAll('.picture');

  listOfAddedPreviews.forEach((preview) => {
    const openPhotoPopup = function (evt) {
      fullSizePhotoContainer.classList.remove('hidden');
      document.body.classList.add('modal-open');

      fullSizePhoto.src = evt.target.src;
      fullSizePhoto.alt = evt.target.alt;

      const fillCardData = function (card) {
        if (evt.target.src.includes(card.url)) {
          photoCaption.textContent = card.description;
          commentsNumber.textContent = card.comments.length;
          likesNumber.textContent = card.likes;

          card.comments.forEach(({avatar, message, name}) => {
            const photoComment = commentTemplate.cloneNode(true);

            photoComment.querySelector('.social__picture').src = avatar;
            photoComment.querySelector('.social__picture').alt = name;
            photoComment.querySelector('.social__text').textContent = message;

            listOfFullPhotoComments.appendChild(photoComment);
          });
        }
      };

      data.forEach((card) => {
        fillCardData(card);
      });

      commentContainer.innerHTML = '';
      commentContainer.appendChild(listOfFullPhotoComments);
    };

    preview.addEventListener('click', openPhotoPopup);
    closeFullPhotoButton.addEventListener('click', closePhotoPopup);
    document.addEventListener('keydown', closePhotoPopupOnEsc);

    shownComments.classList.add('hidden');
    loadMoreComments.classList.add('hidden');
  });
};

export { openFullsizePhoto };
