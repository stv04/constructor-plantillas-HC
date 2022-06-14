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
        const dependiente = component.dependiente;

        let {height, width} = styles || {};
        const { top, left } = styles || {};

        const innerComponent = component.innerComponent;
        let NU_PATH_FILE = "";
        if(innerComponent) {
            switch(innerComponent.tipoEspecial) {
                case "formula":
                    const dataFormula = innerComponent["data-formula"];
                    NU_PATH_FILE = `SELECT CAST((${dataFormula}) AS NUMBER(18,2)) FROM DUAL`;
                break;

                case "grafica":
                    const path = innerComponent.src.replace("/Images/ImagenesPub/", "file:\\");
                    const innerStyle = innerComponent.style;

                    if(innerStyle) {
                        height = innerStyle.height;
                        width = innerStyle.width;
                    }
                    NU_PATH_FILE = path;
                break;

                case "typeSelect":
                    const query = innerComponent["data-query"];
                    NU_PATH_FILE = `SELECT ID_AUTO_OPCIO, TX_DESC_OPCI FROM LISTA_OPCION WHERE TX_GRUP_OPCI = '${query}'`
                break;
                
                case "typelistaOption":
                    const relacion = innerComponent["data-query"];
                    await this.actualizarConceptoTipoLista(component.idConceptoDB, relacion);
                break;
            }

        }

        let NU_INDIDEP_RPC = -1;
        if(dependiente) {
            NU_INDIDEP_RPC = dependiente.sort;
        }


        if(component.type === "table" && component.celdasTabla) {
            this.crearCeldasTabla(component.celdasTabla, plantilla, component.idGrupoParentDB, component.idConceptoDB);
        }
      
      
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
          NU_PATH_FILE, //"sirve para fórmulas", formulas de consulta / path
          "NU_VISIBLE_RPC": 1, //"visibilidad del concepto:bool",
          NU_INDIDEP_RPC, // concepto de dependencia option de select
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

        return;
        const resp = await fetch(endPoint + "/createRelConcepto", {
            method: "POST",
            headers: {
                "Content-Type": "Application/json"
            },
            body: JSON.stringify(toSend)
        }).then(d => d.json());

        this.agregarValidaciones(component, resp.NU_NUME_RPC);
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

    async crearCeldasTabla(celdas, idPlantilla, idGrupoParentDB, idConceptoDB) {
        for (const celda of celdas) {
            const tipo = parseInt(celda["data-tipo"]);
            const formato = {
                R_GRID_HICLI: 0, // El id de la tabla
                NU_NUME_PLHI_G: idPlantilla, // El id de la plantilla que está asociado
                NU_GRID_COL: celda.gridCol, // Orden de columna
                NU_GRID_ROW: celda.gridRow, // Orden de fila
                NU_GRID_VAL: celda.content || celda.value || " ", // Contenido por defecto de la celda
                NU_NUME_COHI_G: idConceptoDB, // Código del concepto tipo tabla
                NU_NUME_GRHI_GRID: idGrupoParentDB, // Código del grupo asociado
                NU_TIPO_RGP: isNaN(tipo) ? 6 : tipo, // Tipo de celda de la tabla
                NU_VALIDAFILA_RGP: 0, // Se deja por defecto
                NU_LOG_RGP: 20, // Cantidad de caráteres permitidos
            }

            console.log("Celda de tabla => ", formato);

            const resp = await fetch(endPoint + "/createRelConcepto", {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json"
                },
                body: JSON.stringify(formato)
            }).then(d => d.json());
        }
    }
 
    agregarValidaciones(component, idRelacion) {
        const getData = title => component["data-"+title]

        //Todos los balores booleanos reprentan un número 0,1 => false,true
        const validaciones = {
            PathValcon1: {
                NU_NUME_COHI_VAHI1: component.idConceptoDB, // Código del concepto
                NU_NUME_PLHI_VAHI1: idRelacion, // Código de la relación del concepto
                NU_APLI_VAHI1: getData("genero") || 0, // Género 0,1,2 => ambos,masc,fem
                NU_OBLI_VAHI1: getData("required") ? 1 : 0, // bool:si el concepto es obligatorio 
                NU_EPIC_VAHI1: getData("es_epicrisis") ? 1 : 0, // bool:Si hace parte de epicrisis
                NU_ANTE_VAHI1: getData("antecedentes") ? 1: 0, // bool:Si el concepto tendrá antecedentes
                NU_DECI_VAHI1: getData("decimales") ? 1 : 0, // bool:Si el concepto contará con decimales
                DE_TEMIN_VAHI1: getData("edad_min") || null, // Edad mínima del paciente para habilitar el concepto
                DE_TEMAX_VAHI1: getData("edad_max") || null, // Edad máxima del paciente para habilitar el concepto
                ANTE_ALERG: 0, // Se deja por defecto (0)
                NU_TIPOEDAD_VAHI1: parseInt(getData("tipo_edad")) || 1, // Tipo edad para restricción de campos 1,2,3 => Años,meses,días
                ES_EDITABLE_VAHI1: 1
            },
    
            pathValcon2: {
                NU_NUME_COHI_VAHI2: component.idConceptoDB, // Código del concepto
                NU_NUME_PLHI_VAHI2: idRelacion, // Código de la relación del concepto
                NU_LONG_VAHI2: parseInt(getData("maxlength")) || null, // Longitud máxima de carácteres permitidos (texto, memo, numérico)
                NU_VALI_VAHI2: null, // se deja null
                DE_TMAX_VAHI2: getData("max") || null, // Valor máximo que se puede diligenciar en tipo numérico
                DE_TMIN_VAHI2: getData("min") || null, // Valor mínimo que se puede diligenciar en tipo numérico
                DE_VDEF_VAHI2: getData("value") || null // Valor o texto por defecto que tendrá un concepto
            }

        }

        // Los siguiente valores de la documentación no los tengo en la base de datos: ‘DE_RANMIN_VAHI2’, ‘DE_RANMAX_VAHI2’, ‘LISTA_COMPARA_VAHI2’

        // Proceder con la creación
        for(let valConc in validaciones) {
            const resp = fetch(endPoint + "/" + valConc, {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json"
                },
                body: JSON.stringify(validaciones[valConc])
            }).then(d => d.json());

            console.log(resp);
        }
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

    async actualizarConceptoTipoLista(idConcepto, relacion) {
        const actualizar = {
            TX_TBLBASE_COHI: "LISTA_OPCION",
            TX_CODBASE_COHI: "ID_AUTO_OPCIO",
            TX_NOMBASE_COHI: "TX_DESC_OPCI",
            TX_CONDBAS_COHI: `TX_GRUP_OPCI=''${relacion}''`,
            NU_NUME_COHI: idConcepto
        }

        const resp = await fetch(endPoint + "/actualizarConceptoTipoLista", {
            method: "POST",
            headers: {
                "Content-Type": "Application/json"
            },
            body: JSON.stringify(actualizar)
        }).then(d => d.json());

        return resp;
    }

    unshift(obj) {
        this.conceptos.unshift(obj);
        this.listarConceptos();
    }
}

export default new ConceptoHist();