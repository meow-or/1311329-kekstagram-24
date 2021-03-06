import { showSuccess, showError } from './utils.js';
import { sendData } from './api.js';

const MAX_COMMENT_LENGTH = 140;
const MAX_NUMBER_OF_HASHTAGS = 5;
const MIN_PICTURE_SIZE = 25;
const MAX_PICTURE_SIZE = 100;
const MAX_SLIDER_LEVEL = 100;
const STARTING_POSITION_OF_SLIDER = 100;

const form = document.querySelector('.img-upload__form');
const uploadFileInput = document.querySelector('#upload-file');
const imgEditForm = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const closeEditFormButton = document.querySelector('#upload-cancel');
const scaleControlSmallerButton = document.querySelector('.scale__control--smaller');
const scaleControlBiggerButton = document.querySelector('.scale__control--bigger');
const scaleControlInputValue = document.querySelector('.scale__control--value');
const imgUploadPreview = document.querySelector('.img-upload__preview img');
const listOfEffectButtons = document.querySelectorAll('.effects__radio');
const hashtagsInput = document.querySelector('.text__hashtags');
const commentTextarea = document.querySelector('.text__description');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const imgUploadBaseClass = 'img-upload__preview';
const effectLevelFieldset = document.querySelector('.effect-level');
const imgFiltersForm = document.querySelector('.img-filters__form');
const filterButtons = imgFiltersForm.querySelectorAll('.img-filters__button');
const activeFilterButtonClass = 'img-filters__button--active';
const defaultFilterClass = '#filter-default';
const randomFilterClass = '#filter-random';
const discussedFilterClass = '#filter-discussed';
const slider = noUiSlider.create(effectLevelSlider, {
  start: STARTING_POSITION_OF_SLIDER,
  connect: [true, false],
  step: 1,
  range: {
    'min': 0,
    'max': 100,
  },
});

const imgFilter = {
  none: () => imgUploadPreview.style.filter = 'none',

  chrome: () => {
    slider.on('update', (values, handle) => {
      effectLevelValue.value = values[handle];
      imgUploadPreview.style.filter = `grayscale(${effectLevelValue.value})`;
    });

    slider.updateOptions({
      start: 1,
      step: 0.1,
      range: {
        'min': 0,
        'max': 1,
      },
    });
  },

  sepia: () => {
    slider.on('update', (values, handle) => {
      effectLevelValue.value = values[handle];
      imgUploadPreview.style.filter = `sepia(${effectLevelValue.value})`;
    });

    slider.updateOptions({
      start: 1,
      step: 0.1,
      range: {
        'min': 0,
        'max': 1,
      },
    });
  },

  marvin: () => {
    slider.on('update', (values, handle) => {
      effectLevelValue.value = values[handle];
      imgUploadPreview.style.filter = `invert(${effectLevelValue.value}%)`;
    });

    slider.updateOptions({
      start: 100,
      step: 1,
      range: {
        'min': 0,
        'max': 100,
      },
    });
  },

  phobos: () => {
    slider.on('update', (values, handle) => {
      effectLevelValue.value = values[handle];
      imgUploadPreview.style.filter = `blur(${effectLevelValue.value}px)`;
    });

    slider.updateOptions({
      start: 3,
      step: 0.1,
      range: {
        'min': 0,
        'max': 3,
      },
    });
  },

  heat: () => {
    slider.on('update', (values, handle) => {
      effectLevelValue.value = values[handle];
      imgUploadPreview.style.filter = `brightness(${effectLevelValue.value})`;
    });

    slider.updateOptions({
      start: 3,
      step: 0.1,
      range: {
        'min': 0,
        'max': 3,
      },
    });
  },
};

function addFilter (evt) {
  imgUploadPreview.removeAttribute('class');
  imgUploadPreview.classList.add(imgUploadBaseClass);
  imgUploadPreview.classList.add(`effects__preview--${evt.target.value}`);
  slider.set([MAX_SLIDER_LEVEL]);
  imgFilter[evt.target.value]();
}

let scaleCounter = MAX_PICTURE_SIZE;

function onScaleCountUpButtonClick () {
  scaleCounter += MIN_PICTURE_SIZE;

  if(scaleCounter >= MAX_PICTURE_SIZE) {
    scaleCounter = MAX_PICTURE_SIZE;
    imgUploadPreview.style.transform = 'scale(1)';
    scaleControlInputValue.value = '100%';
  } else if (scaleCounter < MAX_PICTURE_SIZE) {
    scaleControlInputValue.value = `${scaleCounter}%`;
    imgUploadPreview.style.transform = `scale(.${scaleCounter})`;
  }
}

function onScaleCountDownButtonClick () {
  scaleCounter -= MIN_PICTURE_SIZE;

  if(scaleCounter <= MIN_PICTURE_SIZE) {
    scaleCounter = MIN_PICTURE_SIZE;
    imgUploadPreview.style.transform = 'scale(.25)';
    scaleControlInputValue.value = '25%';
  }

  scaleControlInputValue.value = `${scaleCounter}%`;
  imgUploadPreview.style.transform = `scale(.${scaleCounter})`;
}

function hashtagsInputValidationHandler () {
  const listOfhashtags = hashtagsInput.value.toLowerCase().split(' ');
  const re = /^#[A-Za-zA-????-??????0-9]{1,19}$/;

  function isHashtagRight (hashtag) {
    return re.test(hashtag);
  }

  function isHashtagUniq (arr) {
    const set = new Set();

    for (const item of arr) {
      if (set.has(item)) {
        return false;
      }

      set.add(item);
    }

    return true;
  }

  if (hashtagsInput.value === '') {
    hashtagsInput.setCustomValidity('');
  } else if (!listOfhashtags.every(isHashtagRight)) {
    hashtagsInput.setCustomValidity('???????????? ???????????? ???????????????????? ?? #, ???????????????? ???? ?????????????????? ?????? ?????????????? ???????? ?? ???????? ???? ?????????????? 20 ????????., ?????????????? #');
  } else if (listOfhashtags.length > MAX_NUMBER_OF_HASHTAGS) {
    hashtagsInput.setCustomValidity(`?????????? ???????????????? ???? ?????????? 5 ????????????????, ?????????????? ???????????? ${ listOfhashtags.length - MAX_NUMBER_OF_HASHTAGS }`);
  } else if (!isHashtagUniq(listOfhashtags)) {
    hashtagsInput.setCustomValidity('?????????????? ???? ???????????? ??????????????????????');
  } else {
    hashtagsInput.setCustomValidity('');
  }

  if (!hashtagsInput.validity.valid) {
    hashtagsInput.style.outlineColor = 'red';
    hashtagsInput.style.borderColor = 'red';
  } else {
    hashtagsInput.style.outlineColor = 'black';
    hashtagsInput.style.borderColor = 'black';
  }

  hashtagsInput.reportValidity();
}

function commentTextareaInputValidationHandler () {
  const valueLength = commentTextarea.value.length;

  if (valueLength > MAX_COMMENT_LENGTH) {
    commentTextarea.setCustomValidity(`?????????????? ???????????? ${ valueLength - MAX_COMMENT_LENGTH } ????????.`);
  } else {
    commentTextarea.setCustomValidity('');
  }

  if (!commentTextarea.validity.valid) {
    commentTextarea.style.outlineColor = 'red';
    commentTextarea.style.borderColor = 'red';
  } else {
    commentTextarea.style.outlineColor = 'black';
    commentTextarea.style.borderColor = 'black';
  }


  commentTextarea.reportValidity();
}

function onEffectButtonClick (evt) {
  if(evt.target.value === 'none') {
    effectLevelFieldset.classList.add('hidden');
  } else {
    effectLevelFieldset.classList.remove('hidden');
  }

  addFilter(evt);
}

function onUploadFormOpen () {
  imgEditForm.classList.remove('hidden');
  body.classList.add('modal-open');
  effectLevelFieldset.classList.add('hidden');

  closeEditFormButton.addEventListener('click', onUploadFormClose);
  scaleControlBiggerButton.addEventListener('click', onScaleCountUpButtonClick);
  scaleControlSmallerButton.addEventListener('click', onScaleCountDownButtonClick);
  commentTextarea.addEventListener('input', commentTextareaInputValidationHandler);
  hashtagsInput.addEventListener('input', hashtagsInputValidationHandler);
  document.addEventListener('keydown', escDownFormHandler);

  listOfEffectButtons.forEach((effectButton) => effectButton.addEventListener('click', onEffectButtonClick));
}

uploadFileInput.addEventListener('change', onUploadFormOpen);

function onUploadFormClose () {
  imgEditForm.classList.add('hidden');
  body.classList.remove('modal-open');

  closeEditFormButton.removeEventListener('click', onUploadFormClose);
  scaleControlBiggerButton.removeEventListener('click', onScaleCountUpButtonClick);
  scaleControlSmallerButton.removeEventListener('click', onScaleCountDownButtonClick);
  commentTextarea.removeEventListener('input', commentTextareaInputValidationHandler);
  hashtagsInput.removeEventListener('input', hashtagsInputValidationHandler);
  document.removeEventListener('keydown', escDownFormHandler);

  listOfEffectButtons.forEach((effectButton) => effectButton.removeEventListener('click', onEffectButtonClick));

  form.reset();
  slider.set([MAX_SLIDER_LEVEL]);
  imgUploadPreview.removeAttribute('class');
  imgUploadPreview.removeAttribute('style');

  scaleCounter = MAX_PICTURE_SIZE;
}

function escDownFormHandler (evt) {
  if (evt.key !== 'Escape') {
    return;
  } else if (commentTextarea === document.activeElement || hashtagsInput === document.activeElement) {
    return;
  }

  onUploadFormClose();
}

function closeFormOnSuccess () {
  onUploadFormClose();
  showSuccess();
}

function closeFormOnError () {
  onUploadFormClose();
  showError();
}

function deleteActiveFilterButtonClass () {
  filterButtons.forEach((button) => {
    button.classList.remove(activeFilterButtonClass);
  });
}
const DEBOUNCE_DELAY = 500;
let timeout;

function setRenderCallback (defaultCallback, randomCallback, discussedCallback) {

  function filterButtonClickHandler (evt) {
    if (evt.target.closest(defaultFilterClass)) {
      deleteActiveFilterButtonClass();
      evt.target.closest(defaultFilterClass).classList.add(activeFilterButtonClass);
      clearTimeout(timeout);
      timeout = setTimeout(() => setDefaultFilter(defaultCallback), DEBOUNCE_DELAY);

    } else if (evt.target.closest(randomFilterClass)) {
      deleteActiveFilterButtonClass();
      evt.target.closest(randomFilterClass).classList.add(activeFilterButtonClass);
      clearTimeout(timeout);
      timeout = setTimeout(() =>  setRandomFilter(randomCallback), DEBOUNCE_DELAY);

    } else if (evt.target.closest(discussedFilterClass)) {
      deleteActiveFilterButtonClass();
      evt.target.closest(discussedFilterClass).classList.add(activeFilterButtonClass);
      clearTimeout(timeout);
      timeout = setTimeout(() => setDiscussedFilter(discussedCallback), DEBOUNCE_DELAY);
    }
  }

  function setDefaultFilter (cb) {
    cb();
  }

  function setRandomFilter (cb) {
    cb();
  }

  function setDiscussedFilter (cb) {
    cb();
  }

  imgFiltersForm.addEventListener('click', filterButtonClickHandler);
}


function setUploadFormSubmit (onSuccess) {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      () => onSuccess(),
      () => closeFormOnError(),
      new FormData(evt.target),
    );
  });
}

setUploadFormSubmit(closeFormOnSuccess);

export { setRenderCallback };
