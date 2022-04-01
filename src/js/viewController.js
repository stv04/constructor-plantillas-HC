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

function accederCrearPlantilla(e) {
    e.preventDefault();
    const plantillaCreada = {};

    const formData = new FormData(e.target);

    for (let ent of formData.entries()) {
        plantillaCreada[ent[0]] = ent[1];
    }

    plantillaCreada["CD_CODI_ESP_PLHI"] = "";
    plantillaCreada["NU_AUTO_ENPL_PLHI"] = 15;

    console.log(plantillaCreada);

    constructor.classList.remove("d-none");
    formularioCreacion.classList.add("d-none");
}