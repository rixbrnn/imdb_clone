function addMovie(movie) {
    axios.post('http://localhost:3000/movies',movie)
    .then(resp => {
        console.log(resp)
    })
    .catch(err => {
        console.log(err)
    })
}