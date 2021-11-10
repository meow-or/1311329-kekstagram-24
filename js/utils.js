// const generateRandomNumber = function (init, fin) {
//   return Math.floor(Math.random() * (fin - init + 1)) + init;
// };

// const getRandomNumber = function (minNumber, maxNumber) {
//   if (minNumber < 0 || maxNumber < 0) {
//     throw new Error('начало или конец диапазона не могут быть отрицательными');
//   }

//   const min = Math.ceil(minNumber);
//   const max = Math.floor(maxNumber);

//   return min > max
//     ? generateRandomNumber(max, min)
//     : generateRandomNumber(min, max);
// };

// const checkCommentLength = function (comment, maxLength) {
//   return comment.length <= maxLength;
// };

// checkCommentLength('Функция для проверки максимальной длины строки", 140');

// const createRandomIdFromRange = function (min, max) {
//   const previousValues = [];

//   return function () {
//     let currentValue = getRandomNumber(min, max);

//     if (previousValues.length >= max - min + 1) {
//       throw new Error(`Перебраны все числа из диапазона от ${min} до ${max}`);
//     }

//     while (previousValues.includes(currentValue)) {
//       currentValue = getRandomNumber(min, max);
//     }

//     previousValues.push(currentValue);

//     return currentValue;
//   };
// };
const ALERT_SHOW_TIME = 5000;

const isEscapeKey = (evt) => evt.key === 'Escape';

//close upload-form with success

const successMessageTemplate = document.querySelector('#success').content
  .querySelector('.success');
const successMessage = successMessageTemplate.cloneNode(true);

const closeSuccessPopupOnEsc = function (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    successMessage.remove();
  }
};

const showSuccess = function () {
  const successPopupBackground = 'success';
  const successButton = successMessage.querySelector('.success__button');

  successButton.addEventListener('click', () => successMessage.remove());
  successMessage.addEventListener('click', (evt) => {
    if (evt.target.classList.contains(successPopupBackground)) {
      successMessage.remove();
    }
  });
  document.addEventListener('keydown', closeSuccessPopupOnEsc);

  document.body.appendChild(successMessage);
};

// close upload-from with error

const errorMessageTemplate = document.querySelector('#error').content
  .querySelector('.error');
const errorMessage = errorMessageTemplate.cloneNode(true);

const closeErrorPopupOnEsc = function (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    errorMessage.remove();
  }
};

const showError = function () {
  const errorPopupBackground = 'error';
  const errorButton = errorMessage.querySelector('.error__button');

  errorButton.addEventListener('click', () => errorMessage.remove());
  errorMessage.addEventListener('click', (evt) => {
    if (evt.target.classList.contains(errorPopupBackground)) {
      errorMessage.remove();
    }
  });
  document.addEventListener('keydown', closeErrorPopupOnEsc);

  document.body.appendChild(errorMessage);
};

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '1.5em';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = '#e6c914';
  alertContainer.style.color = '#000';
  alertContainer.style.maxWidth = '1360px';
  alertContainer.style.margin = '0 auto';
  alertContainer.style.border = '2px dotted #000';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export { isEscapeKey, showSuccess, showError, showAlert };
