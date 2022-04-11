import { endPoint } from "./config.js";
import PlantillaHistService from "./PlantillaHistService.js";
import { quitHash, convert_px_to_tw, getPropertiesRotulo} from "./utils.js";
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

    async crearR_plan_conc(component, padre) {
        const styles = component.style;
        const concepto = component.concepto;
        const backgroundColor = styles["background-color"];
        const plantilla = PlantillaHistService.idPlantillaHist;
      
        const { top, left, height, width } = styles || {};
      
        let [
          TX_HXCOLORROTULO_RPC, TX_HXCOLORLETRA_RPC, NU_ROTULOTOTALANCHO_RPC, 
          NU_ALINEAROTULO_RPC, NU_ROTULOPERPEN_RPC, NU_ROTULOVISIBLE_RPC,
          NU_NEGRILLA_RPC, NU_ALINEAROTULOVERTICAL_RPC, NU_TAMFUENTE_RPC
        ] = getPropertiesRotulo(component.rotulo);
      
        let initialTop = convert_px_to_tw(top) || 0;
        let initialLeft = convert_px_to_tw(left) || 0;
      
        const toSend = {
          "NU_NUME_PLHI_RPC": plantilla, // código de plantilla hist
          "NU_NUME_COHI_RPC": component.idConceptoDB, // código concepto
          "NU_NUME_GRHI_RPC": component.idGrupoParentDB, // código grupo
          "NU_INGR_RPC": component.parent, // código de posición del r_plan_grup
          "NU_INDI_RPC": component.sort, // índice del concepto!!
          "NU_TOP_RPC": initialTop || 0, // top
          "NU_LEFT_RPC": initialLeft, // height
          "NU_HEIGHT_RPC": convert_px_to_tw(height) || 300, // height
          "NU_WIDTH_RPC": convert_px_to_tw(width) || 1000, // width
          "NU_PATH_FILE": "sirve para fórmulas", // formulas de consulta / path
          "NU_VISIBLE_RPC": 1, //"visibilidad del concepto:bool",
          "NU_INDIDEP_RPC": -1, // concepto de dependencia option de select
          TX_HXCOLORLETRA_RPC, //: "Color del título del concepto",
          NU_ROTULOTOTALANCHO_RPC, //: "si el rotulo ocupará el ancho del concepto",
          NU_ALINEAROTULO_RPC, //: "alineación delrótulo",
          "TX_IDGROP_RPC": "Referencia",//"Referencia para indicar grupo de opciones",
          NU_TAMFUENTE_RPC, // "tamaño letra concepto",
          NU_ROTULOPERPEN_RPC, //: "Si la posición del rotulo del concepto será vertical",
          NU_ROTULOVISIBLE_RPC, //: "Visibilidad titulo concepto",
          NU_NEGRILLA_RPC, //: "si el título del concepto está en negrita",
          NU_ALINEAROTULOVERTICAL_RPC, //: "alineacion del rotulo",
          "TX_COLORFONDO_RPC": backgroundColor ? "#FF" + quitHash(backgroundColor) : "#00FFFFFF", // "Color fondo rotulo",
          TX_HXCOLORROTULO_RPC, //: "Color rotulo",
          
          //Valores estáticos
          "TX_NOMBRPT_RPC": null,
          "TX_FORMRPT_RPC": null,
          "NU_EDITA_RPC": 0,
          
          "TX_CAMPOSASOCIA_RPC": null,
          
          "TX_KEYESTILO_RPC": null,
          
          "NU_INVACTASO_RPC": null,
      
          "TX_ALINEAROTULO_RPC": "0;0",
          "NU_ORDEN_COLDEP_RPC": 0,
          "AUTO_INC_RPC": null,
          "ES_SEMA_RPC": 0,
          "TX_DESC_SEMA_RPC": null,
          "TX_VALOR_SEMA_RPC": null,
          "TX_RELA_SEMA_RPC": null,
          "TX_COLOR_SEMA_RPC": null
        };

        console.log("Enviando concepto => ", toSend)

        const resp = await fetch(endPoint + "/createRelConcepto", {
            method: "POST",
            headers: {
                "Content-Type": "Application/json"
            },
            body: JSON.stringify(toSend)
        }).then(d => d.json());
        return resp;
    }

    async crearConcepto(formData) {
        const conceptoCreado = await fetch(endPoint + "/createConcepto", {
            method: "POST",
            body: formData
        }).then( d => {
            if(!d.ok) return d.text();
            return d.json();
        });
        
        if(typeof conceptoCreado === "object")
        this.unshift(conceptoCreado);

        return conceptoCreado;
    }

    async actualizarConcepto(formData) {
        const conceptoCreado = await fetch(endPoint + "/updateConcepto", {
            method: "PUT",
            body: formData
        }).then( d => {
            if(!d.ok) return d.text();
            return d.json();
        });

        return conceptoCreado;
    }

    unshift(obj) {
        this.conceptos.unshift(obj);
        this.listarConceptos();
    }
}

export default new ConceptoHist();