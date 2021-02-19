import data from './data.js'
import { searchMovieByTitle, makeBgActive } from './helpers.js'

class MoviesApp {
  constructor(options) {
    const {
      root,
      searchInput,
      searchForm,
      yearHandler,
      yearSubmitter,
      yearBox,
      genreBox,
      genreSubmitter,
      genreHandler,
    } = options
    this.$tableEl = document.getElementById(root)
    this.$tbodyEl = this.$tableEl.querySelector('tbody')

    this.$searchInput = document.getElementById(searchInput)
    this.$searchForm = document.getElementById(searchForm)
    //this.yearHandler = yearHandler;
    this.$yearSubmitter = document.getElementById(yearSubmitter)
    this.$yearBox = document.getElementById(yearBox)
    this.$genreBox = document.getElementById(genreBox)
    this.$genreSubmitter = document.getElementById(genreSubmitter)
    //this.genreHandler = genreHandler;
  }

  createMovieEl(movie) {
    const { image, title, genre, year, id } = movie
    return `<tr data-id="${id}"><td><img src="${image}"></td><td>${title}</td><td>${genre}</td><td>${year}</td></tr>`
  }
  //year ve genre elementlerini oluştur.Tabloya doldur.Kaç tane oldugunu filterla length al.

  createYear(movie, amount) {
    console.log(movie)
    return `<div class="form-check"><input class="form-check-input" type="radio" name="year" id="${movie}"  value="${movie}">
                    <label class="form-check-label" for="${movie}">
                    ${movie} (${amount})
                    </label>
                </div>`
  }

  createGenre(movie, amount) {
    console.log(movie)
    return `<div class="form-check"><input class="form-check-input" type="checkbox" name="genre" id="${movie}"  value="${movie}">
                    <label class="form-check-label" for="${movie}">
                    ${movie}  (${amount})   
                    </label>
                </div>`
  }

  fillTable() {
    /* const moviesHTML = data.reduce((acc, cur) => {
            return acc + this.createMovieEl(cur);
        }, "");*/
    const moviesArr = data
      .map((movie) => {
        return this.createMovieEl(movie)
      })
      .join('')
    this.$tbodyEl.innerHTML = moviesArr
  }

  getYearFilters() {
    return document.querySelectorAll('input[name="year"]')
  }

  getGenreFilters() {
    return document.querySelectorAll('input[name="genre"]')
  }

  getDuplicateElementsLength(array, filteredElement) {
    return array.filter((element) => element === filteredElement).length
  }

  filterDuplicates(array) {
    return array.filter((element, index) => array.indexOf(element) === index)
  }

  fillYearFilterBox() {
    const years = data.map((movie) => movie.year)
    const filteredYears = this.filterDuplicates(years)
    filteredYears.forEach((filteredYear) => {
      const occurrence = this.getDuplicateElementsLength(years, filteredYear)
      const $yearEl = this.createYear(filteredYear, occurrence)
      //console.log($yearEl)
      //console.log(filteredYear)
      this.$yearBox.innerHTML += $yearEl
    })
  }

  fillGenreFilterBox() {
    const genres = data.map((movie) => movie.genre)
    const filteredGenres = this.filterDuplicates(genres)
    filteredGenres.forEach((filteredGenre) => {
      const occurrence = this.getDuplicateElementsLength(genres, filteredGenre)
      const $genreEl = this.createGenre(filteredGenre, occurrence)
      this.$genreBox.innerHTML += $genreEl
    })
  }

  reset() {
    this.$tbodyEl.querySelectorAll('tr').forEach((item) => {
      item.style.background = 'transparent'
    })
  }

  handleSearch() {
    this.$searchForm.addEventListener('submit', (event) => {
      event.preventDefault()
      this.reset()
      const searchValue = this.$searchInput.value
      const matchedMovies = data
        .filter((movie) => {
          return searchMovieByTitle(movie, searchValue)
        })
        .forEach(makeBgActive)
    })
  }

  handleYearFilter() {
    this.$yearSubmitter.addEventListener('click', () => {
      this.reset()
      const selectedYear = document.querySelector(`input[name="year"]:checked`).value
      const matchedMovies = data
        .filter((movie) => {
          return movie.year === selectedYear
        })
        .forEach(makeBgActive)
    })
  }

  handleGenreFilter() {
    this.$genreSubmitter.addEventListener('click', () => {
      this.reset()

      const selectedGenre = document.querySelectorAll(`input[name="genre"]:checked`)
      const values = [...selectedGenre].map((genre) => genre.value)

      const matchedMovies = data
        .filter((movie) => {
          return values.includes(movie.genre)
        })
        .forEach(makeBgActive)
    })
  }

  init() {
    this.fillTable()
    this.fillYearFilterBox()
    this.fillGenreFilterBox()
    this.handleSearch()
    this.handleYearFilter()
    this.handleGenreFilter()
  }
}

let myMoviesApp = new MoviesApp({
  root: 'movies-table',
  searchInput: 'searchInput',
  searchForm: 'searchForm',
  //yearHandler: "year",
  yearSubmitter: 'yearSubmitter',
  yearBox: 'yearBox',
  genreBox: 'genreBox',
  //genreHandler: "genre",
  genreSubmitter: 'genreSubmitter',
})

myMoviesApp.init()




