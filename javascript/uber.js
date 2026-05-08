const motoristas = [
    { nome: "João Silva", placa: "ABC-1234" },
    { nome: "Carlos Lima", placa: "XYZ-9876" },
    { nome: "Pedro Santos", placa: "QWE-4567" }
];

function iniciarCorrida() {
    const m = motoristas[Math.floor(Math.random() * motoristas.length)];

    document.getElementById("nomeMotorista").innerText = m.nome;
    document.getElementById("placa").innerText = "Placa: " + m.placa;

    let tempo = 5;

    const intervalo = setInterval(() => {
        if (tempo <= 0) {
            document.getElementById("status").innerText = "Motorista chegou!";
            document.getElementById("tempo").innerText = "0 min";
            clearInterval(intervalo);
        } else {
            document.getElementById("tempo").innerText = tempo + " min";
            document.getElementById("status").innerText = "Motorista a caminho...";
            tempo--;
        }
    }, 1000);
}

iniciarCorrida();

