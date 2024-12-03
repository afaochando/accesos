const codigosValidos = ["69abd4abf577d7cfd6d370f146611fea", "XYZ789", "123456"];

function onScanSuccess(decodedText) {
  const divEstado = document.getElementById("status");
  if (codigosValidos.includes(decodedText)) {
    divEstado.textContent = `Acceso permitido: ${decodedText}`;
    divEstado.className = "valid";
  } else {
    divEstado.textContent = `Acceso denegado: ${decodedText}`;
    divEstado.className = "invalid";
  }
}

function onScanFailure(error) {
  console.warn(`Error al escanear: ${error}`);
}

document.addEventListener("DOMContentLoaded", (event) => {
  const html5QrCode = new Html5Qrcode("reader");

  html5QrCode
    .start(
      { facingMode: "environment" },
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
      },
      onScanSuccess,
      onScanFailure
    )
    .catch((err) => {
      console.error("Error al iniciar el escaneo:", err);
    });
});
