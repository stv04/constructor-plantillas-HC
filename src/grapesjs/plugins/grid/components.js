import modalConfiguracionOrtodoncia from "../../scripts/modalConfiguracionOrtodoncia.js";
import { typeCol1, typeCol2, typeCol3, typeCol4, typeCol6, typeConcepto, typeGrupo, typeRotulo, typeRow } from "../../types/gridTypes.js";

export default (editor, opts) => {
    const comp = editor.DomComponents;

    comp.addType(typeGrupo, {
      isComponent: el => el.tagName == 'DIV',
          
      model: {
        defaults: {
          draggable: "*",
          droppable: "*",
          tagName: 'div',
          attributes: { style: "position: absolute;", class: "grupo" },
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

    comp.addType(typeConcepto, {
      isComponent: el => el.tagName == 'DIV',
          
      model: {
        defaults: {
          draggable: ".grupo",
          droppable: false,
          tagName: 'div',
          attributes: { style: "position: absolute;" },
          traits: [{
            name: "grupoHist",
            label: "Datos",
            type: "conceptos-options"
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

    comp.addType(typeRotulo, {
      isComponent: el => {
        console.log(el);
        return el.tagName === "H6"
      },

      model: {
        defaults: {
          draggable: false,
          droppable: false,
          removable: false,
          copyable: false,
          tagName: "h6",
          content: "Seleccione grupo",
          stylable: [
            "background-color",
            "text-align", "color", "font-size", "display",
            "font-weight"
          ]
        }
      }
    })   

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