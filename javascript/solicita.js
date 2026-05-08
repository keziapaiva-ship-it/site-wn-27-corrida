
function confirmarViagem(){

  // pega seus inputs (ajuste os IDs se forem diferentes)
  const origem = document.getElementById("origem").value;
  const destino = document.getElementById("destino").value;

  // salva tudo
  localStorage.setItem("origem", origem);
  localStorage.setItem("destino", destino);

  // vai pro mapa
  window.location.href = "corriDA.html";
}



 // 🧪 TESTE API (opcional)
    fetch("https://nominatim.openstreetmap.org/search?format=json&q=Curitiba&limit=1")
      .then(r => r.json())
      .then(d => console.log("API OK:", d))
      .catch(e => console.log("ERRO API:", e));

    // 📍 GPS
    function pegarGPS() {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        try {
          const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`;

          const res = await fetch(url);
          const data = await res.json();

          document.getElementById("origem").value =
            data.display_name || "Local não encontrado";

        } catch (e) {
          console.log(e);
          alert("Erro GPS");
        }
      });
    }

    // 🔍 sugestões
    async function buscarSugestoes(texto) {
      if (texto.length < 3) return;

      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(texto)}&limit=5&countrycodes=br`
        );

        const data = await res.json();

        const lista = document.getElementById("sugestoes");
        lista.innerHTML = "";

        if (!data.length) return;

        data.forEach(item => {
          const li = document.createElement("li");
          li.innerText = item.display_name;

          li.onclick = () => {
            document.getElementById("destino").value = item.display_name;
            lista.innerHTML = "";
          };

          lista.appendChild(li);
        });

      } catch (e) {
        console.log("Erro API:", e);
      }
    }

    // 🚗 enviar corrida
    function solicitarCorrida() {
      const origem = document.getElementById("origem").value;
      const destino = document.getElementById("destino").value;

      if (!origem || !destino) {
        alert("Preencha tudo");
        return;
      }

      localStorage.setItem("origem", origem);
      localStorage.setItem("destino", destino);

      window.location.href = "/html/corrida.html";
    }

