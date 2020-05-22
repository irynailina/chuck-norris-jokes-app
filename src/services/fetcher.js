import axios from 'axios'

const baseURL = "https://api.chucknorris.io/jokes"
const random = "/random"
const unit = "?category="
const categoriesURL = "https://api.chucknorris.io/jokes/categories"
const search = "/search?query="

export const fetchRandomJoke = () => axios.get(baseURL + random)
export const fetchJokeByCategory = (category) => axios.get(baseURL + random + unit + category);
export const fetchCategories = () => axios.get(categoriesURL)
export const fetchQueryJoke = (query) => axios.get(baseURL + search + query)

