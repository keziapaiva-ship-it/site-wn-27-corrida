const map = L.map('map').setView([0,0], 2);

// mapa
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; OpenStreetMap'
}).addTo(map);

// pegar localização real
navigator.geolocation.getCurrentPosition(
  (pos) => {

    const lat = pos.coords.latitude;
    const lng = pos.coords.longitude;

    map.setView([lat, lng], 16);

    // marcador você
    L.marker([lat, lng])
      .addTo(map)
      .bindPopup("📍 Você está aqui")
      .openPopup();

    document.querySelector(".top").innerText = "📍 Sua localização";

  },
  (err) => {
    alert("Permita o acesso à localização!");
  }
);


const origem = localStorage.getItem("origem");
const destino = localStorage.getItem("destino");

// EXEMPLO (depois podemos trocar por API real de endereço)
const o = [-23.5505, -46.6333];
const d = [-23.5600, -46.6400];

// mapa
// API de rota REAL (OSRM - grátis)


// 📍 PINHAIS (origem)
const start = [-49.1927, -25.4443];

// 📍 CURITIBA (destino)
const end = [-49.2733, -25.4284];

// 🔥 rota real (ruas)
const url = `https://router.project-osrm.org/route/v1/driving/${start[0]},${start[1]};${end[0]},${end[1]}?overview=full&geometries=geojson`;

fetch(url)
  .then(res => res.json())
  .then(data => {

    const route = L.geoJSON(data.routes[0].geometry, {
      style: {
        color: "#ff4db8",
        weight: 5
      }
    }).addTo(map);

    map.fitBounds(route.getBounds());

  });

// 📍 marcadores
L.marker([start[1], start[0]]).addTo(map).bindPopup("📍 Pinhais");
L.marker([end[1], end[0]]).addTo(map).bindPopup("🏁 Curitiba");




