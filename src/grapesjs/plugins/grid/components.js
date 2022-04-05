import modalConfiguracionOrtodoncia from "../../scripts/modalConfiguracionOrtodoncia.js";
import { typeCol1, typeCol2, typeCol3, typeCol4, typeCol6, typeGrupo, typeRow } from "../../types/gridTypes.js";

export default (editor, opts) => {
    const comp = editor.DomComponents;

    comp.addType(typeGrupo, {
      isComponent: el => el.tagName == 'DIV' && el.classList.contains("row"),
          
      model: {
        defaults: {
          draggable: "*",
          droppable: "*",
          tagName: 'div',
          attributes: { style: "position: absolute;" },
          style: {
            height: "66px",
            width: "600px"
          },
          traits: [{
            name: "grupoHist",
            label: "Datos",
            type: "grupos-options"
          }, {
            type: 'button',
            label: "Actualizar",
            text: 'Modificar',
            full: true, // Full width button
            command: "editar-grupo_hist"
          }, {
            type: 'button',
            label: "Crear",
            text: 'Nuevo',
            full: true, // Full width button
            command: "crear-grupo_hist"
          }]
        }
      }
    });

    comp.addType("rotulo", {
      extend: "text",
      model: {
        defaults: {
          draggable: false,
          droppable: false,
          removable: false,
          copyable: false,
          components: [],
          stylable: [
            "background-color",
            "text-align", "color", "font-size", "display",
            "font-weight"
          ]
        }
      }
    })

    comp.addType("rotuloGrupo", {
      isComponent: el => {
        console.log(el);
        return el.tagName === "H6"
      },
      extend: 'rotulo',

      model: {
        defaults: {
          tagName: "h6",
          components: "Seleccione grupo"
        }
      }
    });    

    comp.addType("odontograma", {
      model: {
        defaults: {
          draggable: "*",
          tagName: "div",
          attributes: {class: "row p-3 muestreo odontograma"
          },
          script: modalConfiguracionOrtodoncia,
          styles: `
            .muestreo {
              min-height: 60px
            }

            .superficie-diente:hover {
              stroke: blue;
              stroke-width: 4;
              filter: drop-shadow(5px 5px 10px blue);
            }
          `
        }
      }
    })
    
    comp.addType("odontogramaEsq", {
      model: {
        defaults: {
          draggable: ".odontograma",
          tagName: "div",
          attributes: {class: "col-1"
          },
        }
      }
    })
}