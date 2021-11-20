const MIN_NUMBER_OF_LOADING_COMMENTS = 0;
const NUMBER_OF_LOADING_COMMENTS = 5;

const fullSizePhotoContainer = document.querySelector('.big-picture');
const closeFullPhotoButton = document.querySelector('.big-picture__cancel');
const moreCommentsButton = document.querySelector('.comments-loader');
const fullSizePhoto = fullSizePhotoContainer.querySelector('.big-picture__img img');
const commentsNumber = document.querySelector('.comments-count');
const likesNumber = document.querySelector('.likes-count');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
const commentContainer = document.querySelector('.social__comments');
const shownComments = document.querySelector('.social__comment-count');
const listOfFullPhotoComments = document.createDocumentFragment();
const photoCaption = document.querySelector('.social__caption');
const pictureClass = '.picture__img';

let startComment = 0;
let finalComment = 5;
let comments;

function loadMoreComments () {
  startComment += NUMBER_OF_LOADING_COMMENTS;
  finalComment += NUMBER_OF_LOADING_COMMENTS;
  shownComments.textContent = `${finalComment} из ${commentsNumber.textContent} комментариев`;

  comments
    .slice(startComment, finalComment)
    .forEach(({avatar, message, name}) => fillCardCommentsData ({avatar, message, name}));

  commentContainer.appendChild(listOfFullPhotoComments);

  if (commentContainer.children.length >= comments.length) {
    shownComments.textContent = `${comments.length} из ${commentsNumber.textContent} комментариев`;
    moreCommentsButton.classList.add('hidden');
  }
}

function renderComments (card) {
  if (card.comments.length <= NUMBER_OF_LOADING_COMMENTS) {
    shownComments.textContent = `${card.comments.length} из ${commentsNumber.textContent} комментариев`;
    moreCommentsButton.classList.add('hidden');
  } else {
    moreCommentsButton.classList.remove('hidden');
    shownComments.textContent = `${NUMBER_OF_LOADING_COMMENTS} из ${commentsNumber.textContent} комментариев`;
  }

  comments = card.comments;

  card.comments
    .slice(MIN_NUMBER_OF_LOADING_COMMENTS, NUMBER_OF_LOADING_COMMENTS)
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
  document.addEventListener('keydown', escDownPhotoPopupHandler);
  moreCommentsButton.addEventListener('click', loadMoreComments);

  fullSizePhoto.src = evt.target.src;
  fullSizePhoto.alt = evt.target.alt;

  data.forEach((card) => fillCardData(evt, card));
}

function closePhotoPopup () {
  fullSizePhotoContainer.classList.add('hidden');
  document.body.classList.remove('modal-open');

  closeFullPhotoButton.removeEventListener('click', closePhotoPopup);
  document.removeEventListener('keydown', escDownPhotoPopupHandler);
  moreCommentsButton.removeEventListener('click', loadMoreComments);

  startComment = MIN_NUMBER_OF_LOADING_COMMENTS;
  finalComment = NUMBER_OF_LOADING_COMMENTS;
}

function escDownPhotoPopupHandler (evt) {
  if (evt.key !== 'Escape') {
    return;
  }

  closePhotoPopup();
}

function addPreviewClickHandler (previewsContainer, data) {
  function onPreviewClick (evt) {
    if (evt.target.matches(pictureClass)) {
      openPhotoPopup(evt, data);
    }
  }
  previewsContainer.addEventListener('click', onPreviewClick);
}

export { addPreviewClickHandler };
