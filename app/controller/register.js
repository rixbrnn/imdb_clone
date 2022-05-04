function register() {

    console.log(document.getElementById("reglogin").value)
    console.log(document.getElementById("regpassword").value)
    axios.post('http://localhost:3000/users',
        {
            "id":`${document.getElementById("reglogin").value}`,
            "password": `${document.getElementById("regpassword").value}`

        }).then(resp => {
            console.log(resp.data);
            location.href = "..view/login.html"
        });

}