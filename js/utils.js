const generateRandomNumber = function (init, fin) {
  return Math.floor(Math.random() * (fin - init + 1)) + init;
};

const getRandomNumber = function (minNumber, maxNumber) {
  if (minNumber < 0 || maxNumber < 0) {
    throw new Error('начало или конец диапазона не могут быть отрицательными');
  }

  const min = Math.ceil(minNumber);
  const max = Math.floor(maxNumber);

  return min > max
    ? generateRandomNumber(max, min)
    : generateRandomNumber(min, max);
};

const checkCommentLength = function (comment, maxLength) {
  return comment.length <= maxLength;
};

checkCommentLength('Функция для проверки максимальной длины строки", 140');

const createRandomIdFromRange = function (min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomNumber(min, max);

    if (previousValues.length >= max - min + 1) {
      throw new Error(`Перебраны все числа из диапазона от ${min} до ${max}`);
    }

    while (previousValues.includes(currentValue)) {
      currentValue = getRandomNumber(min, max);
    }

    previousValues.push(currentValue);

    return currentValue;
  };
};

const isEscapeKey = (evt) => {
  return evt.key === 'Escape';
};

// const isEnterKey = (evt) => {
//   return evt.key === 'Enter';
// };

export { getRandomNumber, createRandomIdFromRange, isEscapeKey };
