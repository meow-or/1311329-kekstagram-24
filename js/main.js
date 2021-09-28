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

getRandomNumber(200, 15);

const checkCommentLength = function (comment, maxLength) {
  return comment.length <= maxLength;
};

checkCommentLength('Функция для проверки максимальной длины строки', 140);
