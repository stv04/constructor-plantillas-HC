import { endPoint } from "./config.js";

class Plantillahist {
    constructor() {
        this.idPlantillaHist = 3390;
    }

    async crearPlantillaHist(formData) {
        if(formData.get("NU_PERMADJARCHIVO_PLHI") === "1") {
            formData.set("NU_PERMADJARCHIVO_PLHI", 1);
        } else {
            formData.set("NU_PERMADJARCHIVO_PLHI", 0);
        }
    
        const respuesta = await fetch(endPoint, {
            method: "POST",
            body: formData
        }).then(d => d.json())
        .catch(e => console.log(e));

        this.idPlantillaHist = respuesta.nU_NUME_PLHI;
    
        return respuesta;
    }
    
    async crearFinalidadHist(formData) {
        const respuesta = await fetch(endPoint + "/setFinalidad", {
            method: "POST",
            body: formData
        }).then(d => d.json())
        .catch(e => console.log(e));
    
        this.finalidadHist = respuesta.cD_CODI_FIN;
        return respuesta;
    }

    async relacionarPlantilla() {
        const body = JSON.stringify({
            "nU_FINA_PLHI": this.finalidadHist,
            "nU_NUME_PLHI_R": this.idPlantillaHist
        })
        const respuesta = await fetch(endPoint + "/relPlatillaHist", {
            method: "POST",
            headers: {
                "Content-Type": "Application/json"
            },
            body
        }).then(d => d.json())
        .catch(e => console.log(e));


        return respuesta;
    }
}

export default new Plantillahist();