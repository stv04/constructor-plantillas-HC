const endPoint = "https://localhost:7000/Plantilla";


class GrupoHist {
    async fetchGrupos() {
        const grupos = await fetch(endPoint + "/getGrupos").then(d => d.json());
    
        this.grupos = grupos;
        return grupos;
    }

    async listarGrupos(target) {
        const grupos = await this.fetchGrupos();
        const existingElement = (id) => document.getElementById(id);
    
        let optsEl = document.getElementById(idSelectorGrupos);
        
        if(existingElement(idSelectorGrupos) === null) {
            optsEl = document.createElement("datalist");
            optsEl.setAttribute("id", idSelectorGrupos);
            console.log(optsEl);
            document.body.appendChild(optsEl);
        }
    
        grupos.forEach(d => {
            const opt = document.createElement("option");
            opt.innerHTML = d.tX_TITULO_GRHI;
            opt.value = d.nU_NUME_GRHI + ":" + d.tX_TITULO_GRHI;
            optsEl.appendChild(opt);
        });
    
        const cambiador = document.querySelector("[list="+idSelectorGrupos+"]");
        cambiador.value= grupos[0].nU_NUME_GRHI + ":" + grupos[0].tX_TITULO_GRHI;
    
        target.firstChild.innerHTML = cambiador.value.split(":")[1];
    }

    unshiftGrupo(obj) {
        this.grupos.unshift(obj);
    }
}

export default new GrupoHist();