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
