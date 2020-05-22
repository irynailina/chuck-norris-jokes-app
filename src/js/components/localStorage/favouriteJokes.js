import storageMethods from './storageMethods';
import { currentJoke } from '../homePage/jokes';
import jokeTemplate from '../../../templates/joke.hbs';

let favouriteList = [];

export function addFavourite() {
  const jokes = storageMethods.load('jokes');
  if (jokes) {
    favouriteList.push(...jokes);
    if (favouriteList.find(joke => joke.id === currentJoke.id)) {
      favouriteList = favouriteList.filter(joke => joke.id !== currentJoke.id);
    } else favouriteList.push(currentJoke);
  } else favouriteList.push(currentJoke);
  storageMethods.save('jokes', favouriteList);
}

export function renderFavouriteJokes() {
  const localStorageJokesList = storageMethods.load('jokes');
  console.log(localStorageJokesList);
  if (localStorageJokesList.length > 0) {
    const markup = localStorageJokesList
      .map(joke => jokeTemplate(joke))
      .join('');
    const select = document.querySelector('.select');
    select.innerHTML = markup;
  }
}
