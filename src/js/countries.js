var debounce = require('lodash.debounce');
import fetchCountries from './fetchCountries.js';
import refs from './refs.js';
import countryCard from '../tamplates/tamplates.hbs';
import countryLiest from '../tamplates/manyCountries.hbs';
const { input, list,item } = refs;

import { alert, error, defaultModules } from '@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
defaultModules.set(PNotifyMobile, {});

input.addEventListener('input', debounce(onFetch, 500));
input.addEventListener('blur', () => {
  input.value='';
});
function onFetch(event) {
  const inputText = event.target.value;
  console.log(inputText);

  fetchCountries(inputText)
    .then(renderCountries)
    .catch(error => console.log(error));
}

function renderCountries(countries) {
  if (countries.length === 1) {
    const countryCardMarkup = countryCard(countries[0]);
    list.innerHTML = countryCardMarkup;
  } else if (countries.length > 10) {
    error({ text: 'Too many matches found. Please enter a more specific query!' });
  } else if (countries.status === 404) {
    error({ text: 'Nothing was found!' });
  } else {
    renderCountriesList(countries);
  }
}
function renderCountriesList(countries) {
  const countriesListMarkup = countryLiest(countries);
  list.innerHTML = countriesListMarkup;
  list.addEventListener('click', onChangeValueInput)
}

function onChangeValueInput(event) {
console.log(event.target);
if( event.target.nodeName==='LI'){
    input.value = event.target.textContent;
    fetchCountries(input.value)
    .then(renderCountries)
    .catch(error => console.log(error));
  return
}
}

