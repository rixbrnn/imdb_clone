const pageTemplate = document.createElement("node");
function readReviews() {
    //Get para tabela de R
    axios.get('http://localhost:3000/reviews')
        .then(respReview => {
            console.log(respReview.data);
            respReview.data.forEach(review => createList(review.title, review.rating, review.description, review.creation_date, review.id));
        })
        .then(err => {
            console.log(err);
        })

}


function createList(title, rating, description, date, id) {
    //Get para tabela de Review do usuário
    pageTemplate.innerHTML += "<div class='alinhamento'><header class='rev-header'><h3 class='title'><div class='title-align'>" + title + "</div><div class='date'>" + date + "</div></h3></header>" + "<div class='description'><div class='description-align'>" + description + "</div></div>" + "<div class='rating'>" + "Rate:" + rating + "<img class='imagem' src='https://pluginscreenshots.craft-cdn.com/star-ratings/_550xAUTO_crop_center-center_none/example-stars.png?1523835344'></div></div>";

}
readReviews();

document.querySelector("page").appendChild(pageTemplate);
