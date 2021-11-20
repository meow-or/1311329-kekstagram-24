const ALERT_SHOW_TIME = 5000;

// Функция взята из интернета и доработана
// Источник - https://www.freecodecamp.org/news/javascript-debounce-example

function debounce (callback, timeoutDelay = 500) {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл "поставить таймаут - удалить таймаут" будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
}

const successMessageTemplate = document.querySelector('#success').content
  .querySelector('.success');
const successMessage = successMessageTemplate.cloneNode(true);
const successPopupBackground = 'success';
const successButton = successMessage.querySelector('.success__button');

const errorMessageTemplate = document.querySelector('#error').content
  .querySelector('.error');
const errorMessage = errorMessageTemplate.cloneNode(true);
const errorPopupBackground = 'error';
const errorButton = errorMessage.querySelector('.error__button');

function escDownSuccessMessageHandler (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    successMessage.remove();
    successButton.removeEventListener('click', closeSuccessMessage);
    successMessage.removeEventListener('click', overlayClickSuccessMessageHandler);
    document.removeEventListener('keydown', escDownSuccessMessageHandler);
  }
}

function closeSuccessMessage () {
  successMessage.remove();
  successButton.removeEventListener('click', closeSuccessMessage);
  successMessage.removeEventListener('click', overlayClickSuccessMessageHandler);
  document.removeEventListener('keydown', escDownSuccessMessageHandler);
}

function closeErrorMessage () {
  errorMessage.remove();
  errorButton.removeEventListener('click', closeErrorMessage);
  errorMessage.removeEventListener('click', overlayClickErrorMessageHandler);
  document.removeEventListener('keydown', escDownErrorMessageHandler);
}

function overlayClickSuccessMessageHandler (evt) {
  if (evt.target.classList.contains(successPopupBackground)) {
    successMessage.remove();
    successButton.removeEventListener('click', closeSuccessMessage);
    successMessage.removeEventListener('click', overlayClickSuccessMessageHandler);
    document.removeEventListener('keydown', escDownSuccessMessageHandler);
  }
}

function overlayClickErrorMessageHandler (evt) {
  if (evt.target.classList.contains(errorPopupBackground)) {
    errorMessage.remove();
    errorButton.removeEventListener('click', closeErrorMessage);
    errorMessage.removeEventListener('click', overlayClickErrorMessageHandler);
    document.removeEventListener('keydown', escDownErrorMessageHandler);
  }
}

function showSuccess () {
  successButton.addEventListener('click', closeSuccessMessage);
  successMessage.addEventListener('click', overlayClickSuccessMessageHandler);
  document.addEventListener('keydown', escDownSuccessMessageHandler);

  document.body.appendChild(successMessage);
}

function escDownErrorMessageHandler (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    errorMessage.remove();
    errorButton.removeEventListener('click', closeErrorMessage);
    errorMessage.removeEventListener('click', overlayClickErrorMessageHandler);
    document.removeEventListener('keydown', escDownErrorMessageHandler);
  }
}

function showError () {
  errorButton.addEventListener('click', closeErrorMessage);
  errorMessage.addEventListener('click', overlayClickErrorMessageHandler);
  document.addEventListener('keydown', escDownErrorMessageHandler);

  document.body.appendChild(errorMessage);
}

function showAlert (message) {
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
}

export {
  debounce,
  showSuccess,
  showError,
  showAlert
};
