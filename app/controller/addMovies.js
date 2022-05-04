function getLastId() {
    axios.get('http://localhost:3000/movies')
    .then(resp => {
        verifyLastId(resp.data)
    })
    .catch(err => {
        console.log(err)
    })
}


function verifyLastId(movies) {
    document.getElementById("id").value = movies.length
}

getLastId()

function postMovie() {
    const user = localStorage.getItem("currentuser"); 
    if (!user) {
        alert("Usuário não logado")
        return
    }
    alert(`usuario ${user}`)
    axios.post('http://localhost:3000/movies', 
        {
            "id":`${document.getElementById("id").value}`,
            "title":`${document.getElementById("title").value}`,
            "genre_ids":`${document.getElementById("genre").value}`,
            "description":`${document.getElementById("description").value}`,
            "image_url":`${document.getElementById("image_url").value}`,
            "youtube_url":`${document.getElementById("youtube_url").value}`,
            "pegi":`${document.getElementById("pegi").value}`,
            "release_date":`${document.getElementById("release_date").value}`,
            "creation_date":`${document.getElementById("creation_date").value}`,
            "creation_user":`${user}`,
            "director":`${document.getElementById("director").value}`
        }).then(resp => {
            console.log(resp.data);
            window.location.reload()
        });
}