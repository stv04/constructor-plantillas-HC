const endpoint = "https://localhost:7000/Plantilla";

export async function crearPlantillaHist(formData) {
    if(formData.get("NU_PERMADJARCHIVO_PLHI") === "1") {
        formData.set("NU_PERMADJARCHIVO_PLHI", 1);
    } else {
        formData.set("NU_PERMADJARCHIVO_PLHI", 0);
    }

    const respuesta = await fetch(endpoint, {
        method: "POST",
        body: formData
    }).then(d => d.json())
    .catch(e => console.log(e));

    return respuesta;
}

export async function crearFinalidadHist(formData) {
    const respuesta = await fetch(endpoint + "/setFinalidad", {
        method: "POST",
        body: formData
    }).then(d => d.json())
    .catch(e => console.log(e));

    return respuesta;
}