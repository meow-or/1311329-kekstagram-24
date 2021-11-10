import  { renderCards } from './render-preview.js';
import './upload-form.js';
import { getData } from './api.js';
import { showAlert } from './utils.js';

const CARDS_COUNT = 25;

getData(
  (cards) => renderCards(cards.slice(0, CARDS_COUNT)),
  () => showAlert('Не удалось получить данные. Попробуйте перезагрузить страницу'),
);

