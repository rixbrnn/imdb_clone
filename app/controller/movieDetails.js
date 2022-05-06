function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
      window.onload = func;
    }
    else {
      window.onload = function() {
       if (oldonload) {
        oldonload();
       }
       func();
     }
    }
  }

addLoadEvent(loadMovieDetails);

let emptyField = "";
const url = "http://localhost:3000/";

function postReview(review) {
    axios.post(url + "reviews", review)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}

function postUserReview(userReview) {
    axios.post(url + "user_review_movies", userReview)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}

function formatReviewContainer(sUserId, sMovieId) {
    let genresDomain = async () => {
        await axios.get(url + "user_review_movies")
            .then(res => { 
                const oReviews = res.data;
                let bReview = false;
                for(let i=0; i < oReviews.length; i++){
                    if(oReviews[i].user_id === sUserId && oReviews[i].movie_id === sMovieId){
                        bReview = true; 
                    }
                }

                let reviewContainer = document.getElementById("review_container");
                
                if(bReview){
                    reviewContainer.innerHTML = 
                    `<h2>Have you already reviewed this movie!!</h2>`

                } else {
                    reviewContainer.innerHTML = 
                    `<button type="button" id="submit_review" class="submit_review" onclick="getReviewForm()">
                        Carry out your review
                    </button>`
                }
             })
            .catch(err => console.log(err))
           };
    
    let result = genresDomain();
    return result;
}

let sGenreNames = '';
function formatGenres(nGenresIds){
    const genresDomainConsulta = async () => {
                
        await axios.get(url + "genres")
            .then(res => { 
                var genresDomain =  res.data;                
                for(let i=0; i < nGenresIds.length; i++){
                    for(let j=0; j < genresDomain.length; j++){
                        let oGenre = genresDomain[j];
                        if(oGenre.id == nGenresIds[i]){
                            if(i !== (nGenresIds.length - 1)){
                                sGenreNames = sGenreNames + oGenre.name + '/';
                            }else{
                                sGenreNames = sGenreNames + oGenre.name + '.';
                            }
                        }
                    }
                }
                    let sGenreHtml = `<p class="genre">Genre: ${sGenreNames}</p>`;

                    eGenreElement = document.getElementById("genre")
                    eGenreElement.innerHTML = sGenreHtml;
                    return sGenreNames;
             })
            .catch(err => console.log(err))
        };

    genresDomainConsulta();      
}

function loadMovieDetails(){
    let nSelectedMovieId = localStorage.getItem("selectedMovie")

    axios.get('http://localhost:3000/movies/' + nSelectedMovieId)
    .then(resp => {
        var oMovie = resp.data;

      let sMovieDetailsHtml =
    
        `<div class="details_container">
            <div class="details">
                <h3>${oMovie.title}</h3>
            </div>
        </div>

        <div class="details_container">

            <div class="details_poster">
                <div class="poster">
                    <img src=${oMovie.image_url}
                        alt="">
                </div>
            </div>

            <div class="details_trailer">
                <iframe src=${oMovie.youtube_url} title="YouTube video player" frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen></iframe>
            </div>
        </div>

        <div class="details_container">

        <div class="details_container_info">
            <ul class="separator">
                <li>
                    <div class="icon_container"><img class="icons" src="https://i.ibb.co/KLfH8vs/release-date.png" alt=""></div>
                    <p>${oMovie.release_date}</p>
                </li>
                <li>
                    <div class="icon_container"><img class="icons" src="https://i.ibb.co/jHnNxDV/director.png" alt=""></div>
                    <p>Director: ${oMovie.director}</p>
                </li>
                <li>
                    <div class="icon_container"><img class="icons" src="https://i.ibb.co/kyNQNmz/genre.png" alt=""></div>
                    <div id="genre"></div>
                </li>
                <li>
                    <div class="icon_container"><img class="icons" src="https://i.ibb.co/HBHK4S6/synopsis.png" alt=""></div>
                    <p>${oMovie.description}</p>
                </li>
            </ul>
        </div>
        </div>

        <div class="details_container">
            <div id="review_container"></div>
        </div>     
        </div>`;
        
        let eMoviePageElement = document.getElementById("moviePage");
        eMoviePageElement.innerHTML = sMovieDetailsHtml;

        formatGenres(oMovie.genre_ids);

        let sUserId = localStorage.getItem(currentuser);

        if(sUserId){
            formatReviewContainer(sUserId, oMovie.id);
        }
    })
    .catch(err => {
        console.log(err)
    })
}

var nRating = 0;
function getValorRating(nValueRating) {
    nRating = nValueRating;
}

async function submitReview() {
    emptyField = "";
    verifyEmptyField("title_rating") 
    verifyEmptyField("comment_rating") 

    if (emptyField != ""){
        alert(`Campos obrigatórios não preenchidos ${emptyField}`)
        return
    } 

    let sUserId = localStorage.getItem(currentuser);
    let nSelectedMovieId = localStorage.getItem("selectedMovie");

    var reviewRatingValue = nRating;
    nRating = 0;
    var reviewTitle = document.querySelector("#title_rating");
    var reviewComment = document.querySelector("#comment_rating");
    var reviewCurrentDate = getCurrentDate();

    var oReview = {
        id: generateId(5),
        rating: reviewRatingValue,
        title: reviewTitle.value,
        description: reviewComment.value,
        creation_date: reviewCurrentDate
    }

    postReview(oReview)

    var userReview = {
        id: generateId(5),
        review_id: oReview.id,
        user_id: sUserId,
        movie_id: nSelectedMovieId
    }

    postUserReview(userReview)

    let reviewSpace = document.getElementById("review_container")
    reviewSpace.innerHTML = "<h2>Thank you for your rating!!</h2>"
}

function getCurrentDate() {
    var oDate = new Date();
    var sDay = String(oDate.getDate()).padStart(2, '0');
    var sMounth = String(oDate.getMonth() + 1).padStart(2, '0');
    var sYear = oDate.getFullYear();
    let currentDate = sDay + '/' + sMounth + '/' + sYear;

    return currentDate;
}

function getReviewForm() {
    let sReviewForm = 
    `<div class="review_form">
        <h3>Carry out your review:</h3>
        <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
        <div id="star" class="stars">
            <input type="radio" id="cm_star-empty" name="fb" value="" checked />
            <label for="cm_star-1"><i class="fa"></i></label>
            <input type="radio" class="star" id="cm_star-1" onclick="getValorRating(1)" name="fb" value="1" />
            <label for="cm_star-2"><i class="fa"></i></label>
            <input type="radio" class="star" id="cm_star-2" onclick="getValorRating(2)" name="fb" value="2" />
            <label for="cm_star-3"><i class="fa"></i></label>
            <input type="radio" class="star" id="cm_star-3" onclick="getValorRating(3)" name="fb" value="3" />
            <label for="cm_star-4"><i class="fa"></i></label>
            <input type="radio" class="star" id="cm_star-4" onclick="getValorRating(4)" name="fb" value="4" />
            <label for="cm_star-5"><i class="fa"></i></label>
            <input type="radio" class="star" id="cm_star-5" onclick="getValorRating(5)" name="fb" value="5" />
        </div>
    </div>

    <div id="review_form" class="review_form">
        <div class="form__group field">
            <input id="title_rating" type="input" class="form__field" placeholder="Title of your review"
                required />
            <label for="name" class="form__label">Title of your review</label>
        </div>

        <div class="form__group field">
            <input id="comment_rating" type="input" class="form__field" placeholder="Comment of your review"
                required />
            <label for="name" class="form__label">Comment of your review</label>
        </div>  
    </div>

    <button type="button" id="submit_review" class="submit_review" onclick="submitReview()">Submit Review</button>`

    eReviewContainerElement = document.getElementById("review_container")
    eReviewContainerElement.innerHTML = sReviewForm;
}

function generateId(nSizeId) {
    var stringAleatoria = '';
    var caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < nSizeId; i++) {
        stringAleatoria += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return stringAleatoria;
}


function verifyEmptyField(field) {
    if (document.getElementById(field).value === "") {
        emptyField += `\n${field}`
    }
}
