const kekstagramServer = 'https://24.javascript.pages.academy/kekstagram';

const getData = (onSuccess, onFail) => {
  fetch(`${kekstagramServer}/data`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then(onSuccess)
    .catch((err) => {
      onFail(err);
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    kekstagramServer,
    {
      method: 'POST',
      body,
    },
  ).then((response) => {
    if (response.ok) {
      onSuccess();
    } else {
      throw new Error(`${response.status} ${response.statusText}`);
    }
  })
    .catch((err) => {
      onFail(err);
    });

};

export {getData, sendData};
