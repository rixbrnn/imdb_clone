axios.get('http://localhost:3000/movies')
.then(resp => {
    var movies = resp.data;
    movies.forEach(movie => {
        displayMovies(movie)
    });
})
.then(err => {
    console.log(err)
})

function displayMovies(movie) {
    document.getElementById('idId').innerText = movie.id
    document.getElementById('idTitle').innerText = movie.title
    document.getElementById('idGenres').innerText = movie.genre_ids[0]
    document.getElementById('idDescription').innerText = movie.description
    document.getElementById('idImageUrl').innerText = movie.image_url
    document.getElementById('idYoutubeUrl').innerText = movie.youtube_url
    document.getElementById('idPegi').innerText = movie.pegi
    document.getElementById('idReleaseDate').innerText = movie.release_date
    document.getElementById('idCreationUser').innerText = movie.creation_user
    document.getElementById('idCreationDate').innerText = movie.creation_date
}