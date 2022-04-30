axios.get('http://localhost:3000/movies')
.then(resp => {
    var movies = resp.data;
    setList(movies)
})
.catch(err => {
    console.log(err)
})

function setList(movies) {
    let list = "";
    movies.forEach(movie => {
        list += getCard(movie)
    }); 
    document.getElementById('listMovie').innerHTML = list;
}

function getCard(movie) {
    return (`<div class="cardMovie" id="movie_${movie.id}">
                ${createImage(movie.image_url)} 
                <div class="infoMovie">    
                    <div class="titleMovie">${createSpan(movie.title)}</div>
                    <div class="descriptionMovie">${createSpan(movie.description)}</div>
                </div>
            </div>`
    )
}

function createSpan(el) {
    return '<span>' + el + '</span>'
}

function createImage(el) {
    return `<img class="imgCard" src="${el}"/>`
}