import conceptoHistService from "../../../aderencia/conceptoHistService.js";
import cargaDinamicaDatosMaestros from "../../scripts/cargaDinamicaDatosMaestros.js";
import { typeButton, typeOption, typeTextarea } from "../../types/formTypes.js";
import { typeRotulo } from "../../types/gridTypes.js";

const endPoint = "https://localhost:7000/Plantilla";
const dataInitial = [{
    id: 1,
    nombre: "Grupo 1"
}, {
    id: 2,
    nombre: "Grupo 2"
}, {
    id: 3,
    nombre: "Grupo 3"
}];

const idSelectorGrupos = "lista-grupo_hist";

async function getGrupos() {
    const grupos = await fetch(endPoint + "/getGrupos").then(d => d.json());

    return grupos;
}

async function listarGrupos(target) {
    const grupos = await getGrupos();
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

    // const cambiador = document.querySelector("[list="+idSelectorGrupos+"]");
    // cambiador.value= grupos[0].nU_NUME_GRHI + ":" + grupos[0].tX_TITULO_GRHI;

    // console.log(target);
    // target.view.el.firstChild.innerHTML = cambiador.value.split(":")[1];
}

export default function (editor) {
    const trm = editor.TraitManager;

    // Rasgo para consultar grupo ala base de datos
    trm.addType("grupos-options", {
        events: {
            keyup: "onChange"
        },

        onValueChange() {
            const { model, target } = this;
            const [id, nombre] = model.get('value').trim().split(":");

            // target.addAttributes({"data-idGrupo": id})
            const rotulo = target.components().models.find(el => el.attributes.type === typeRotulo);
       
            console.log(rotulo);
            rotulo.set({
                content: nombre
            });
            target.set({
                idGrupoDB: parseInt(id)
            })
            target.view.render();
        },

        getInputEl() {
            const {target} = this;
            if (!this.$input) {
                console.log(this);
                const optionsArr = [];
                const options = this.target.components();
                this.$input = document.createElement("input");
                this.$input.setAttribute("list", idSelectorGrupos);

                listarGrupos(target);

            }
            return this.$input;
        }
    });

    // Rasgo para consultar conceptos a la base de datos
    trm.addType("conceptos-options", {
        events: {
            keyup: "onChange"
        },

        onValueChange() {
            const { model, target } = this;
            const [id, nombre] = model.get('value').trim().split(":");

            // target.addAttributes({"data-idGrupo": id})
            const rotulo = target.components().models.find(el => el.attributes.type === typeRotulo);
            const elemento = target.components().models[1];
       
            // elemento.set({
            //     content: typeButton,
            // });

            // rotulo.set({
            //     content: nombre
            // });
            // target.set({
            //     idGrupoDB: parseInt(id)
            // });

            target.components().reset([
                {type: typeRotulo, content: "Cambio de concepto"},
                {type: typeButton}
            ])
            target.view.render();
        },

        getInputEl() {
            const {target} = this;
            const conceptos = conceptoHistService
            if (!this.$input) {
                console.log(this);
                const optionsArr = [];
                const options = this.target.components();
                this.$input = document.createElement("input");
                this.$input.setAttribute("list", conceptos.idSelectorConceptos);

                conceptos.listarConceptos();

            }
            return this.$input;
        }
    });
    
}