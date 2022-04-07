import { crearFinalidadHist, crearPlantillaHist } from "../grapesjs/adherenciaServices/plantillaHist.js";

listener("#btn_volver-crear_plantilla", "click", volverCrearPlantilla);
listener("#form-crear-plantilla", "submit", accederCrearPlantilla);

const constructor = el("#constructor");
const formularioCreacion = el("#ventana-configuraciones");

function listener(query, ev, fn) {
    document.querySelector(query)
    .addEventListener(ev, fn);
}

function el(q) {
    return document.querySelector(q);
}

function volverCrearPlantilla() {
    constructor.classList.add("d-none");
    formularioCreacion.classList.remove("d-none");
}

async function accederCrearPlantilla(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    
    // const finalidad = await crearFinalidadHist(formData);
    // console.log("Finalidad creada => ", finalidad);

    // const plantilla = await crearPlantillaHist(formData);
    // console.log("Plantilla creada => ", plantilla);

    constructor.classList.remove("d-none");
    formularioCreacion.classList.add("d-none");
}