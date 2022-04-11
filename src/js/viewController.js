import { crearFinalidadHist, crearPlantillaHist } from "../grapesjs/adherenciaServices/plantillaHist.js";
import PlantillaHistService from "../grapesjs/adherenciaServices/PlantillaHistService.js";

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
    
    // const finalidad = await PlantillaHistService.crearFinalidadHist(formData);
    // console.log("Finalidad creada => ", finalidad);

    // const plantilla = await PlantillaHistService.crearPlantillaHist(formData);
    // console.log("Plantilla creada => ", plantilla);

    // const relacion = await PlantillaHistService.relacionarPlantilla();
    // console.log("Relacion => ", relacion);



    constructor.classList.remove("d-none");
    formularioCreacion.classList.add("d-none");
}