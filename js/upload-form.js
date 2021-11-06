import { isEscapeKey } from './utils.js';

const MAX_COMMENT_LENGTH = 140;
const MAX_NUMBER_OF_HASHTAGS = 5;
const form = document.querySelector('.img-upload__form');
const uploadFileInput = document.querySelector('#upload-file');
const imgEditForm = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const closeEditFormButton = document.querySelector('#upload-cancel');
const scaleControlSmallerButton = document.querySelector('.scale__control--smaller');
const scaleControlBiggerButton = document.querySelector('.scale__control--bigger');
const scaleControlInputValue = document.querySelector('.scale__control--value');
const imgUploadPreview = document.querySelector('.img-upload__preview');
const listOfEffectButtons = document.querySelectorAll('.effects__radio');
const hashtagsInput = document.querySelector('.text__hashtags');
const commentTextarea = document.querySelector('.text__description');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const imgUploadBaseClass = 'img-upload__preview';
const effectLevelFieldset = document.querySelector('.effect-level');

noUiSlider.create(effectLevelSlider, {
  start: 100,
  connect: [true, false],
  step: 1,
  range: {
    'min': 0,
    'max': 100,
  },
});

const imgFilter = {
  none: () => {
    imgUploadPreview.style.filter = 'none';
  },
  chrome: () => {
    effectLevelSlider.noUiSlider.on('update', (values, handle) => {
      effectLevelValue.value = values[handle];
      imgUploadPreview.style.filter = `grayscale(${effectLevelValue.value})`;
    });

    effectLevelSlider.noUiSlider.updateOptions({
      start: 1,
      step: 0.1,
      range: {
        'min': 0,
        'max': 1,
      },
    });
  },
  sepia: () => {
    effectLevelSlider.noUiSlider.on('update', (values, handle) => {
      effectLevelValue.value = values[handle];
      imgUploadPreview.style.filter = `sepia(${effectLevelValue.value})`;
    });

    effectLevelSlider.noUiSlider.updateOptions({
      start: 1,
      step: 0.1,
      range: {
        'min': 0,
        'max': 1,
      },
    });
  },
  marvin: () => {
    effectLevelSlider.noUiSlider.on('update', (values, handle) => {
      effectLevelValue.value = values[handle];
      imgUploadPreview.style.filter = `invert(${effectLevelValue.value}%)`;
    });

    effectLevelSlider.noUiSlider.updateOptions({
      start: 100,
      step: 1,
      range: {
        'min': 0,
        'max': 100,
      },
    });
  },
  phobos: () => {
    effectLevelSlider.noUiSlider.on('update', (values, handle) => {
      effectLevelValue.value = values[handle];
      imgUploadPreview.style.filter = `blur(${effectLevelValue.value}px)`;
    });

    effectLevelSlider.noUiSlider.updateOptions({
      start: 3,
      step: 0.1,
      range: {
        'min': 0,
        'max': 3,
      },
    });
  },
  heat: () => {
    effectLevelSlider.noUiSlider.on('update', (values, handle) => {
      effectLevelValue.value = values[handle];
      imgUploadPreview.style.filter = `brightness(${effectLevelValue.value})`;
    });

    effectLevelSlider.noUiSlider.updateOptions({
      start: 3,
      step: 0.1,
      range: {
        'min': 0,
        'max': 3,
      },
    });
  },
};

const addFilter = function(evt) {
  imgUploadPreview.removeAttribute('class');
  imgUploadPreview.classList.add(imgUploadBaseClass);
  imgUploadPreview.classList.add(`effects__preview--${evt.target.value}`);
  effectLevelSlider.noUiSlider.set([100]);
  imgFilter[evt.target.value]();
};

// const removeFilter = function(evt) {
//   imgUploadPreview.classList.remove(`effects__preview--${evt.target.value}`);
// }

let scaleCounter = 100;

const scaleCountUp = function () {
  scaleCounter += 25;

  if(scaleCounter >= 100) {
    scaleCounter = 100;
    imgUploadPreview.style.transform = 'scale(1)';
    scaleControlInputValue.value = '100%';
  } else if (scaleCounter < 100) {
    scaleControlInputValue.value = `${scaleCounter}%`;
    imgUploadPreview.style.transform = `scale(.${scaleCounter})`;
  }
};

const scaleCountDown = function () {
  scaleCounter -= 25;

  if(scaleCounter <= 25) {
    scaleCounter = 25;
    imgUploadPreview.style.transform = 'scale(.25)';
    scaleControlInputValue.value = '25%';
  }
  scaleControlInputValue.value = `${scaleCounter}%`;
  imgUploadPreview.style.transform = `scale(.${scaleCounter})`;
};

const onImgEditFormEscKeydown = (evt) => {
  if(isEscapeKey(evt)) {
    evt.preventDefault();
    // eslint-disable-next-line no-use-before-define
    closeImgEditForm();
  }
};

const stopPropagationOnKeyDown = function(evt) {
  evt.stopPropagation();
};

const hashtagsInputValidation = function() {
  const listOfhashtags = hashtagsInput.value.toLowerCase().split(' ');
  const re = /^#[A-Za-zA-яА-яЁё0-9]{1,19}$/;

  const isHashtagRight = function(hashtag) {
    return re.test(hashtag) === true;
  };

  const isHashtagUniq = (arr) => {
    const set = new Set();
    for (const item of arr) {
      if (set.has(item)) {return false;}
      set.add(item);
    }
    return true;
  };

  if (hashtagsInput.value === '') {
    hashtagsInput.setCustomValidity('');
  } else if (!listOfhashtags.every(isHashtagRight)) {
    hashtagsInput.setCustomValidity('хэштег должен начинаться с #, состоять из латинских или русских букв и быть не длиннее 20 симв., включая #');
  } else if (listOfhashtags.length > MAX_NUMBER_OF_HASHTAGS) {
    hashtagsInput.setCustomValidity(`Можно добавить не более 5 хэштегов, удалите лишние ${ listOfhashtags.length - MAX_NUMBER_OF_HASHTAGS }`);
  } else if (!isHashtagUniq(listOfhashtags)) {
    hashtagsInput.setCustomValidity('Хэштеги не должны повторяться');
  } else {
    hashtagsInput.setCustomValidity('');
  }
  hashtagsInput.reportValidity();
};

const commentTextareaValidation = function() {
  const valueLength = commentTextarea.value.length;
  if (valueLength > MAX_COMMENT_LENGTH) {
    commentTextarea.setCustomValidity(`Удалите лишние ${ valueLength - MAX_COMMENT_LENGTH } симв.`);
  } else {
    commentTextarea.setCustomValidity('');
  }
  commentTextarea.reportValidity();
};

const openImgEditForm = function() {
  imgEditForm.classList.remove('hidden');
  body.classList.add('modal-open');
  effectLevelFieldset.classList.add('hidden');

  scaleControlBiggerButton.addEventListener('click', scaleCountUp);
  scaleControlSmallerButton.addEventListener('click', scaleCountDown);
  commentTextarea.addEventListener('keydown', stopPropagationOnKeyDown);
  hashtagsInput.addEventListener('keydown', stopPropagationOnKeyDown);
  commentTextarea.addEventListener('input', commentTextareaValidation);
  hashtagsInput.addEventListener('input', hashtagsInputValidation);
  document.addEventListener('keydown', onImgEditFormEscKeydown);

  listOfEffectButtons.forEach((effectButton) => {
    effectButton.addEventListener('click', (evt) => {
      if(evt.target.value === 'none') {
        effectLevelFieldset.classList.add('hidden');
      } else {
        effectLevelFieldset.classList.remove('hidden');
      }
      addFilter(evt);
    });
  });
};

const closeImgEditForm = function() {
  imgEditForm.classList.add('hidden');
  body.classList.remove('modal-open');

  scaleControlBiggerButton.removeEventListener('click', scaleCountUp);
  scaleControlSmallerButton.removeEventListener('click', scaleCountDown);
  commentTextarea.removeEventListener('keydown', stopPropagationOnKeyDown);
  hashtagsInput.removeEventListener('keydown', stopPropagationOnKeyDown);
  commentTextarea.removeEventListener('input', commentTextareaValidation);
  hashtagsInput.removeEventListener('input', hashtagsInputValidation);
  document.removeEventListener('keydown', onImgEditFormEscKeydown);

  listOfEffectButtons.forEach((effectButton) => {
    effectButton.removeEventListener('click', (evt) => addFilter(evt));
  });

  imgUploadPreview.removeAttribute('class');
  imgUploadPreview.removeAttribute('style');

  form.reset();
  effectLevelSlider.noUiSlider.set([100]);
  uploadFileInput.removeEventListener('change', openImgEditForm);
};

uploadFileInput.addEventListener('change', openImgEditForm);
closeEditFormButton.addEventListener('click', closeImgEditForm);


