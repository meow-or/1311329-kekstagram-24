import  { renderCards, renderRandomCards, renderDiscussedCards } from './render-preview.js';
import './upload-form.js';
import { setRenderCallback } from './upload-form.js';
import { getData } from './api.js';
import { showAlert } from './utils.js';

const imgFilters = document.querySelector('.img-filters');
const imgFiltersInactive = 'img-filters--inactive';

getData((cards) => {
  renderCards(cards);
  setRenderCallback(() => renderCards(cards), () => renderRandomCards(cards), () => renderDiscussedCards(cards));
  imgFilters.classList.remove(imgFiltersInactive);
},
() => showAlert('Не удалось получить данные. Попробуйте перезагрузить страницу'));

