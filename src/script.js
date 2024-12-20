import { createClient } from "@supabase/supabase-js";
import "./estilos.css";

const supabaseUrl = "https://yrprmkuygrgueumsqgcm.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlycHJta3V5Z3JndWV1bXNxZ2NtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMzMTAxOTQsImV4cCI6MjA0ODg4NjE5NH0.iWwtne8Gz5MwjoKFnQCwu93Rcxnk21HNYgPEPmPQ2Hc";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

let ultimoAcceso = null;

async function onScanSuccess(decodedText) {
  if (ultimoAcceso == decodedText) {
    return;
  }

  const statusDiv = document.getElementById("status");
  const acceso = await getAccesoById(decodedText);

  ultimoAcceso = decodedText;

  if (acceso && acceso.id == decodedText && !acceso.acceso) {
    console.log(1);
    statusDiv.textContent = `Acceso permitido: ${decodedText}`;
    statusDiv.className = "valid";
  } else if (acceso && acceso.id == decodedText && acceso.acceso) {
    console.log(2);
    statusDiv.textContent = `Acceso previo: ${decodedText}`;
    statusDiv.className = "previousAccess";
  } else {
    console.log(3);
    statusDiv.textContent = `Acceso denegado: ${decodedText}`;
    statusDiv.className = "invalid";
  }

  setTimeout(() => {
    statusDiv.textContent = "";
    statusDiv.className = "";
  }, 1000);
}

function onScanFailure(error) {}

const html5QrCode = new Html5Qrcode("reader");

async function getAllEventos() {
  const { data, error } = await supabase
    .from("afa_eventos_accesos")
    .select("*");

  if (error) {
    console.error("Error al obtener los eventos:", error);
    return null;
  }

  console.log("Todos los eventos:", data);
  return data;
}

async function getAccesoById(id) {
  const { data, error } = await supabase
    .from("afa_eventos_accesos")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    //console.error("Error al obtener el evento:", error);
    return null;
  }

  if (!data) {
    //console.log("No se encontró ningún evento con ese id");
    return null;
  }

  return data;
}

document.addEventListener("DOMContentLoaded", (event) => {
  html5QrCode
    .start(
      { facingMode: "environment" },
      {
        fps: 10,
        qrbox: { width: 200, height: 200 },
      },
      onScanSuccess,
      onScanFailure
    )
    .catch((err) => {
      console.error("Error al iniciar el escaneo:", err);
    });
});
