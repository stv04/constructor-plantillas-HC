import { endPoint } from "./config.js";
import PlantillaHistService from "./PlantillaHistService.js";
import { quitHash, convert_px_to_tw, getPropertiesRotulo} from "./utils.js";

const idSelectorGrupos = "lista-grupo_hist";

class GrupoHist {
    constructor () {
        this.idSelectorGrupos = idSelectorGrupos;
    }
    
    async fetchGrupos() {
        const grupos = await fetch(endPoint + "/getGrupos").then(d => d.json());
        this.grupos = grupos;
        return grupos;
    }

    async listarGrupos(force) {
        if(force) this.grupos = await this.fetchGrupos();
        const grupos = this.grupos || await this.fetchGrupos();
        const existingElement = (id) => document.getElementById(id);
    
        let optsEl = document.getElementById(idSelectorGrupos);
        
        if(existingElement(idSelectorGrupos) === null) {
            optsEl = document.createElement("datalist");
            optsEl.setAttribute("id", idSelectorGrupos);
            document.querySelector("#gjs").appendChild(optsEl);
        }

        optsEl.innerHTML = "";
    
        grupos.forEach(d => {
            const opt = document.createElement("option");
            opt.innerHTML = d.tX_TITULO_GRHI;
            opt.value = d.nU_NUME_GRHI + ":" + d.tX_TITULO_GRHI;
            optsEl.appendChild(opt);
        });
    
        // const cambiador = document.querySelector("[list="+idSelectorGrupos+"]");
        // cambiador.value= grupos[0].nU_NUME_GRHI + ":" + grupos[0].tX_TITULO_GRHI;

        // console.log(target);
        // target.view.el.firstChild.innerHTML = cambiador.value.split(":")[1];
    }

    async crearGrupo(formData) {
        const grupoCreado = await fetch(endPoint + "/createGrupo", {
            method: "POST",
            body: formData
        }).then( d => {
            if(!d.ok) return d.text();
            return d.json();
        })
        .catch(e => console.log(e));

        if(typeof grupoCreado === "object") {
            this.unshift(grupoCreado);
        }

        return grupoCreado;
    }

    async actualizarGrupo(formData) {
        const grupoCreado = await fetch(endPoint + "/updateGrupo", {
            method: "PUT",
            body: formData
        }).then( d => {
            if(!d.ok) return d.text();
            return d.json();
        });

        return grupoCreado;
    }

    async crearR_plan_grup(component) {
        const style = component.style;
        const {top, left, height, width, border} = component.style;
        const backgroundColor = style["background-color"];
        const grupoHeredado = 2101;
        const plantilla = PlantillaHistService.idPlantillaHist;
      
        let [
          TX_HXCOLORROTULO_RPG, TX_HXCOLORLETRA_RPG, NU_ROTULOTOTALANCHO_RPG, 
          NU_ALINEAROTULO_RPG, NU_ROTULOPERPEN_RPG, NU_ROTULOVISIBLE_RPG,
          NU_NEGRILLA_RPG, NU_ALINEAROTULOVERTICAL_RPG, NU_TAMFUENTE_RPG
        ] = getPropertiesRotulo(component.rotulo);
       
      
        let initialTop = convert_px_to_tw(top) || 0;
        let initialLeft = convert_px_to_tw(left) || 0;
        let borderConverted = border ? "1;1;1;1" : "0;0;0;0";
      
        const toSend = {
          "NU_NUME_PLHI_RPG": plantilla,
          "NU_NUME_GRHI_RPG": component.idGrupoDB,
          "NU_INDI_RPG": component.sort,
          "NU_INGR_RPG": component.parent,
          "NU_NUGR_RPG": component.idGrupoParentDB,
      
          "NU_TOP_RPG": initialTop + 3000, // "posicion y (min:3000)",
          "NU_LEFT_RPG": initialLeft + 1000, // "posicion x (min: 1000)",
          "NU_HEIGHT_RPG": convert_px_to_tw(height) || 1000,
          "NU_WIDTH_RPG": convert_px_to_tw(width) || 12000,
          "TX_BORDES_RPG": borderConverted, //"bordes (1;0;0;0) (izq;top;der;inferior)",
          TX_HXCOLORROTULO_RPG, //: "fondo rotulo",
          TX_HXCOLORLETRA_RPG, // "color letra rotulo",
          NU_ROTULOTOTALANCHO_RPG, // "Si el rotulo abarca todo el ancho:bool",
          NU_ALINEAROTULO_RPG, //: "Alineacion:number",
          NU_TAMFUENTE_RPG, //: "font-size",
          NU_ROTULOPERPEN_RPG, // "orientacion del rotulo",
          NU_ROTULOVISIBLE_RPG, //: "Si el rótulo es visible:bool",
          NU_NEGRILLA_RPG, //"negrita para el rotulo",
          NU_ALINEAROTULOVERTICAL_RPG, // "la alineacion para cual el rotulo está vertical",
          "TX_COLORFONDO_RPG": backgroundColor ? "#FF" + quitHash(backgroundColor) : "#00FFFFFF",
      
          // Valores estáticos
          "NU_ORDEN_COLDEP_RPG": 0,
          "NU_INDIDEP_RPC_RPG": -1,
          "NU_INVACTASO_RPG": 0,
          "TX_ALINEAROTULO_RPG": "0;0"
        }

        console.log("Enviando grupo => ", toSend)

        return;
        return fetch(endPoint + "/createRelGrupo", {
            method: "POST",
            headers: {
                "Content-Type": "Application/json"
            },
            body: JSON.stringify(toSend)
        }).then(d => d.json());
    }

    unshift(obj) {
        this.grupos.unshift(obj);
        this.listarGrupos();
    }
}

export default new GrupoHist();