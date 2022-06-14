import modalConfiguracionOrtodoncia from "../../scripts/modalConfiguracionOrtodoncia.js";
import { typeCol1, typeCol2, typeCol3, typeCol4, typeCol6, typeConcepto, typeGrupo, typeRotulo, typeRow } from "../../types/gridTypes.js";

const configuracionesDefectoConcepto = [
  {
    type: 'select',
    name: 'data-genero',
    label: "G\u00e9nero",
    options: [
      { value: 0, name: 'Ambos' },
      { value: 1, name: 'Masculino' },
      { value: 2, name: 'Femenino' },
    ]
  },

  // Numéricos
  {
    type: 'number',
    name: 'data-maxlength',
    label: "Long. carácteres",
  },
  {
    type: 'number',
    name: 'data-max',
    label: "Valor máx.",
  },
  {
    type: 'number',
    name: 'data-min',
    label: "Valor mín",
  },
  {
    type: 'text',
    name: 'data-value',
    label: "Valor por defecto",
  },

  //Textos
  {
    type: "text",
    name: "data-dependiente",
    label: "Dependiente"
  },

  // Edades
  {
    type: 'number',
    name: 'data-edad_min',
    label: "Edad mínima",
  },
  {
    type: 'number',
    name: 'data-edad_max',
    label: "Edad máxima",
  },
  {
    type: 'select',
    name: 'data-tipo_edad',
    label: "Tipo edad",
    options: [
      { value: 1, name: 'Años' },
      { value: 2, name: 'Meses' },
      { value: 3, name: 'Días' },
    ]
  },

   //checkboxes
  {
    type: 'checkbox',
    name: 'data-required',
    label: "requerido",
  },
  {
    type: 'checkbox',
    name: 'data-es_epicrisis',
    label: "epicrisis",
  },
  {
    type: 'checkbox',
    name: 'data-antecedentes',
    label: "Antecedentes",
  },
  {
    type: 'checkbox',
    name: 'data-decimales',
    label: "Con decimales",
    check: true,
  },
  
]

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
          // attributes: { style: "position: absolute;" },
          traits: [{
            name: "conceptoHist",
            label: "Datos",
            type: "conceptos-options"
          }, {
            type: 'button',
            label: "Actualizar",
            text: 'Modificar',
            full: true, // Full width button
            command: "editar-concepto_hist"
          }, {
            type: 'button',
            label: "Crear",
            text: 'Nuevo',
            full: true, // Full width button
            command: "crear-concepto_hist"
          }, ...configuracionesDefectoConcepto],
          style: {top: 0, position: "absolute"},
          stylable: ["width", "height", "top", "left", "border"],
          active: true,
        }
      }
    });
    
    comp.addType("table", {
      isComponent: el => el.tagName == 'TABLE',
      extend: typeConcepto,
      model: {
        defaults: {
          tagName: 'table',
          traits: [{
            type: "button",
            label: "Ctrl. fila",
            text: "Agregar Fila",
            command: editor => alert('Hello'),
          }, {
            type: "button",
            label: "Ctrl. filas",
            text: "Eliminar Fila",
            command: "eliminar_fila_tabla"
          }, {
            type: "button",
            label: "Ctrl. cols.",
            text: "Agregar Columna",
            command: "agregar_columna_tabla"
          }, {
            type: "button",
            label: "Ctrl. cols.",
            text: "Eliminar Columna",
            command: "eliminar_columna_tabla"
          }]
        },
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




    // EDICIONES HAROLD
    comp.addType("formulaConc", {
      isComponent: el => {
        console.log(el);
        return el.tagName === "INPUT"
      },

      model: {
        defaults: {
          draggable: false,
          droppable: false,
          removable: false,
          copyable: false,
          tagName: "input",
          traits: [{
            name: "formula",
            label: "Formula",
            type: "campos-calc"
          }]
        }
      }
    });

    comp.addType("typeThumbnail", {
      isComponent: el => {
          return el.tagName === "IMG"
      },

      extend: 'image',

      model: {
          defaults: {
              draggable: false,
              droppable: false,
              removable: false,
              copyable: false,
              editable: false,
              tagName: "img",
              stylable: [
                "height", "width"
              ],

              style: {
                height: "50px",
                width: "200px"
              }
          }
      }
  });

    comp.addType("typeGrafica", {
      isComponent: el => {
          return el.tagName === "IMG"
      },

      extend: "typeThumbnail",

      model: {
          defaults: {
              traits: [{
                  type: 'select',
                  name: 'src',
                  label: "Tipo",
                  options: [
                      { value: '/Images/ImagenesPub/AMENORREA.jpg', name: 'Grafica Amenorrea' },
                      { value: '/Images/ImagenesPub/Circunferencia craneana.jpg', name: 'Grafica Circunferencia Craneana' },
                      { value: '/Images/ImagenesPub/GRAFICO RX ODONTOLOGIA.jpg', name: 'Grafica RX Odontologia' },
                      { value: '/Images/ImagenesPub/indice placa f.jpg', name: 'Grafica Indice Placa F' },
                      { value: '/Images/ImagenesPub/indice placa i.jpg', name: 'Grafica Indice Placa I' },
                      { value: '/Images/ImagenesPub/od.jpg', name: 'Grafica Od' },
                      { value: '/Images/ImagenesPub/oi.jpg', name: 'Grafica Oi' },
                      { value: '/Images/ImagenesPub/periodontograma.jpg', name: 'Grafica Periodontograma' },
                      //{ value: '/Images/ImagenesPub/Imagen paciente.jpg', name: 'Grafica Imagen Paciente' }, No muestra ninguna gráfica por el momento.
                  ]
              },
                  {
                      type: 'input',
                      name: 'id',
                      label: "Id"
                  }
              ]
          }
      }
  });

  




  // EDICIONES HAROLD
  comp.addType("textoFijoTabla", {
    extend: 'text',
    isComponent: el => el.tagName == 'p',

    model: {
      defaults: {
        stylable: false,
        draggable: false,
        removable: false,
        copyable: false,
        tagName: 'p',
        name: "Texto fijo",
        components: 'Texto fijo',
        traits: [],
        style: {
          margin: 0,
          padding: 0
        }
      },
    },
  });

  comp.addType("neutro", {
    model: {
      defaults: {
        stylable: false,
        draggable: false,
        removable: false,
        copyable: false,
        traits: []
      },
    },
  })
  
  const opcionesCeldas = [
    { value: 0, name: "Texto" },
    { value: 1, name:"Entero" },
    { value: 2, name: "Real" },
    { value: 4, name: "Fecha" },
    { value: 5, name: "Fórmula" },
    { value: 6, name: "Texto fijo" },
    { value: 9, name: "Lista" },
    { value: 10, name: "Hora militar" },
  ];
  
  comp.addType("celdaTabla", {
    extedn: "cell",
    isComponent: el => el.tagName == 'TD' || el.tagName == 'TH',

    model: {
      defaults: {
        stylable: false,
        draggable: false,
        removable: false,
        copyable: false,
        tagName: "td",
        name: "Tipo celda",
        traits: [{
          type: 'select',
          name: 'data-tipo',
          label: "Tipo",
          options: opcionesCeldas
        }, {
          type: 'text',
          name: 'value',
          changeProp: 1,
          label: "Valor"
        }]
      },

      init() {
        console.log(this);
        this.on('change:attributes:data-tipo', this.handleTypeChange);
      },
  

      handleTypeChange() {
        const tipoSel = parseInt(this.getAttributes()["data-tipo"]);
        const style = {
          width: "100%",
          margin: 0,
          padding: 0
        }

        const propCeldadDefault = {
          copyable: false,
          draggable: false,
          droppable: false,
          stylable: false
        }
        
        const placeholder = opcionesCeldas.find(op => op.value === tipoSel).name;

        switch(tipoSel) {
          case 0: case 5: 
            this.components().reset({ 
              ...propCeldadDefault,
              tagName: "input", 
              attributes: {
                type: "text", "data-tipo": tipoSel,
                placeholder
              },
              style
            });
            break;
            
          case 1: case 2:
            this.components().reset({ 
              ...propCeldadDefault,
              tagName: "input", style,
              attributes: {type: "number", "data-tipo": tipoSel, placeholder}
            });
            break;
          case 4:
            this.components().reset({ 
              ...propCeldadDefault,
              tagName: "input", style,
              attributes: {type: "date", "data-tipo": tipoSel}
            });
            break;
          case 6:
            this.components().reset({ 
              components: "Contenido", style,
              ...propCeldadDefault,
              tagName: "p",
              type: "text",
              attributes: {"data-tipo": tipoSel}
            });
            break;
          case 9: 
            this.components().reset({ 
              style,
              ...propCeldadDefault,
              tagName: "select",
              type: "select",
              attributes: {"data-tipo": tipoSel}
            });
            break;
          case 10:
            this.components().reset({ 
              ...propCeldadDefault,
              tagName: "input", style,
              attributes: {type: "time", "data-tipo": tipoSel}
            });
            break;
              
        }

        console.log(this);
      }
    },
  });

}