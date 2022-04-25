const headerTemplate = document.createElement("node");
const footerTemplate = document.createElement("node");

headerTemplate.innerHTML = `
<div id="box">  
    <h2 id="page-title"> IMDb </h2>
    <nav>
        <ul>
            <li><a href="index.html">HOME</a></li>
            <li><a href="movies.html">MOVIES</a></li>
            <li><a href="add_movie.html">ADD MOVIE</a></li>
            <li><a href="reviews.html">REVIEWS</a></li>
            <li><a href="login.html">LOGIN</a></li>
        </ul>
    </nav>
</div>
`;

footerTemplate.innerHTML = `
    <h2> Desenvolvimento para a web - Unisinos </h2>
`;

document.querySelector("header").appendChild(headerTemplate);
document.querySelector("footer").appendChild(footerTemplate);