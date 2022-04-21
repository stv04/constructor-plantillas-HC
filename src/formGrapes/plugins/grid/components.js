import modalConfiguracionOrtodoncia from "../../scripts/modalConfiguracionOrtodoncia.js";
import { typeCol1, typeCol2, typeCol3, typeCol4, typeCol6, typeConcepto, typeGrupo, typeRotulo, typeRow } from "../../types/gridTypes.js";

export default (editor, opts) => {
    const comp = editor.DomComponents;

    comp.addType(typeRow, {
      isComponent: el => el.tagName == 'DIV' && el.classList.contains("row"),
         
      model: {
        defaults: {
          draggable: "*",
          tagName: 'div',
          attributes: { class:"row" }
        }
      }
    });

    comp.addType("tittle", {
      isComponent: el => el.tagName == 'h5' && el.classList.contains("title"),
      extend: "text",
      model: {
        defaults: {
          draggable: "*",
          tagName: "h5",
          attributes: {class: "bg-primary text-light"}
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