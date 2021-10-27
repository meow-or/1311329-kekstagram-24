import { listOfPhotoDescriptions } from './data.js';

const previewTemplate = document.querySelector('#picture').content
  .querySelector('.picture');

const previewsContainer = document.querySelector('.pictures');

const listOfPreviewsFragment = document.createDocumentFragment();

listOfPhotoDescriptions.forEach(({url, likes, comments}) => {
  const photoDescription = previewTemplate.cloneNode(true);

  photoDescription.querySelector('.picture__img').src = url;
  photoDescription.querySelector('.picture__likes').textContent = likes;
  photoDescription.querySelector('.picture__comments').textContent = comments.length;

  listOfPreviewsFragment.appendChild(photoDescription);
});

previewsContainer.appendChild(listOfPreviewsFragment);

export { previewsContainer };