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

    async guardadoParcial(editor) {
        const TX_CSS_TEMPAR = editor.getCss({avoidProtected: true});
        const TX_JS_TEMPAR = editor.getJs();
        const TX_HTML_TEMPAR = editor.getHtml();
        const TX_JSON_TEMPAR = JSON.stringify(editor.getComponents());
        
        const guardado = {
          NU_NUME_PLHI_TEMPAR: this.idPlantillaHist,
          TX_JSON_TEMPAR,
          TX_HTML_TEMPAR,
          TX_CSS_TEMPAR,
          TX_JS_TEMPAR
        }

        console.log(guardado);
        return;
      
        const resp = await fetch(endPoint + "/plantillaTemporal", {
            method: "POST",
            headers: {
                "Content-Type": "Application/json"
            },
            body: JSON.stringify(guardado)
        }).then(d => d.json());

        if(resp.ok) {
            console.log(resp.message);
        } else {
            console.log(resp);
            console.log(resp.message);
        }
    }
    
    async llenadoFormato(editor) {
        const formatoTemporal = await fetch(endPoint + "/plantillaTemporal?idPlantilla="+this.idPlantillaHist).then(d => d.json());

        if(!formatoTemporal.nU_NUME_PLHI_TEMPAR) {
            console.log(formatoTemporal);
        }

        const html = formatoTemporal.tX_HTML_TEMPAR;
        const css = formatoTemporal.tX_CSS_TEMPAR;
        const js = formatoTemporal.tX_JS_TEMPAR;
        const json = formatoTemporal.tX_JSON_TEMPAR;

        console.log(JSON.parse(json));

        editor.setStyle(css);
        editor.setComponents(JSON.parse(json))

        if(js) editor.setComponents("<script>" + js + "</script>");
    }

    async listarArchivos() {
        const archivos = await fetch(endPoint + "/ListarArchivos").then(d => d.json());
        console.log(archivos);
    }

    async agregarArchivo() {
        const arch = await fetch(endPoint + "/ListarArchivos").then(d => d.json());
    }

    
}

export default new Plantillahist();