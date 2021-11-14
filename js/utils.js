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

// Функция взята из интернета и доработана
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_throttle

function throttle (callback, delayBetweenFrames) {
  // Используем замыкания, чтобы время "последнего кадра" навсегда приклеилось
  // к возвращаемой функции с условием, тогда мы его сможем перезаписывать
  let lastTime = 0;

  return (...rest) => {
    // Получаем текущую дату в миллисекундах,
    // чтобы можно было в дальнейшем
    // вычислять разницу между кадрами
    const now = new Date();

    // Если время между кадрами больше задержки,
    // вызываем наш колбэк и перезаписываем lastTime
    // временем "последнего кадра"
    if (now - lastTime >= delayBetweenFrames) {
      callback.apply(this, rest);
      lastTime = now;
    }
  };
}

const isEscapeKey = (evt) => evt.key === 'Escape';

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

export {
  debounce,
  throttle,
  isEscapeKey,
  showSuccess,
  showError,
  showAlert
};
