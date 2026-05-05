const map = L.map('map').setView([-25.4284, -49.2733], 13);

// mapa base
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Mapa'
}).addTo(map);

// 📍 pegar localização do usuário
function pegarLocalizacao() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        resolve([pos.coords.latitude, pos.coords.longitude]);
      },
      (err) => {
        alert("Ative a localização para continuar");
        reject(err);
      }
    );
  });
}

// 🌎 buscar coordenada do endereço
async function buscarCoordenada(endereco) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=br&q=${encodeURIComponent(endereco)}`;

  const res = await fetch(url, {
    headers: {
      "Accept-Language": "pt-BR"
    }
  });

  const data = await res.json();

  console.log("Busca:", data);

  if (!data || data.length === 0) {
    throw new Error("Endereço não encontrado");
  }

  return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
}

// 🚗 gerar rota
async function gerarRota() {
  try {
    document.getElementById("tempo").innerText = "⏱ Calculando...";

    const start = await pegarLocalizacao();

    // pega destino salvo
    const destinoTexto = localStorage.getItem("destino");

    if (!destinoTexto || destinoTexto.trim() === "") {
      alert("Destino não encontrado. Volte e digite novamente.");
      return;
    }

    const end = await buscarCoordenada(destinoTexto);

    const url = `https://router.project-osrm.org/route/v1/driving/${start[1]},${start[0]};${end[1]},${end[0]}?overview=full&geometries=geojson`;

    const res = await fetch(url);
    const data = await res.json();

    const coords = data.routes[0].geometry.coordinates;
    const path = coords.map(c => [c[1], c[0]]);

    // desenhar rota
    L.polyline(path, { color: "blue" }).addTo(map);
    map.fitBounds(path);

    // tempo estimado
    const minutos = Math.round(data.routes[0].duration / 60);
    document.getElementById("tempo").innerText = `⏱ ${minutos} minutos`;

    animarCarro(path);

  } catch (erro) {
    console.error(erro);
    alert("Erro ao gerar rota (destino inválido ou localização bloqueada)");
  }
}

// 🚙 animação do carro
function animarCarro(path) {
  let i = 0;

  const icon = L.icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/744/744465.png",
    iconSize: [40, 40]
  });

  const marker = L.marker(path[0], { icon }).addTo(map);

  function mover() {
    if (i < path.length) {
      marker.setLatLng(path[i]);
      i++;
      setTimeout(mover, 100);
    }
  }

  mover();
}

// ▶️ iniciar
gerarRota();