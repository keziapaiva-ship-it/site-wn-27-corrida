const form = document.getElementById("loginForm");
const emailLogin = document.getElementById("email");
const senhaLogin = document.getElementById("senha");
const erro = document.getElementById("erroLogin");



const user = JSON.parse(localStorage.getItem("usuarioLogado"));

if (user) {
    console.log("Usuário logado:", user.nome);
}

function logout() {
    localStorage.removeItem("usuarioLogado");
    location.href = "/html/solicitar.html";
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

    alert("Login realizado com sucesso!");

    window.location.href = "/html/solicitar.html";
});





