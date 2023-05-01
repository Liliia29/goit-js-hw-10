import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';
import { Notiflix }  from 'notiflix';




const search = document.querySelector('#search-box');
const list = document.querySelector('.country-list');
const InfoDiv = document.querySelector('.country-info');

const DEBOUNCE_DELAY = 300;
search.addEventListener('input', debounce (onSearch, DEBOUNCE_DELAY));

function onSearch(evt){
    if (!evt.target.value.trim()){
        list.innerHTML = '';
        InfoDiv.innerHTML = '';
    }

    else {
        fetchCountries(evt.target.value.trim())
        .then(data => {
            console.log(data);
            if (data.length > 10){
                return Notiflix.info(
                    `Too many matches found. Please enter a more specific name.`
                );
            }

            if (data.length === 1){
                list.innerHTML = '';
                return (InfoDiv.innerHTML = createContainer(data));
            }

            if ((2 <= data.length) & (data.length <= 10)){
                InfoDiv.innerHTML = '';
                return (list.innerHTML = createList(data));
            }

        })

        .catch (err => {
            if (Error.status = 404){
                Notiflix.failure('Oops, there is no country with that name');
            } else { 
                Notiflix.failure(`${Error.message}`);
                list.innerHTML = '';
                InfoDiv.innerHTML = '';
            }

        });
    }
}

function createList(arr){
    return arr 
    .map(
        ({name: {official}, flags:{svg, alt},
        }) =>
        `<li><p><img src="${svg}" alt="${alt}" width="30px" height="20px">${official}</p></li>`
    ) .join('');
};

function createContainer(arr){
    return arr 
    .map(
        ({name: {official}, capital, population, flags:{svg, alt}, languages,
        }) =>
        `<img src="${svg}" alt="${alt}"width="50px" height="40px">
        <h2> <span class="text">Name:</span> ${official}</h2>
        <p> <span class="text">Population:</span> ${population} people</p>
        <p> <span class="text">Capital:</span> ${capital}</p>
        <p> <span class="text">Languages:</span> ${Object.values(languages).join('')}</p>`

    ) .join('');

}

