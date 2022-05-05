
function register() {
    var reglogin = document.getElementById("reglogin");
    var regpassword = document.getElementById("regpassword");
    axios.post('http://localhost:3000/users',
        {
            "id": `${reglogin.value}`,
            "password": `${regpassword.value}`

        }).then(resp => {
            alert("Account has been created succeffuly");
            location.href = "../index.html"
        });

}