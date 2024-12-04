import { createClient } from "@supabase/supabase-js";
import "./estilos.css";

const supabaseUrl = "https://yrprmkuygrgueumsqgcm.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlycHJta3V5Z3JndWV1bXNxZ2NtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMzMTAxOTQsImV4cCI6MjA0ODg4NjE5NH0.iWwtne8Gz5MwjoKFnQCwu93Rcxnk21HNYgPEPmPQ2Hc";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const validCodes = [
  "5f4dcc3b5aa765d61d8327deb882cf99",
  "d41d8cd98f00b204e9800998ecf8427e",
  "098f6bcd4621d373cade4e832627b4f6",
  "e99a18c428cb38d5f260853678922e03",
  "9d5ed678fe57bcca4bf1a6e1b3f1a47f",
];

function onScanSuccess(decodedText) {
  const statusDiv = document.getElementById("status");
  if (validCodes.includes(decodedText)) {
    statusDiv.textContent = `Acceso permitido: ${decodedText}`;
    statusDiv.className = "valid";
  } else {
    statusDiv.textContent = `Acceso denegado: ${decodedText}`;
    statusDiv.className = "invalid";
  }
}

function onScanFailure(error) {
  console.warn(`Error al escanear: ${error}`);
}

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

async function getEventoById(id) {
  const { data, error } = await supabase
    .from("afa_eventos_accesos")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error al obtener el evento:", error);
    return null;
  }

  if (!data) {
    console.log("No se encontró ningún evento con ese id");
    return null;
  }

  console.log("Evento obtenido:", data);
  return data;
}

document.addEventListener("DOMContentLoaded", (event) => {
  getAllEventos(); 
  getEventoById("kjsdhfkajlsdhfajksdhfiuwoeyriuqweyriq3u45847365"); 

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
