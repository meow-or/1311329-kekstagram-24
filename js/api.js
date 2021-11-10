const getData = (onSuccess, onFail) => {
  fetch('https://24.javascript.pages.academy/kekstagram/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        onFail('Не удалось получить данные. Попробуйте перезагрузить страницу');
      }
    })
    .then((cards) => {
      onSuccess(cards);
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://24.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body,
    },
  ).then((response) => {
    if (response.ok) {
      onSuccess();
    } else {
      onFail('Не удалось отправить форму. Попробуйте ещё раз');
    }
  })
    .catch(() => {
      onFail('Не удалось отправить форму. Попробуйте ещё раз');
    });

};

export {getData, sendData};
