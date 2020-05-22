import {
  fetchRandomJoke,
  fetchJokeByCategory,
  fetchCategories,
  fetchQueryJoke,
} from '../../../services/fetcher';
import jokeTemplate from '../../../templates/joke.hbs';
import homePageTemplate from '../../../templates/homePageMarkup.hbs';
import { addFavourite } from '../localStorage/favouriteJokes';
import { renderFavouriteJokes } from '../localStorage/favouriteJokes';

const refs = {
  jokesList: document.querySelector('.jokes__list'),
  radioRandom: document.querySelector('.random'),
  radioCategories: document.querySelector('.categories'),
  radioSearch: document.querySelector('.search'),
  getJokeBtn: document.querySelector('.button'),
  categoriesList: document.querySelector('.categories__list'),
  categoriesListItem: document.querySelector('.categories__list_item'),
  searchInputWrap: document.querySelector('.searchInputWrap'),
  categoriesItem: document.querySelector('.categoriesItem'),
  favOpenImg: document.querySelector('.open-fav'),
  mainSection: document.querySelector('.select'),
  logo: document.querySelector('.logo'),
};

refs.getJokeBtn.addEventListener('click', handleShowJoke);
refs.radioCategories.addEventListener('input', handleGetCategories);
refs.radioSearch.addEventListener('input', handleShowSearchInput);
refs.jokesList.addEventListener('click', handleAddToFavourite);
refs.radioRandom.addEventListener('input', handleClear);
refs.favOpenImg.addEventListener('click', handleOpenFavourites);
refs.logo.addEventListener('click', renderHomePage);

export let currentJoke = {};

// random joke

function getRandomJoke() {
  fetchRandomJoke().then(response => {
    response.data.url.slice(0, 8);
    currentJoke = response.data;
    const markup = jokeTemplate(response.data);
    refs.jokesList.innerHTML = markup;
  });
}

function handleShowJoke() {
  refs.radioRandom.checked && getRandomJoke();
}

// categories joke

function handleGetCategories() {
  fetchCategories().then(response => {
    const markup = response.data
      .map(
        category =>
          `<li class="categories__list_item"><span class="categoriesItem">${category}</span></li>`,
      )
      .join('');
    refs.categoriesList.innerHTML = markup;
  });
  refs.categoriesList.addEventListener('click', handlePickCategory);
  refs.searchInputWrap.innerHTML = '';
}

function handlePickCategory(e) {
  if (e.target.nodeName === 'SPAN') {
    const category = e.target.textContent;
    const span = e.target.parentNode;
    span.classList.add('active');
    refs.getJokeBtn.addEventListener(
      'click',
      handleShowJokeFromCategory(category),
    );
  }
}

function handleShowJokeFromCategory(category) {
  fetchJokeByCategory(category).then(data => {
    currentJoke = data.data;
    const markup = jokeTemplate(data.data);
    refs.jokesList.innerHTML = markup;
  });
}

// search joke

function handleShowSearchInput() {
  const input = `<input class="searchInput" placeholder="free text search..." type="text">`;
  refs.searchInputWrap.innerHTML = input;
  const searchInput = document.querySelector('.searchInput');
  searchInput.addEventListener('change', searchJoke);
  refs.categoriesList.innerHTML = '';
}

function searchJoke(e) {
  const query = e.target.value;
  getJokeBySearch(query);
}

function getJokeBySearch(query) {
  fetchQueryJoke(query).then(data => {
    currentJoke = data.data.result;
    const joke = currentJoke.map(joke => jokeTemplate(joke)).join('');
    refs.jokesList.innerHTML = joke;
    refs.jokesList.addEventListener('click', handleAddToFavourite);
  });
}

function handleClear() {
  refs.categoriesList.innerHTML = '';
  refs.searchInputWrap.innerHTML = '';
}

// favourites

function handleAddToFavourite(e) {
  if (e.target.nodeName === 'BUTTON') {
    const button = document.querySelector('.heart');
    button.classList.add('heart-fill');
  }
}

function handleOpenFavourites() {
  renderFavouriteJokes();
  refs.favOpenImg.classList.add('close-fav');
  const closeFavImg = document.querySelector('.close-fav');
  closeFavImg.addEventListener('click', handleCloseFavourites);
}

function handleCloseFavourites() {
  const closeFavImg = document.querySelector('.close-fav');
  closeFavImg.classList.remove('close-fav');
  closeFavImg.classList.add('open-fav');
  renderHomePage();
}

function renderHomePage() {
  refs.mainSection.innerHTML = homePageTemplate();
  const jokeButton = document.querySelector('.button');
  const random = document.querySelector('.random');
  jokeButton.addEventListener('click', () => console.log(111));
}
