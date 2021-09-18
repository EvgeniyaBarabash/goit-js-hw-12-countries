const SEARCH_URL = 'https://restcountries.eu/rest/v2/name/';

export default function fetchCountries(searchQuery) {
  return fetch(`${SEARCH_URL}${searchQuery}`).then(res => res.json());
}