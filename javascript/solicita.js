
function verPrecos() {
  const origem = document.getElementById("origem").value;
  const destino = document.getElementById("destino").value;

  localStorage.setItem("origem", origem);
  localStorage.setItem("destino", destino);

  window.location.href = "/html/corrida.html";
}