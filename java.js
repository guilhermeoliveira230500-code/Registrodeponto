// ======================
// ATUALIZAR HORÁRIO
// ======================
function atualizar() {
    const agora = new Date();

    document.getElementById("data").innerText =
        "Data: " + agora.toLocaleDateString("pt-BR", {
            day: "numeric",
            month: "long",
            year: "numeric"
        });

    document.getElementById("hora").innerText =
        "Hora: " + agora.toLocaleTimeString("pt-BR");

    const dia = agora.toLocaleDateString("pt-BR", { weekday: "long" });
    document.getElementById("dia").innerText =
        dia.charAt(0).toUpperCase() + dia.slice(1);

    const h = agora.getHours();
    let msg = "Boa noite!";
    if (h < 12) msg = "Bom dia!";
    else if (h < 18) msg = "Boa tarde!";
    document.getElementById("mensagem").innerText = msg;
}

// ======================
// CÂMERA
// ======================
let stream = null;

async function abrirCamera() {
    try {
        stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: "user" },
            audio: false
        });

        const video = document.getElementById("Camera");
        video.srcObject = stream;
        await video.play();
    } catch (err) {
        alert("Não foi possível acessar a câmera.\nVerifique as permissões.");
        console.error(err);
    }
}

function fecharCamera() {
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
        document.getElementById("Camera").srcObject = null;
        stream = null;
    }
}

function capturarFoto() {
    const video = document.getElementById("Camera");
    const canvas = document.getElementById("foto");
    const ctx = canvas.getContext("2d");

    if (!stream || video.videoWidth === 0) {
        alert("Abra a câmera primeiro!");
        return;
    }

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0);

    canvas.style.display = "block";
    alert("📷 Foto capturada com sucesso!");
}

// ======================
// BATER PONTO
// ======================
function baterPonto() {
    const canvas = document.getElementById("foto");

    if (canvas.width === 0) {
        alert("📷 Tire uma foto antes de bater o ponto!");
        return;
    }

    const agora = new Date();
    const data = agora.toLocaleDateString("pt-BR");
    const hora = agora.toLocaleTimeString("pt-BR");
    const tipo = document.getElementById("tipo").value;
    const mensagem = document.getElementById("textoMensagem").value || "Sem mensagem";

    const registro = document.getElementById("registro");
    registro.style.display = "block";
    registro.innerHTML = `
        <h3>✅ Ponto registrado com sucesso!</h3>
        <p><strong>📅 Data:</strong> ${data}</p>
        <p><strong>🕐 Hora:</strong> ${hora}</p>
        <p><strong>📌 Tipo:</strong> ${tipo}</p>
        <p><strong>💬 Mensagem:</strong> ${mensagem}</p>
        <p><strong>📷 Foto:</strong> Capturada</p>
    `;

    alert("✅ Ponto batido com sucesso!");
}

// Inicia
atualizar();
setInterval(atualizar, 1000);