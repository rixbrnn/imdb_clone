
function generateHeaderAndFooter() {
    const eHeaderTemplate = document.createElement("div");
    const eFooterTemplate = document.createElement("div");

    eHeaderTemplate.innerHTML = `
    <div id="header-content">  
        <div id="header-items">
            <a a href="/app/index.html" id="page-logo"> IMDb </a>
            <nav id="page-nav">
                <ul>
                    <li><a href="/app/index.html">HOME</a></li>
                    <li><a href="/app/view/movies.html">MOVIES</a></li>
                    <li><a href="/app/view/add_movie.html">ADD MOVIE</a></li>
                    <li><a href="/app/view/reviews.html">REVIEWS</a></li>
                    <li><a href="/app/view/login.html">LOGIN</a></li>
                </ul>
            </nav>
        </div>
    </div>
    `;

    eFooterTemplate.innerHTML = `
        <div> Web Development - Unisinos </div>
    `;

    document.querySelector("header").appendChild(eHeaderTemplate);
    document.querySelector("footer").appendChild(eFooterTemplate);
}

function onLoadHomePage() {
    generateHeaderAndFooter();
    onLoadHomePageMovies();
}

const sMovieLink = "./view/movie_details.html";
function onLoadHomePageMovies() {
    axios.get('http://localhost:3000/movies')
        .then(resp => {
            const eSection = document.createElement("section");
            eSection.classList.add("movies-section")
            resp.data?.forEach(oMovie => {
                const eArticle = document.createElement("div");
                eArticle.classList.add("poster-area");

                const eDiv = document.createElement("article");
                eDiv.classList.add("poster-content")
                
                const eImg = document.createElement("img");
                eImg.setAttribute("src", oMovie.image_url);
                eImg.setAttribute("onclick", `javascript:redirectForMoviePage(${oMovie.id})`);
                
                const eInfoButtonWrapper = document.createElement("span");
                eInfoButtonWrapper.classList.add("black-button-wrapper");

                const eInfoButtonLink = document.createElement("a");
                eInfoButtonLink.setAttribute("onclick", `redirectForMoviePage(${oMovie.id})`);
                eInfoButtonLink.setAttribute("href", sMovieLink)

                const eInfoButtonText = document.createElement("span");
                eInfoButtonText.textContent = "learn more"

                const ePosterBriefing = document.createElement("div");
                ePosterBriefing.classList.add("poster-briefing");

                const eReleaseDate = document.createElement("div");
                eReleaseDate.textContent = `Release date: ${oMovie.release_date}`;

                const eDirectorName = document.createElement("div");
                eDirectorName.textContent = `Director: ${oMovie.director}`;


                eArticle.appendChild(eDiv);
                eDiv.appendChild(eImg);
                eInfoButtonLink.appendChild(eInfoButtonText)
                eInfoButtonWrapper.appendChild(eInfoButtonLink);           
                ePosterBriefing.appendChild(eReleaseDate);
                ePosterBriefing.appendChild(eDirectorName);
                eDiv.appendChild(ePosterBriefing);
                eDiv.appendChild(eInfoButtonWrapper);
                eSection.appendChild(eArticle);
            });

            const oHomePage = document.getElementById("movies-page-content");
            oHomePage.appendChild(eSection);
        });
}

var logged = false;
var currentuser;

function redirectForMoviePage(sMovieId){
    localStorage.setItem("selectedMovie", sMovieId);
    window.location=sMovieLink;
}

/* exemplo de uso do Axios:
axios.post('http://localhost:3000/genres', {"foo":"bar"}).then(resp => {

    console.log(resp.data);
});

axios.get('http://localhost:3000/genres').then(resp => {

    console.log(resp.data);
}); */
