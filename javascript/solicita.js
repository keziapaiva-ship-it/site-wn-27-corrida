async function salvarDestino() {
  const destino = document.getElementById("destino").value;

  if (!destino) {
    alert("Digite um destino");
    return;
  }

  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(destino)}`;
  const res = await fetch(url);
  const data = await res.json();

  if (!data.length) {
    alert("Destino inválido");
    return;
  }

  localStorage.setItem("destinoLat", data[0].lat);
  localStorage.setItem("destinoLon", data[0].lon);

}

function solicitarCorrida() {
  const btn = document.querySelector(".btn-calc");
  const origem = document.getElementById("origem").value;
  const destino = document.getElementById("destino").value;

  if (!origem || !destino) {
    alert("Por favor, preencha a origem e o destino.");
    return;
  }

  // Melhora: Feedback visual
  btn.innerText = "Calculando rota...";
  btn.style.opacity = "0.7";
  btn.disabled = true;

  localStorage.setItem("origem", origem);
  localStorage.setItem("destino", destino);

  setTimeout(() => {
    window.location.href = "/html/corrida.html";
  }, 800); // Um pequeno delay para o usuário sentir que algo foi processado
}

let timer;
async function buscarSugestoes(texto) {
  clearTimeout(timer); // Cancela a busca anterior se o usuário digitar rápido
  
  if (texto.length < 3) {
    document.getElementById("sugestoes").innerHTML = "";
    return;
  }

  timer = setTimeout(async () => {
    // ... aqui vai o resto do seu fetch atual ...
    console.log("Buscando:", texto);
  }, 500); // Espera 500ms após a última tecla
}







// 🎨 Animação de Fundo via JavaScript//
function animarFundo() {
    const body = document.body;

    // 1. Aplicamos o estilo básico do gradiente
    body.style.margin = "0";
    body.style.width = "100%";
    body.style.minHeight = "100vh";
    body.style.background = "linear-gradient(-45deg, #FF2D78, #f5a0c2, #ec9cbd, #ce587f)";
    body.style.backgroundSize = "400% 400%";
    body.style.backgroundAttachment = "fixed";

    // 2. Criamos a animação via código
    let posicao = 0;
    let subindo = true;

    // Essa função vai rodar a cada 30 milissegundos
    setInterval(() => {
        if (subindo) {
            posicao += 0.5; // Velocidade da animação
            if (posicao >= 100) subindo = false;
        } else {
            posicao -= 0.5;
            if (posicao <= 0) subindo = true;
        }
        
        // Atualiza a posição do fundo dinamicamente
        body.style.backgroundPosition = `${posicao}% 50%`;
    }, 30);
}

// Executa a função assim que a página carregar
window.onload = animarFundo;


document.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;
    
    // Isso cria um efeito de "luz" que segue o mouse
    document.body.style.background = `radial-gradient(circle at ${x}px ${y}px, #000000 0%, #050505 20%, #000000 50%, #ffffff 100%)`;
});