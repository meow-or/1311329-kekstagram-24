
import  { renderCards, renderRandomCards, renderDiscussedCards } from './render-preview.js';
import './upload-form.js';
import { setDefaultFilter, setRandomFilter, setDiscussedFilter } from './upload-form.js';
import { getData } from './api.js';
import { debounce, showAlert } from './utils.js';

const imgFilters = document.querySelector('.img-filters');
const imgFiltersInactive = 'img-filters--inactive';

getData((cards) => {

  renderCards(cards);
  setDefaultFilter(debounce(() => renderCards(cards)));
  setRandomFilter(debounce(() => renderRandomCards(cards)));
  setDiscussedFilter(debounce(() => renderDiscussedCards(cards)));

  () => showAlert('Не удалось получить данные. Попробуйте перезагрузить страницу');
  imgFilters.classList.remove(imgFiltersInactive);
});

