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
    alert("submit")
}