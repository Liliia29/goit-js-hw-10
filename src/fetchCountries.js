function fetchCountries(name) {
  const BASE_URL = 'https://restcountries.com/v3.1';

  return fetch(
    `${BASE_URL}/name/${name}?fields=capital?fields=population?fields=languages?fields=flags?fields=name`
  ).then(response => {
    if (!response.ok) {
      if (response.status === 404) {
        return [];
      }
      throw new Error(response.status);
    }
    return response.json();
  });
}
export { fetchCountries };

// const fields = 'fields=name,capital,languages,population,flags';
// export const fetchCountries = async name => {
//   const response = await fetch(`${BASE_URL}/name/${name}?${fields}`);
//   if (!response.ok) {
//     if (response.status === 404) {
//       return [];
//     }
//     throw new Error(response.status);
//   }
//   return response.json();
// };
