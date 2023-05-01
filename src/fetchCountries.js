function fetchCountries(searchQuery) {
    return fetch(`https://restcountries.com/v3.1/name/${searchQuery}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Error fetching data');
      })
      .catch(error => {
        console.log(error);
      });
  }
  export { fetchCountries };
