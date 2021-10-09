
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

    if (previousValues.length >= (max - min + 1)) {
      throw new Error(`Перебраны все числа из диапазона от ${min} до ${max}`);
    }

    while (previousValues.includes(currentValue)) {
      currentValue = getRandomNumber(min, max);
    }

    previousValues.push(currentValue);

    return currentValue;
  };
};

const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = ['Фёдор', 'Ольга', 'Николай', 'Евгений', 'Мария', 'Анна'];
const commentsCount = getRandomNumber(1, 5);
const DESCRIPTIONS_COUNT = 25;
const generateCommentId = createRandomIdFromRange(1, 999);

const createComment = function () {
  return {
    id: generateCommentId(),
    avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
    message: COMMENTS[getRandomNumber(0, 5)],
    name: NAMES[getRandomNumber(0, 6)],
  };
};

const listOfComments = Array.from({ length: commentsCount }, createComment);

const generateId = createRandomIdFromRange(1, 25);
const generatePhotoId = createRandomIdFromRange(1, 25);

const createPhotoDescription = function () {
  return {
    id: generateId(),
    url: `photos/${generatePhotoId()}.jpg`,
    description: 'some description',
    likes: getRandomNumber(15, 200),
    comments: listOfComments,
  };
};

const listOfPhotoDescriptions = Array.from({ length: DESCRIPTIONS_COUNT }, createPhotoDescription);

listOfPhotoDescriptions[0]; //vs eslint

