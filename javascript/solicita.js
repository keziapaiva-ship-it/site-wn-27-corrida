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

function irPagamento() {
  const origem = document.getElementById("origem").value;
  const destino = document.getElementById("destino").value;

  if (!origem || !destino) {
    alert("Preencha origem e destino");
    return;
  }

  localStorage.setItem("origem", origem);
  localStorage.setItem("destino", destino);

  window.location.href = "/html/pagamento.html";
}

function pegarGPS() {
  const origem = document.getElementById("origem");

  navigator.geolocation.getCurrentPosition(async (pos) => {

    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}&addressdetails=1`
      );

      const data = await res.json();
      const a = data.address || {};

      let rua = a.road || a.residential || a.pedestrian;
      const bairro = a.suburb || a.neighbourhood;
      const cidade = a.city || a.town || "Pinhais";

      // 🔥 remove número se vier
      if (rua) {
        rua = rua.replace(/\d+/g, "").trim();
      }

      if (rua) {
        origem.value = `${rua}, ${bairro || ""} - ${cidade}`;
      } else {
        origem.value = `Pinhais - PR`;
      }

    } catch (e) {
      origem.value = `Pinhais - PR`;
    }

  });
}

async function buscarSugestoes(texto) {
  const lista = document.getElementById("sugestoes");
  lista.innerHTML = "";

  if (texto.length < 3) return;

  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(texto)}&limit=5&countrycodes=br&viewbox=-49.30,-25.30,-49.00,-25.55&bounded=1`
    );

    const data = await res.json();

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
    console.log("Erro:", e);
  }
}
 