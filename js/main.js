import  { renderCards } from './render-preview.js';
import './upload-form.js';
import { getData } from './api.js';
import { showAlert } from './utils.js';

//const CARDS_COUNT = 25;
const imgFilters = document.querySelector('.img-filters');
const imgFiltersInactive = 'img-filters--inactive';

getData(
  (cards) => renderCards(cards),
  () => showAlert('Не удалось получить данные. Попробуйте перезагрузить страницу'),
  imgFilters.classList.remove(imgFiltersInactive),
);


