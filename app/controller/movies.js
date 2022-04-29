axios.get('http://localhost:3000/movies')
.then(resp => {
    var movies = resp.data;
    setList(movies)
})
.catch(err => {
    console.log(err)
})

function displayMovies(movie) {
    document.getElementById(`id_${movie.id}`).innerText = movie.id
    document.getElementById(`idTitle_${movie.id}`).innerText = movie.title
    document.getElementById(`idGenres_${movie.id}`).innerText = movie.genre_ids[0]
    document.getElementById(`idDescription_${movie.id}`).innerText = movie.description
    document.getElementById(`idImageUrl_${movie.id}`).innerText = movie.image_url
    document.getElementById(`idYoutubeUrl_${movie.id}`).innerText = movie.youtube_url
    document.getElementById(`idPegi_${movie.id}`).innerText = movie.pegi
    document.getElementById(`idReleaseDate_${movie.id}`).innerText = movie.release_date
    document.getElementById(`idCreationUser_${movie.id}`).innerText = movie.creation_user
    document.getElementById(`idCreationDate_${movie.id}`).innerText = movie.creation_date
}

//foreach
function setList(movies) {
    var list = "";
    movies.forEach(movie => {
        list += getCard(movie)
    }); 
    document.getElementById('listMovie').innerHTML = list;
}

function getCard(movie) {
    return `<div class="cardMovie" id="movie_${movie.id}">${createImage(movie.image_url)} ${createSpan(movie.title)}</div>`
}

function createSpan(el) {
    return '<span>' + el + '</span>'
}

function createImage(el) {
    return `<img class="imgCard" src="${el}"/>`
}