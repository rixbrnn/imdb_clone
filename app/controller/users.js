
// Variável para criação de html
const loginTemplate = document.createElement("node");

// Verifica se está ou não logado, para ver se insere o form de login, ou o form de logout
function verifyIntegrity() {
    if (localStorage.getItem(logged) == "false") {
        loginTemplate.innerHTML = '<form class="userform"><div class="div-wel">W E L C O M E</div><div class="form-group"><input type="text" id="username" name="username" placeholder="Username" class="i-form"></div><div class="form-group"><input type="password" id="password" name="password" placeholder="Password" class="i-form"><p class="register "onclick="gotoregister()">Register</p></div></form><div><button type="submit" id="login" name="login" class="button-login" onclick="userLogin()">Login</button></div>'
    } else {
        loginTemplate.innerHTML = '<form class="userform"><div class="div-wel">W E L C O M E, ' + localStorage.getItem(currentuser) + '</div><div><button type="submit" id="logout" name="logout" class="button-logout" onclick="log_out()">Logout</button></div>'
    }
}

// Pesquisa o banco de dados, para velidar o usuário e a senha
function userLogin() {
    axios.get('http://localhost:3000/users')
        .then(users => {
            console.log(users.data);
            users.data.forEach(users => authentication(users.id, users.password));
            if (localStorage.getItem(logged) == "false") {
                alert("User does not exist in database, please verify your username/password");
            }
        }
        )
        .then(err => {
            console.log(err);
        })
}

// Faz a autenticação dos dados inseridos, e indica se está ou não logado, redirecioando a página inicial
function authentication(userid, userpassword) {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    console.log(document.getElementById("username").value);
    if (localStorage.getItem(logged) != "true") {
        if (userid == username && userpassword == password) {
            localStorage.setItem(logged, true);
            localStorage.setItem(currentuser, userid);
            location.href = "../index.html"
        } else {
            localStorage.setItem(logged, false);

        }
    }

}

// Efetua o logout
function log_out() {
    localStorage.setItem(logged, false);
    localStorage.setItem(currentuser, "");
    location.href = "../index.html"
}


function gotoregister() {
    location.href = "../view/register.html"
}




// Execução inicial de criação do html
verifyIntegrity();
document.querySelector("login-format").appendChild(loginTemplate);
