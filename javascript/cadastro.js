const form = document.querySelector("form");

const nome = document.getElementById("nome");
const email = document.getElementById("email");
const telefone = document.getElementById("telefone");
const senha = document.getElementById("senha");
const confirmarSenha = document.getElementById("confirmacao-Senha");

function mostrarErro(msg) {
  alert(msg); // depois posso te ensinar versão mais bonita tipo card
}

function validarEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

function validarSenhaForte(senha) {
  // pelo menos 6 caracteres + 1 número
  return senha.length >= 6 && /\d/.test(senha);
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  // valida nome
  if (nome.value.trim().length < 3) {
    return mostrarErro("Digite um nome válido.");
  }

  // valida email
  if (!validarEmail(email.value)) {
    return mostrarErro("Digite um e-mail válido.");
  }

  // valida telefone
  const tel = telefone.value.replace(/\D/g, "");
  if (tel.length < 10) {
    return mostrarErro("Digite um telefone válido.");
  }


  // confirma senha
  if (senha.value !== confirmarSenha.value) {
    return mostrarErro("As senhas não coincidem.");
  }

  // loading fake (profissional)
  const btn = document.querySelector("button");
  btn.innerText = "Criando conta...";
  btn.disabled = true;


  setTimeout(() => {
    location.reload();
  }, 1000);
});


form.addEventListener("submit", function (e) {
    e.preventDefault();

    const dadosUsuario = {
        nome: nome.value,
        email: email.value,
        telefone: telefone.value,
        senha: senha.value
    };

    // salva no navegador
    localStorage.setItem("usuarioCadastro", JSON.stringify(dadosUsuario));

    alert("Cadastro salvo com sucesso!");

    // recarrega a página
    location.reload();
});

console.log(JSON.parse(localStorage.getItem("usuarioCadastro")));


function validarSenhas() {
    const senhaValor = senha.value;
    const confirmarValor = confirmarSenha.value;

    // valida senha forte
    if (senhaValor.length >= 6) {
        senha.classList.add("input-certo");
        senha.classList.remove("input-erro");
    } else {
        senha.classList.add("input-erro");
        senha.classList.remove("input-certo");
    }

    // valida confirmação
    if (confirmarValor.length > 0) {
        if (senhaValor === confirmarValor) {
            confirmarSenha.classList.add("input-certo");
            confirmarSenha.classList.remove("input-erro");
        } else {
            confirmarSenha.classList.add("input-erro");
            confirmarSenha.classList.remove("input-certo");
        }
    }
}

// eventos em tempo real
senha.addEventListener("input", validarSenhas);
confirmarSenha.addEventListener("input", validarSenhas);





//salvar dados do cliente//

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const cliente = {
        nome: nome.value,
        email: email.value,
        telefone: telefone.value,
        senha: senha.value
    };

    // pega lista de usuários já salvos
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // verifica se email já existe
    const existe = usuarios.find(u => u.email === cliente.email);

    if (existe) {
        alert("Esse e-mail já está cadastrado!");
        return;
    }

    // salva novo usuário
    usuarios.push(cliente);

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Cadastro realizado com sucesso!");

    location.reload();
});

console.log(JSON.parse(localStorage.getItem("clientes")));