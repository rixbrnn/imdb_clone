
function generateHeaderAndFooter(){
    const headerTemplate = document.createElement("node");
    const footerTemplate = document.createElement("node");
    
    headerTemplate.innerHTML = `
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
    
    footerTemplate.innerHTML = `
        <h2> Desenvolvimento para a web - Unisinos </h2>
    `;
    
    document.querySelector("header").appendChild(headerTemplate);
    document.querySelector("footer").appendChild(footerTemplate);
}

function onLoadPage(){
    axios.get('http://localhost:3000/movies')
        .then(resp => {
        console.log(resp.data);
    });
}


/* exemplo de uso do Axios:
axios.post('http://localhost:3000/genres', {"foo":"bar"}).then(resp => {

    console.log(resp.data);
});

axios.get('http://localhost:3000/genres').then(resp => {

    console.log(resp.data);
}); */
