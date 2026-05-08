const form = document.getElementById("loginForm");
const emailLogin = document.getElementById("emailLogin");
const senhaLogin = document.getElementById("senhaLogin");
const erro = document.getElementById("erro");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuario = usuarios.find(u =>
        u.email === emailLogin.value &&
        u.senha === senhaLogin.value
    );

    if (usuario) {
        alert("Login realizado com sucesso!");

        // salva usuário logado (sessão)
        localStorage.setItem("usuarioLogado", JSON.stringify(usuario));

        location.href = "/html/index.html";
    } else {
        erro.textContent = "E-mail ou senha incorretos.";
    }
});

const user = JSON.parse(localStorage.getItem("usuarioLogado"));

if (user) {
    console.log("Usuário logado:", user.nome);
}

function logout() {
    localStorage.removeItem("usuarioLogado");
    location.href = "/html/index.html";
}