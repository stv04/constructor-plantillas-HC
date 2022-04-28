import campoDependiente from "../../scripts/campoDependiente.js";
import camposCalculados from "../../scripts/camposCalculados.js";
import cargaDinamicaDatosMaestros from "../../scripts/cargaDinamicaDatosMaestros.js";
import { typeOption } from "../../types/formTypes.js";

const camposAfil = [{
    nombre: 'Nombre',
    campos: [{titulo: "tX_PRIMNOMBRE_AFIL"}],
}, {
    nombre: "Apellido",
    campos: [{titulo: "tX_PRIMAPELLI_AFIL"}],
}, {
    nombre: "Tipo doc.",
    campos: [
        {titulo: "nU_IDTIPOIDEN_TIPOIDEN", conversion: "TIPO-DE-IDENTIFICACION"}
    ],
}, {
    nombre: "Nombre completo",
    campos: [{titulo: "tX_PRIMNOMBRE_AFIL"}, {titulo: "tX_PRIMAPELLI_AFIL"}],
    separador: " "
}, {
    nombre: "Número identificación",
    campos: [{titulo: "tX_IDENTIFICACION_AFIL"}],
}, {
    nombre: "Regimen",
    campos: [
        {titulo: "nU_IDREGIMEN_REGIMEN", conversion: "REGIMEN"}
    ],
}, {
    nombre: "Estado civil",
    campos: [
        {titulo: "nU_ESTADO_AFIL", conversion: "ESTADO CIVIL"}
    ],
}, {
    nombre: "Edad",
    campos: [
        {titulo: "fE_FECHANACIMIENTO_AFIL"}
    ],
    eval: "edad"
}, {
    nombre: "Sexo",
    campos: [
        {titulo: "nU_IDGENERO_GENEROS", conversion: "SEXO"}
    ],
}, {
    nombre: "Hemoclasificación",
    campos: [
        {titulo: "nU_IDTIPOSANGRE_TIPOSANGRE", conversion: "TIPOS-DE-SANGRE"},
        {titulo: "nU_IDRH_RHS", conversion: "RH"}
    ],
}, {
    nombre: "Dirección",
    campos: [
        {titulo: "tX_DIRECCION_AFIL"}
    ],
}, {
    nombre: "Telefono",
    campos: [
        {titulo: "nU_TELEFONO_AFIL"}
    ],
}, {
    nombre: "Celular",
    campos: [
        {titulo: "nU_CELULAR_AFIL"}
    ],
}, {
    nombre: "Tipo de usuario",
    campos: [
        {titulo: "nU_IDAFILIADO_AFIL"},
        {titulo: "nU_IDCOTIZANTE_AFIL"},
    ],
    eval: "tipo-usuario", 
    separador: ","
}]

let tituloMaestros;
const ConsultaDatosMaestros = async (id) => {
    let consulta = "maestros"
    if(id) {
        consulta += "?iddatomaestro=" + id;
    }

    const maestros = await fetch("http://localhost:3000/" + consulta).then(d => d.json());
    
    maestros.map(m => {
        m.dato = JSON.parse(m.dato);
        return m;
    });

    return maestros;
}

// cargarTitulosMaestros();
async function cargarTitulosMaestros() {
    tituloMaestros = await ConsultaDatosMaestros()
    .then(d => d.filter(m => m.relacion === null).map(m => {
        return {
            id: m.iddatomaestro,
            titulodato: m.titulodato
        }
    }));
}


export default function (editor) {
    const trm = editor.TraitManager;

    trm.addType("select-options", {
        events: {
            keyup: "onChange"
        },

        onValueChange() {
            const { model, target } = this;
            const optionsStr = model.get('value').trim();
            const options = optionsStr.split('\n');
            const optComps = [];

            for (let i = 0; i < options.length; i++) {
                const optionStr = options[i];
                const option = optionStr.split('::');
                optComps.push({
                  type: typeOption,
                  components: option[1] || option[0],
                  attributes: { value: option[0] },
                });
            }

            target.components().reset(optComps);
            target.view.render();
        },

        getInputEl() {
            if (!this.$input) {
                const optionsArr = [];
                const options = this.target.components();
        
                for (let i = 0; i < options.length; i++) {
                    const option = options.models[i];
                    const optAttr = option.get('attributes');
                    const optValue = optAttr.value || '';
                    const optTxtNode = option.components().models[0];
                    const optLabel = optTxtNode && optTxtNode.get('content') || '';
                    optionsArr.push(`${optValue}::${optLabel}`);
                }
        
                this.$input = document.createElement('textarea');
                this.$input.value = optionsArr.join("\n");
            }
            return this.$input;
        }
    });

    // Rasgo para consultar datos maestros en un input
    trm.addType("dataMaster-options", {
        noLabel: true,
        templateInput: '',
        templateInput: `<div class="custom-input-wrapper">
            Administrador de opciones
            <div data-input></div>
        </div>`,
        events: {
            keyup: "onChange"
        },

        // Envento que escucha cada mínimo cambio que se realice en cualquier rasgo del input
        onEvent({elInput, component, event}) {
            /* Opciones
                *elInput: Elemento mostrado en el el rasgo,
                *component: el componente del inpt para realizarle los cambios en el canvas/html
                *event: Donde se puede encontrar el input que cambió
            */

            const inputDataMaster = elInput.querySelector("#dataMaster-opt_master");
            const dependence = elInput.querySelector("#dataMaster-opt_dependient");
            const selector = elInput.querySelector("#dataMaster-opt_selector");
            const optsDef = elInput.querySelector("#dataMaster-opt_person");

            const target = event.target;
            let maestro = target.classList.contains("master");
            let personal = target.classList.contains("personal");

            selector.value === "Maestros" ? maestro = true : personal = true;

            if(maestro) {
                if(dependence.value) {
                    component.attributes.dependence = dependence.value;
                    component.attributes.typeOption = typeOption;
                    component.attributes["script-props"] = ["dependence", "typeOption"];

                    component.attributes.script = cargaDinamicaDatosMaestros;

                    component.components().reset({
                        type: typeOption,
                        components: "Seleccione",
                        attributes: {value: ""}
                    });
                    component.view.render();
                } else {
                    llenarDatos(inputDataMaster.value);
                }
            } else if(personal) {
                const optionsStr = optsDef.value.trim();
                const options = optionsStr.split('\n');
                const optComps = [];

                for (let i = 0; i < options.length; i++) {
                    const optionStr = options[i];
                    const option = optionStr.split('::');
                    optComps.push({
                        type: typeOption,
                        components: option[1] || option[0],
                        attributes: { value: option[0] },
                    });
                }

                component.components().reset(optComps);
                component.view.render();
            }

            async function llenarDatos(val) {
                const datos = await ConsultaDatosMaestros(val);
                const data = datos[0];
                if(!data) return;
                const res = data.dato.map((d, i) => {
                    
                    return {
                        type: typeOption,
                        components: d,
                        attributes: {value: data.iddatomaestro + "," +i}
                    }
                });

                res.unshift({
                    type: typeOption,
                    components: "-- Seleccione --",
                    attributes: {value: ""}
                })

                component.components().reset(res);
                component.view.render();
            }

            

        },
        
        //Se comieenza con la creación de input
        createInput({trait}) {
            // "trait" configuración que viene directa del component como "typeOpts"
            const traitTypeOpts = trait.get("typeOpts") || [];
            const traitOpts = trait.get("options") || [];
            const typeOpts = traitTypeOpts.length ? traitTypeOpts : [
                {id: "personalizados", name: "Personalizados"},
                {id: "maestros", name: "Maestros"},
            ];

            const options = traitOpts.length ? traitOpts : [
                "opts::Option 1", "opts::Option 2"
            ];

            
            const maestros = tituloMaestros;

            //elemento que se va a mostrar ewn los rasgos del elemento
            const el = document.createElement("div");

            el.innerHTML = `
                <select id="dataMaster-opt_selector" class="form-select mb-3 form-select-sm bg-transparent text-light">
                    ${typeOpts.map(opt => `<option class="bg-dark text-light" value="${opt.name}">${opt.name}</option>`).join("")}
                </select>

                <div id="dataMaster-opt_person-inputs" class="mb-3">
                   <label class="form-label">Opciones</label>
                    <textarea id="dataMaster-opt_person" class="personal form-control bg-transparent text-light">${options.map(opt => opt).join("\n")}</textArea>
                </div>

                <div id="dataMaster-opt_master-inputs" class="mb-3 d-none">
                   <label class="form-label">Datos maestros</label>
                    <select id="dataMaster-opt_master" class="master form-select form-select-sm bg-transparent text-light mb-3">
                        ${maestros.map(opt => `<option class="bg-dark text-light" value="${opt.id}">${opt.titulodato}</option>`).join("")}
                    </select>
 
                    <label class="form-label">Dependiente</label>
                    <input id="dataMaster-opt_dependient" class="master form-control bg-transparent text-light form-control-sm"/>
                </div>
            `;

            const inputsDataMaster = el.querySelector("#dataMaster-opt_master-inputs");
            const inputsPerson = el.querySelector("#dataMaster-opt_person-inputs");
            const inputSelector = el.querySelector("#dataMaster-opt_selector");

            //Para cuando cambie el tipo de dato que se va a llenar en el input
            inputSelector.addEventListener("change", e => {
                switch (e.target.value) {
                   case "Personalizados":
                       inputsDataMaster.classList.add("d-none");
                       inputsPerson.classList.remove("d-none");
                       break;
                   default:
                       inputsDataMaster.classList.remove("d-none");
                       inputsPerson.classList.add("d-none");
                }
            });

            return el;
        },

    });
    
    
    trm.addType("campos-calc", {
        events: {
            keyup: "onChange"
        },

        onValueChange() {
            const { model, target } = this;
            const valueConfig = model.get('value').trim();
            const el = target.view.el;
            el.setAttribute("data-computo", valueConfig);

            if(valueConfig)
            el.setAttribute("disabled", true);

            console.log(this, target, valueConfig)

            target.attributes.sentence = valueConfig;
            target.attributes["script-props"] = ["sentence"];

            target.attributes.script = camposCalculados;
            camposCalculados.bind(el)({sentence: valueConfig});
        },

        getInputEl() {
            if (!this.$input) {
                this.$input = document.createElement('textarea');
            }
            return this.$input;
        }
    });
    
    trm.addType("campo-dependiente", {
        events: {
            keyup: "onChange"
        },

        onValueChange() {
            const { model, target } = this;
            const valueConfig = model.get('value').trim();
            const el = target.view.el;
            el.setAttribute("data-dependiente", valueConfig);
            console.log(target.attributes);

            target.attributes.dependence = valueConfig;
            target.attributes["script-props"] = ["dependence"];

            target.attributes.script = campoDependiente;
        },

        getInputEl() {
            if (!this.$input) {
                this.$input = document.createElement('input');
            }
            return this.$input;
        }
    });

    trm.addType("campo-consulta_serv", {
        noLabel: true,
        templateInput: "",
        templateInput: `<div class="custom-input-wrapper">
        Administrador de opciones
        <div data-input></div>
        </div>`,
        events: {
            keyup: "onChange"
        },

        onEvent({elInput, component, event}) {
            /* Opciones
                *elInput: Elemento mostrado en el el rasgo,
                *component: el componente del inpt para realizarle los cambios en el canvas/html
                *event: Donde se puede encontrar el input que cambió
            */

            const servSelector = elInput.querySelector("#servicios-selector");
            const campoSelector = elInput.querySelector("#servicios-campos");

            if(!servSelector.value) {
                return delete component.attributes.attributes["data-servicio"];
            }

            if(servSelector.value === "afiliados" && event.target.id === "servicios-selector") {
                campoSelector.innerHTML = "";
                console.log(campoSelector)
                camposAfil.forEach(campo => {
                    const option = document.createElement("option");
                    option.setAttribute("class", "bg-dark text-light");
                    const objString = JSON.stringify(campo);
                    option.value = objString;
                    option.innerHTML = campo.nombre;

                    campoSelector.appendChild(option);
                });
            }

        
            const servicio = servSelector.value + "::" + campoSelector.value;
            console.log(component);

            component.attributes.attributes["data-servicio"] = servicio;
        },

        createInput({trait}) {
            const servicios = [{
                value: "",
                name: "Seleccione"
            }, {
                value: "afiliados",
                name: "Afiliados"
            }]

            const el = document.createElement("div");

            el.innerHTML = `
                <select id="servicios-selector" class="form-select mb-3 form-select-sm bg-transparent text-light">
                    ${servicios.map(opt => `<option class="bg-dark text-light" value="${opt.value}">${opt.name}</option>`).join("")}
                </select>

                <label class="form-label" for="servicios-campos">Campo del servicio</label>
                <select id="servicios-campos" class="form-select form-select-sm bg-transparent text-light mb-3">
                </select>
            `;

            return el;
        }
    })
}