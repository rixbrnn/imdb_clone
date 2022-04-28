var Json = require('../database/movies.json')

function listMovies () {
    Json.movies.forEach(movie => console.log(movie))
}

listMovies()