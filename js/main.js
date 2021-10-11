import { getRandomNumber, createRandomIdFromRange } from './utils.js';

const DESCRIPTIONS_COUNT = 25;
const MIN_COMMENTS_COUNT = 1;
const MAX_COMMENTS_COUNT = 5;
const MIN_AVATARS_COUNT = 1;
const MAX_AVATARS_COUNT = 6;
const MIN_SENTENCES_COUNT = 0;
const MAX_SENTENCES_COUNT = 5;
const MIN_NAMES_COUNT = 0;
const MAX_NAMES_COUNT = 5;
const MIN_COMMENT_ID = 1;
const MAX_COMMENT_ID = 999;
const MIN_DESCRIPTION_ID = 1;
const MAX_DESCRIPTION_ID = 25;
const MIN_PHOTO_NUMBER = 1;
const MAX_PHOTO_NUMBER = 25;
const MIN_LIKES_COUNT = 15;
const MAX_LIKES_COUNT = 200;

const comments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];
const names = ['Фёдор', 'Ольга', 'Николай', 'Евгений', 'Мария', 'Анна'];

const generateCommentId = createRandomIdFromRange( MIN_COMMENT_ID, MAX_COMMENT_ID );
const generateId = createRandomIdFromRange( MIN_DESCRIPTION_ID, MAX_DESCRIPTION_ID );
const generatePhotoId = createRandomIdFromRange( MIN_PHOTO_NUMBER, MAX_PHOTO_NUMBER );
const commentsCount = getRandomNumber(MIN_COMMENTS_COUNT, MAX_COMMENTS_COUNT);

const createComment = function () {
  return {
    id: generateCommentId(),
    avatar: `img/avatar-${getRandomNumber( MIN_AVATARS_COUNT, MAX_AVATARS_COUNT )}.svg`,
    message: comments[getRandomNumber( MIN_SENTENCES_COUNT, MAX_SENTENCES_COUNT )],
    name: names[getRandomNumber( MIN_NAMES_COUNT, MAX_NAMES_COUNT )],
  };
};

const listOfComments = Array.from({ length: commentsCount }, createComment);

const createPhotoDescription = function () {
  return {
    id: generateId(),
    url: `photos/${generatePhotoId()}.jpg`,
    description: 'some description',
    likes: getRandomNumber(MIN_LIKES_COUNT, MAX_LIKES_COUNT),
    comments: listOfComments,
  };
};

const listOfPhotoDescriptions = Array.from({ length: DESCRIPTIONS_COUNT }, createPhotoDescription);

listOfPhotoDescriptions;
