
function generateHeaderAndFooter() {
    const eHeaderTemplate = document.createElement("node");
    const eFooterTemplate = document.createElement("node");

    eHeaderTemplate.innerHTML = `
    <div id="box">  
        <h2 id="page-title"> IMDb </h2>
        <nav>
            <ul>
                <li><a href="/app/index.html">HOME</a></li>
                <li><a href="/app/view/movies.html">MOVIES</a></li>
                <li><a href="/app/view/add_movie.html">ADD MOVIE</a></li>
                <li><a href="/app/view/reviews.html">REVIEWS</a></li>
                <li><a href="/app/view/login.html">LOGIN</a></li>
            </ul>
        </nav>
    </div>
    `;

    eFooterTemplate.innerHTML = `
        <h2> Desenvolvimento para a web - Unisinos </h2>
    `;

    document.querySelector("header").appendChild(eHeaderTemplate);
    document.querySelector("footer").appendChild(eFooterTemplate);
}

function onLoadHomePage() {
    generateHeaderAndFooter();
    onLoadHomePageMovies();
}

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
                eArticle.appendChild(eDiv);

                const eImg = document.createElement("img");
                eImg.setAttribute("src", oMovie.image_url);

                eDiv.appendChild(eImg);
                eSection.appendChild(eArticle);
            });

            const oHomePage = document.getElementById("movies-grade");
            oHomePage.appendChild(eSection);
        });
}


/* exemplo de uso do Axios:
axios.post('http://localhost:3000/genres', {"foo":"bar"}).then(resp => {

    console.log(resp.data);
});

axios.get('http://localhost:3000/genres').then(resp => {

    console.log(resp.data);
}); */
