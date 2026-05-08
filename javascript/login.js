const form = document.getElementById("loginForm");
const emailLogin = document.getElementById("emailLogin");
const senhaLogin = document.getElementById("senhaLogin");
const erro = document.getElementById("erro");



const user = JSON.parse(localStorage.getItem("usuarioLogado"));

if (user) {
    console.log("Usuário logado:", user.nome);
}

function logout() {
    localStorage.removeItem("usuarioLogado");
    location.href = "/html/index.html";
}



document.querySelector("form").addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    const usuario = {
        email: email,
        senha: senha
    };

    localStorage.setItem("usuario", JSON.stringify(usuario));

    alert("Cadastro realizado com sucesso!");

    window.location.href = "/html/login.html";
});





