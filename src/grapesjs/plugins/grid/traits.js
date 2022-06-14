import ConceptoHistService from "../../adherenciaServices/conceptoHistService.js";
import GrupoHistService from "../../adherenciaServices/GrupoHistService.js";
import camposCalculados from "../../scripts/camposCalculados.js";
import cargaDinamicaDatosMaestros from "../../scripts/cargaDinamicaDatosMaestros.js";
import { typeButton, typeOption, typeTextarea } from "../../types/formTypes.js";
import { typeRotulo } from "../../types/gridTypes.js";
import conceptos from "./conceptos.js";

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
                this.$input.setAttribute("list", GrupoHistService.idSelectorGrupos);

                GrupoHistService.listarGrupos(target);
            }
            return this.$input;
        }
    });

    // Rasgo para consultar conceptos a la base de datos
    trm.addType("conceptos-options", {
        events: {
            keyup: "onChange"
        },

        onClick() {
            console.log("click");
        },

        onValueChange() {
            const { model, target } = this;
            const [idType, idConcept, nombre] = model.get('value').trim().split("::");

            // target.addAttributes({"data-idGrupo": idConcept})
            const rotulo = target.components().models.find(el => el.attributes.type === typeRotulo);
            const elemento = target.components().models[1];
            target.set({
                idConceptoDB: parseInt(idConcept),
                nombreConcepto: nombre,
                codigoConcepto: nombre
            });
            
            const el = target.view.el;
            target.attributes.attributes["data-nombrecampo"] = nombre;
            
            console.log(target, el);
            target.components().reset(conceptos(idType, idConcept, nombre))
            target.view.render();   
        },

        getInputEl() {
            const {target} = this;
            
            const conceptos = ConceptoHistService
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


    // CAMBIOS HAROLD
    trm.addType("campos-calc", {
        events: {
            keyup: "onChange"
        },

        onValueChange() {
            const { model, target } = this;
            const valueConfig = model.get('value').trim();
            const el = target.view.el;
            target.attributes.attributes["data-formula"] = valueConfig;
            console.log(el.parentElement, el.parentNode);

            if(valueConfig)
            el.setAttribute("disabled", true);

            console.log(this, target, valueConfig)

            camposCalculados.bind(el)({sentence: valueConfig});
        },

        getInputEl() {
            if (!this.$input) {
                this.$input = document.createElement('textarea');
            }
            return this.$input;
        }
    });
    
}