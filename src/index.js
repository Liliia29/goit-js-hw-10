import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';
import { Notify }  from 'notiflix';
import debounce from 'lodash.debounce';



const search = document.querySelector('#search-box');
const list = document.querySelector('.country-list');
const InfoDiv = document.querySelector('.country-info');

const DEBOUNCE_DELAY = 300;
search.addEventListener('input', debounce (onSearch, DEBOUNCE_DELAY));

list.style.listStile = `none`;
list.style.paddingLeft = `0`;

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
                return Notify.info(
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
                Notify.failure('Oops, there is no country with that name');
            } else { 
                Notify.failure(`${Error.message}`);
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
        `<li><p>
        <img src="${svg}" alt="${alt}" style="margin-right: 10px;" width="40px" height="30px">${official}
        </p></li>`
    ) .join('');
};

function createContainer(arr){
    return arr 
    .map(
        ({name: {official}, capital, population, flags:{svg, alt}, languages,
        }) =>
        `<h2> <img src="${svg}" alt="${alt}"width="50px" height="40px"> <span class="text"></span> ${official}</h2>
        <p> <span class="text">Capital:</span> ${capital}</p>
        <p> <span class="text">Population:</span> ${population} people</p>
        <p> <span class="text">Languages:</span> ${Object.values(languages).join('')}</p>`

    ) .join('');

}

