axios.get('http://localhost:3000/movies')
.then(resp => {
    console.log(resp.data);
})
.then(err => {
    console.log(err)
})