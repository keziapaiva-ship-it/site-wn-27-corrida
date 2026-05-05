const map = L.map('map').setView([-25.4284, -49.2733], 13); // Curitiba exemplo

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Mapa'
}).addTo(map);

const origem = localStorage.getItem("origem");
const destino = localStorage.getItem("destino");

// 🔥 aqui você precisaria converter endereço → coordenadas (vou simplificar)
async function buscarRota() {

  // EXEMPLO (substitua por geocoding depois)
  const start = [-25.4284, -49.2733];
  const end = [-25.4184, -49.2633];

  const url = `https://router.project-osrm.org/route/v1/driving/${start[1]},${start[0]};${end[1]},${end[0]}?overview=full&geometries=geojson`;

  const res = await fetch(url);
  const data = await res.json();

  const coords = data.routes[0].geometry.coordinates;

  const latlngs = coords.map(c => [c[1], c[0]]);

  // desenhar rota
  const rota = L.polyline(latlngs, { color: 'blue' }).addTo(map);

  map.fitBounds(rota.getBounds());

  // tempo estimado
  const minutos = Math.round(data.routes[0].duration / 60);
  document.getElementById("tempo").innerText =
    `Tempo estimado: ${minutos} minutos`;

  // 🚗 simular carro andando
  animarCarro(latlngs);
}

buscarRota();



let marker = null;

function animarCarro(path) {
  let i = 0;

  marker = L.marker(path[0]).addTo(map);

  function mover() {
    if (i < path.length) {
      marker.setLatLng(path[i]);
      i++;
      setTimeout(mover, 200); // velocidade do carro
    }
  }

  mover();
}

async function gerarRota() {

  // exemplo fixo (depois você troca por geocoding real)
  const start = [-25.4284, -49.2733];
  const end = [-25.4184, -49.2633];

  const url = `https://router.project-osrm.org/route/v1/driving/${start[1]},${start[0]};${end[1]},${end[0]}?overview=full&geometries=geojson`;

  const res = await fetch(url);
  const data = await res.json();

  const coords = data.routes[0].geometry.coordinates;

  const path = coords.map(c => [c[1], c[0]]);

  // desenha rota
  L.polyline(path, { color: "blue" }).addTo(map);

  map.fitBounds(path);

  return path;
}
let pathGlobal;

gerarRota().then((path) => {
  pathGlobal = path;
  iniciarSimulacao();
});

function iniciarSimulacao() {
  let i = 0;

  const icon = L.icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/744/744465.png",
    iconSize: [40, 40]
  });

  const marker = L.marker(pathGlobal[0], { icon }).addTo(map);

  function mover() {
    if (i < pathGlobal.length) {
      marker.setLatLng(pathGlobal[i]);
      i++;
      setTimeout(mover, 150);
    }
  }

  mover();
}

document.getElementById("tempo").innerText =
  `⏱ Calculando tempo...`;

  const minutos = Math.round(data.routes[0].duration / 60);

document.getElementById("tempo").innerText =
  `⏱ ${minutos} minutos`;



  function pegarLocalizacao() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        resolve([lat, lng]);
      },
      (erro) => {
        alert("Erro ao pegar localização");
        reject(erro);
      }
    );
  });
}

async function gerarRota() {

  const start = await pegarLocalizacao();
  const destinoTexto = localStorage.getItem("destino");

  const end = await buscarCoordenada(destinoTexto);

  const url = `https://router.project-osrm.org/route/v1/driving/${start[1]},${start[0]};${end[1]},${end[0]}?overview=full&geometries=geojson`;

  const res = await fetch(url);
  const data = await res.json();

  const coords = data.routes[0].geometry.coordinates;
  const path = coords.map(c => [c[1], c[0]]);

  L.polyline(path, { color: "blue" }).addTo(map);
  map.fitBounds(path);

  return path;
}

async function buscarCoordenada(endereco) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${endereco}`;
  const res = await fetch(url);
  const data = await res.json();

  return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
}

