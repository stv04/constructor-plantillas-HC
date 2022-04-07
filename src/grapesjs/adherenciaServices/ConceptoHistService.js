import { endPoint } from "./config.js";
const idSelectorConceptos = "lista-concepto_hist";

class ConceptoHist {
    constructor() {
        this.idSelectorConceptos = idSelectorConceptos;
    }

    async fetchConceptos() {
        const conceptos = await fetch(endPoint + "/getConceptos").then(d => d.json());
    
        this.conceptos = conceptos;
        return conceptos;
    }

    async listarConceptos(force) {
        if(force) this.conceptos = await this.fetchConceptos();

        const conceptos = this.conceptos || await this.fetchConceptos();
        const existingElement = (id) => document.getElementById(id);
    
        let optsEl = document.getElementById(idSelectorConceptos);
        
        if(existingElement(idSelectorConceptos) === null) {
            optsEl = document.createElement("datalist");
            optsEl.setAttribute("id", idSelectorConceptos);
            console.log(optsEl);
            document.querySelector("#gjs").appendChild(optsEl);
        }

        optsEl.innerHTML = "";
    
        conceptos.forEach(d => {
            const opt = document.createElement("option");
            opt.innerHTML = d.tX_TITULO_COHI;
            opt.value = d.nU_TIPO_COHI + "::" + d.nU_NUME_COHI + "::" + d.tX_TITULO_COHI;
            optsEl.appendChild(opt);
        });
    }

    unshift(obj) {
        this.conceptos.unshift(obj);
    }
}

export default new ConceptoHist();