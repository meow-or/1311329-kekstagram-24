
import { previewsContainer } from './render-preview.js';
import { getData } from './api.js';

const commentTemplate = document.querySelector('.social__comment');
const commentContainer = document.querySelector('.social__comments');
const listOfFullPhotoComments = document.createDocumentFragment();

const listOfAddedPreviews = previewsContainer.querySelectorAll('.picture');
const fullSizePhotoContainer = document.querySelector('.big-picture');
const fullSizePhoto = fullSizePhotoContainer.querySelector('.big-picture__img img');
const body = document.querySelector('body');
const shownComments = document.querySelector('.social__comment-count');
const commentsNumber = document.querySelector('.comments-count');
const likesNumber = document.querySelector('.likes-count');
const photoCaption = document.querySelector('.social__caption');
const loadMoreComments = document.querySelector('.comments-loader');
const closeFullPhotoButton = document.querySelector('.big-picture__cancel');

/*
listOfAddedPreviews.forEach((preview) => {
  const previewPhoto = preview.querySelector('.picture__img');
  const previewComments = preview.querySelector('.picture__comments');
  const previewLikes = preview.querySelector('.picture__likes');

  previewPhoto.addEventListener('click', () => {
    fullSizePhotoContainer.classList.remove('hidden');
    body.classList.add('modal-open');

    document.addEventListener('keydown', (evt) => {
      if(evt.key === 'Escape') {
        evt.preventDefault();
        fullSizePhotoContainer.classList.add('hidden');
        body.classList.remove('modal-open');
      }
    });

    closeFullPhotoButton.addEventListener('click', () => {
      fullSizePhotoContainer.classList.add('hidden');
      body.classList.remove('modal-open');
    });

    //пока что скрыть блоки загрузки и счета комментариев
    shownComments.classList.add('hidden');
    loadMoreComments.classList.add('hidden');

    listOfPhotoDescriptions.forEach(({url, description, likes, comments}) => {

      comments.forEach(({avatar, message, name}) => {
        const photoComment = commentTemplate.cloneNode(true);


        photoComment.querySelector('.social__picture').src = avatar;
        photoComment.querySelector('.social__picture').alt = name;
        photoComment.querySelector('.social__text').textContent = message;

        listOfFullPhotoComments.appendChild(photoComment);

      });

      commentContainer.innerHTML = '';
      commentContainer.appendChild(listOfFullPhotoComments);

      photoCaption.textContent = description;

    });

    fullSizePhoto.src = previewPhoto.src;
    fullSizePhoto.alt = previewPhoto.alt;

    commentsNumber.textContent = previewComments.textContent;
    likesNumber.textContent = previewLikes.textContent;
  });
});

*/
