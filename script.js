const codigosValidos = ["69abd4abf577d7cfd6d370f146611fea", "XYZ789", "123456"];

function onScanSuccess(decodedText) {
  const divEstado = document.getElementById("status");
  const apiUrl = `https://674ef8f4bb559617b26d7b3b.mockapi.io/accesos/codigos/${decodedText}`;

  fetch(apiUrl)
    .then(response => {
      if (response.status === 404) {
        throw new Error('Not found');
      }
      return response.json();
    })
    .then(data => {
      divEstado.textContent = `Acceso permitido: ${decodedText}`;
      divEstado.className = "valid";
    })
    .catch(error => {
      if (error.message === 'Not found') {
        divEstado.textContent = `Acceso denegado: ${decodedText} no encontrado.`;
      } else {
        divEstado.textContent = `Error al validar el código: ${decodedText}`;
      }
      divEstado.className = "invalid";
      console.warn(`Error al validar el código: ${error}`);
    });
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
