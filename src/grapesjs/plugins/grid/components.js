import modalConfiguracionOrtodoncia from "../../scripts/modalConfiguracionOrtodoncia.js";
import { typeCol1, typeCol2, typeCol3, typeCol4, typeCol6, typeConcepto, typeGrupo, typeGrupoBody, typeRotulo, typeRow, typeThumbnail, typeGrafica, typeGraficaCYDTalla, typeFormula, typeListaDesplegable, typeTable, typeCeldaTable, typeTextoFijoTabla, typeInputTabla } from "../../types/gridTypes.js";

const opcionesCeldas = [
    { value: 0, name: "Texto" },
    { value: 1, name: "Entero" },
    { value: 2, name: "Real" },
    //{ value: 4, name: "Fecha" },
    { value: 5, name: "Fórmula" },
    { value: 6, name: "Texto fijo" },
    { value: 9, name: "Lista" },
    { value: 10, name: "Hora militar" },
];

const configuracionesDefectoConcepto = [
    {
        type: 'select',
        name: 'data-genero',
        label: "Genero",
        options: [
            { value: 0, name: 'Ambos' },
            { value: 1, name: 'Masculino' },
            { value: 2, name: 'Femenino' },
        ]
    },
    //Textos
    {
        type: "text",
        name: "data-dependiente",
        label: "Dependiente"
    },

    // Num�ricos
    {
        type: 'number',
        name: 'data-maxlength',
        label: "Long. car�cteres",
    },
    {
        type: 'number',
        name: 'data-max',
        label: "Valor m�x.",
    },
    {
        type: 'number',
        name: 'data-min',
        label: "Valor m�n",
    },
    {
        type: 'text',
        name: 'data-value',
        label: "Valor por defecto",
    },

    // Edades
    {
        type: 'number',
        name: 'data-edad_min',
        label: "Edad m�nima",
    },
    {
        type: 'number',
        name: 'data-edad_max',
        label: "Edad m�xima",
    },
    {
        type: 'select',
        name: 'data-tipo_edad',
        label: "Tipo edad",
        options: [
            { value: 1, name: 'A�os' },
            { value: 2, name: 'Meses' },
            { value: 3, name: 'D�as' },
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
          //attributes: { style: "position: absolute;", class: "grupo" },
          style: {
            height: "100px",
              width: "600px",
            position: "absolute"
          },
          traits: [{
            name: "grupoHist",
            label: "Datos",
            type: "grupos-options"
          }, {
            type: 'button',
            label: "Crear",
            text: 'Nuevo',
            full: true, // Full width button
            command: "crear-grupo_hist"
                }],
            stylable: ["width", "height", "top", "left", "background-color", "border"]
        }
      }
    });

    comp.addType(typeGrupoBody, {
        isComponent: el => el.tagName == 'DIV',

        model: {
            defaults: {
                draggable: false,
                droppable: "*",
                selectable: false,
                tagName: 'div',
                attributes: { style: "padding: 5px;", class: "grupo-body" },
                style: {
                    height: "calc(100% - 28px)",
                    width: "100%"
                }
            }
        }
    });

    comp.addType(typeConcepto, {
      isComponent: el => el.tagName == 'DIV',
          
      model: {
        defaults: {
          draggable: ".grupo-body",
          droppable: false,
          tagName: 'div',
          //attributes: { style: "position: absolute;" },
          traits: [{
            name: "conceptoHist",
            label: "Datos",
            type: "conceptos-options"
          }, {
            type: 'button',
            label: "Crear",
            text: 'Nuevo',
            full: true, // Full width button
            command: "crear-concepto_hist"
          }, ...configuracionesDefectoConcepto
            ],
            style: { top: 0, position: "absolute" },
            stylable: ["width", "height", "top", "left", "background-color"]
        }
      }
    });

    comp.addType(typeThumbnail, {
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

    comp.addType(typeGrafica, {
        isComponent: el => {
            return el.tagName === "IMG"
        },

        extend: typeThumbnail,

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
                        //{ value: '/Images/ImagenesPub/Imagen paciente.jpg', name: 'Grafica Imagen Paciente' }, No muestra ninguna gr�fica por el momento.
                    ]
                },
                {
                    type: 'button',
                    text: "Agregar imágen",
                    full: true,
                    command: "guardar-imagen"
                }
                ]
            },

            init() {
              console.log('Local hook: view.init');
            },
            onRender() {
              console.log('Local hook: view.onRender');
            },
            view: {
            },
        }
    });

    comp.addType(typeFormula, {
        isComponent: el => el.tagName == 'INPUT',

        model: {
            defaults: {
                draggable: false,
                droppable: false,
                removable: false,
                copyable: false,
                tagName: 'input',
                //attributes: { style: "position: absolute;" },
                traits: [{
                    name: "formula",
                    label: "Formula",
                    type: "campos-calc"
                }]
            }
        }
    });

    comp.addType(typeListaDesplegable, {
        isComponent: el => el.tagName == 'SELECT',

        model: {
            defaults: {
                draggable: false,
                droppable: false,
                removable: false,
                copyable: false,
                tagName: 'select',
                traits: [{
                    type: 'select',
                    name: 'data-query',
                    label: "Listas",
                    options: [
                        { value: 'ETNIA', name: 'ETNIA' },
                        { value: 'METODO_PL', name: 'METODO_PL' },
                        { value: 'Hall_L', name: 'Hall_L' },
                        { value: 'REGI', name: 'REGI' },
                        { value: 'CITOLOGIA', name: 'CITOLOGIA' },
                        { value: 'VINCULO', name: 'VINCULO' },
                        { value: 'IDESTD_A', name: 'IDESTD_A' },
                        { value: 'CICLO_M', name: 'CICLO_M' },
                        { value: 'TIPODOC', name: 'TIPODOC' },
                        { value: 'SEGSOC', name: 'SEGSOC' }
                    ]
                }]
            },
            
           
        }
    });

    //comp.addType(typeGraficaCYDTalla, {
    //    isComponent: el => {
    //        return el.tagName === "IMG"
    //    },

    //    extend: typeThumbnail,

    //    model: {
    //        defaults: {
    //            traits: [{
    //                type: 'select',
    //                name: 'src',
    //                label: "Tipo",
    //                options: [
    //                    { value: '/Images/ImagenesPub/Ni�asLongitudEdad_0_2.png', name: 'Grafica Ninas Longitud Edad 0-2' },
    //                    { value: '/Images/ImagenesPub/Ni�asLongitudEdad_2_5.png', name: 'Grafica Ninas Logintud Edad 2-5' },
    //                    { value: '/Images/ImagenesPub/Ni�osLongitudEdad_0_2.png', name: 'Grafica Ninos Longitud Edad 0-2' },
    //                    { value: '/Images/ImagenesPub/Ni�osLongitudEdad_2_5.png', name: 'Grafica Ninos Logintud Edad 2-5' },
    //                    { value: '/Images/ImagenesPub/CYD/CYD_Talla_para_la edad_Ni�as_5a18_a�os.png', name: 'Grafica CYD Talla para la edad ninas 5-18 anos' },
    //                    { value: '/Images/ImagenesPub/CYD/CYD_Talla_para_la edad_Ni�os_5a18_a�os.png', name: 'Grafica CYD Talla para la edad ninos 5-18 anos' },
    //                ]
    //                }, {
    //                    type: 'input',
    //                    name: 'value',
    //                    label: "Punto cero en X"
    //                },{
    //                    type: 'input',
    //                    name: 'value',
    //                    label: "Punto cero en Y"
    //                },{
    //                    type: 'input',
    //                    name: 'value',
    //                    label: "Punto inicio en X"
    //                },{
    //                    type: 'input',
    //                    name: 'value',
    //                    label: "Punto inicio en Y"
    //                },{
    //                    type: 'input',
    //                    name: 'value',
    //                    label: "Tamano escala X"
    //                },{
    //                    type: 'input',
    //                    name: 'value',
    //                    label: "Tamano escala Y"
    //                },{
    //                    type: 'input',
    //                    name: 'value',
    //                    label: "Tamano unidad X"
    //                },{
    //                    type: 'input',
    //                    name: 'value',
    //                    label: "Tamano unidad Y"
    //                },{
    //                    type: 'input',
    //                    name: 'value',
    //                    label: "Concepto asociado X"
    //                },{
    //                    type: 'input',
    //                    name: 'value',
    //                    label: "Concepto asociado Y"
    //                },
    //            ]
    //        }
    //    }
    //});

    comp.addType(typeRotulo, {
      isComponent: el => {
        console.log(el);
        return el.tagName === "DIV"
      },

      model: {
        defaults: {
          draggable: false,
          droppable: false,
          removable: false,
          copyable: false,
          tagName: "div",
          attributes: { style: "padding: 5px;" },
          content: "Seleccione grupo",
          stylable: [
            "background-color",
            "text-align", "color", "font-size", "display",
            "font-weight"
          ]
        }
      }
    })

    //comp.addType(typeTable, {
    //    isComponent: el => el.tagName == 'TABLE',
    //    extend: typeConcepto,
    //    model: {
    //        defaults: {
    //            tagName: 'table',
    //        },
            
    //    }
    //});
    comp.addType(typeTable, {
        isComponent: el => el.tagName == 'TABLE',
        extend: typeConcepto,
        model: {
            defaults: {
                tagName: 'table',
                traits: [{
                    type: "button",
                    label: "Ctrl. fila",
                    text: "Agregar Fila",
                    command: "agregar_fila_tabla"
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

    comp.addType(typeCeldaTable, {
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

                switch (tipoSel) {
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
                            attributes: { type: "number", "data-tipo": tipoSel, placeholder }
                        });
                        break;
                    case 4:
                        this.components().reset({
                            ...propCeldadDefault,
                            tagName: "input", style,
                            attributes: { type: "date", "data-tipo": tipoSel }
                        });
                        break;
                    case 6:
                        this.components().reset({
                            components: "Contenido", style,
                            ...propCeldadDefault,
                            tagName: "p",
                            type: "text",
                            attributes: { "data-tipo": tipoSel }
                        });
                        break;
                    case 9:
                        this.components().reset({
                            style,
                            ...propCeldadDefault,
                            tagName: "select",
                            type: "select",
                            attributes: { "data-tipo": tipoSel }
                        });
                        break;
                    case 10:
                        this.components().reset({
                            ...propCeldadDefault,
                            tagName: "input", style,
                            attributes: { type: "time", "data-tipo": tipoSel }
                        });
                        break;

                }

                console.log(this);
            }
        },
    });

    //comp.addType(typeTextoFijoTabla, {
    //    extend: 'text',
    //    isComponent: el => el.tagName == 'p',

    //    model: {
    //        defaults: {
    //            stylable: false,
    //            draggable: false,
    //            removable: false,
    //            copyable: false,
    //            tagName: 'p',
    //            name: "Texto fijo",
    //            components: 'Texto fijo',
    //            traits: [],
    //            style: {
    //                margin: 0,
    //                padding: 0
    //            }
    //        },
    //    },
    //});

    //comp.addType(typeInputTabla, {
    //    extend: "input",
    //    isComponent: el => el.tagName == 'INPUT',

    //    model: {
    //        defaults: {
    //            stylable: false,
    //            draggable: false,
    //            removable: false,
    //            copyable: false,
    //            tagName: 'input',
    //            name: "Tipos celda",
    //            attributes: { type: "text" },
    //            traits: [{
    //                type: 'select',
    //                name: 'type',
    //                label: "Tipo",
    //                options: [
    //                    { value: 'text', name: "Texto" },
    //                    { value: 'number', name: "Num�rico" },
    //                    { value: 'date', name: "Fecha" },
    //                    { value: 'time', name: "Hora militar" },
    //                ]
    //            }],
    //            style: {
    //                width: "100%"
    //            }
    //        },
    //    },
    //});

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