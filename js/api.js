const kekstagramServer = 'https://24.javascript.pages.academy/kekstagram';

function getData (onSuccess, onFail) {
  fetch(`${kekstagramServer}/data`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then(onSuccess)
    .catch(onFail);
}

function sendData (onSuccess, onFail, body) {
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
    .catch(onFail);
}

export {getData, sendData};
