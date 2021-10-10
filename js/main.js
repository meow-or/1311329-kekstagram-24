import { COMMENTS, NAMES } from './data.js';
import { getRandomNumber, createRandomIdFromRange } from './util.js';

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

listOfPhotoDescriptions;
