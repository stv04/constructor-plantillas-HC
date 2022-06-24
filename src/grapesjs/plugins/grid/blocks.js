import { typeInput, typeTextarea, typeRadio, typeLabel, typeSelect, typeOption } from "../../types/formTypes.js";
import { typeCol1, typeCol2, typeCol3, typeCol4, typeCol6, typeConcepto, typeGrupo, typeRotulo, typeGrupoBody, typeRow, typeThumbnail, typeGrafica, typeGraficaCYDTalla, typeFormula, typeListaDesplegable, typeListaAsociada, typeTable, typeCeldaTable } from "../../types/gridTypes.js";
import { Texto, Numerico, Fecha, Memorando, Opcion, Seleccion, Comentario, Hora, Odontograma, Higieneograma, Grafica, FirmaDigital, Tabla, Etiqueta, GraficaXY, Formula, TextoFijo, ListaDesplegable, ListaAsociada, TextoSegmentado, FormulaOpcion, Grafica_CyD_Talla, ICDAS_Simplificado, IndicePlacaBacterianaSilness_Loe, Periodontograma, RIPS1, RIPS2 } from "../../types/conceptTypes.js";

const styleMinHeight = '<style>.min-h{min-height: 70px}</style>'

export default (editor, opts) => {
    const bm = editor.BlockManager;
    const category = {
        id: "complement",
        label: "Especiales",
        open: false
    }
    const basicCategory = {
        id: "basicCategory",
        label: "Básicos",
        open: false
    }
    const odontoCategory = {
        id: "odontoCategory",
        label: "Odontológicos",
        open: false
    }

    // 1 column
    bm.add(typeGrupo, {
        label: "GRUPOS",
        attributes: {class:'gjs-fonts gjs-f-b1 gjs-groups'},
        content: {
            type: typeGrupo,
            components: [
                { type: typeRotulo },
                {
                    type: typeGrupoBody,
                }
            ],
            isImportant: true,
        },
        //category
    });

    //bm.add(typeConcepto, {
    //    label: "CONCEPTO",
    //    attributes: {class:'gjs-fonts gjs-f-b1 gjs-concepts'},
    //    content: {
    //        type: typeConcepto,
    //        components: [
    //            {type: typeRotulo, content: "Seleccione concepto"},
    //            {type: typeInput}
    //        ],
    //        isImportant: true,
    //    },
    //    //category
    //});

    //Conjunto de bloques básicos
    bm.add(Numerico, {
        label: "Numerico",
        attributes: { class: 'gjs-fonts gjs-f-b1 gjs-concepts' },
        content: {
            type: typeConcepto,
            attributes: { 'data-type_concept': Numerico},
            components: [
                { type: typeRotulo, content: "Seleccione Rotulo" },
                { type: typeInput, attributes: { type: "number" } }
            ],
            isImportant: true,
        },
        category: basicCategory
    });
    bm.add(Texto, {
        label: "Texto",
        attributes: { class: 'gjs-fonts gjs-f-b1 gjs-concepts' },
        content: {
            type: typeConcepto,
            attributes: { 'data-type_concept': Texto },
            components: [
                { type: typeRotulo, content: "Seleccione Rotulo" },
                { type: typeInput }
            ],
            isImportant: true,
        },
        category: basicCategory
    });
    bm.add(Fecha, {
        label: "Fecha",
        attributes: { class: 'gjs-fonts gjs-f-b1 gjs-concepts' },
        content: {
            type: typeConcepto,
            attributes: { 'data-type_concept': Fecha },
            components: [
                { type: typeRotulo, content: "Seleccione Rotulo" },
                { type: typeInput, attributes: { type: "date" } }
            ],
            isImportant: true,
        },
        category: basicCategory
    });
    bm.add(Memorando, {
        label: "Memorando",
        attributes: { class: 'gjs-fonts gjs-f-b1 gjs-concepts' },
        content: {
            type: typeConcepto,
            attributes: { 'data-type_concept': Memorando },
            components: [
                { type: typeRotulo, content: "Seleccione Rotulo" },
                { type: typeTextarea }
            ],
            isImportant: true,
        },
        category: basicCategory
    });
    bm.add(Opcion, {
        label: "Opción",
        attributes: { class: 'gjs-fonts gjs-f-b1 gjs-concepts' },
        content: {
            type: typeConcepto,
            attributes: { 'data-type_concept': Opcion },
            components: [
                { type: typeRotulo, content: "Seleccione Rotulo" },
                { type: typeRadio }
            ],
            isImportant: true,
        },
        category: basicCategory
    });
    bm.add(Seleccion, {
        label: "Selección",
        attributes: { class: 'gjs-fonts gjs-f-b1 gjs-concepts' },
        content: {
            type: typeConcepto,
            attributes: { 'data-type_concept': Seleccion },
            components: [
                { type: typeRotulo, content: "Seleccione Rotulo" },
                { type: typeInput, attributes: { type: "checkbox" } }
            ],
            isImportant: true,
        },
        category: basicCategory
    });
    bm.add(Comentario, {
        label: "Comentario",
        attributes: { class: 'gjs-fonts gjs-f-b1 gjs-concepts' },
        content: {
            type: typeConcepto,
            attributes: { 'data-type_concept': Comentario },
            components: [
                { type: typeRotulo, content: "Seleccione Rotulo" },
                //{ type: typeLabel }
            ],
            isImportant: true,
        },
        category: basicCategory
    });
    bm.add(Hora, {
        label: "Hora",
        attributes: { class: 'gjs-fonts gjs-f-b1 gjs-concepts' },
        content: {
            type: typeConcepto,
            attributes: { 'data-type_concept': Hora },
            components: [
                { type: typeRotulo, content: "Seleccione Rotulo" },
                { type: typeInput, attributes: { type: "time" } }
            ],
            isImportant: true,
        },
        category: basicCategory
    });
    bm.add(Grafica, {
        label: "Gráfica",
        attributes: { class: 'gjs-fonts gjs-f-b1 gjs-concepts' },
        content: {
            type: typeConcepto,
            attributes: { 'data-type_concept': Grafica },
            components: [
                { type: typeRotulo, content: "Gráfica" },
                { type: typeGrafica, attributes: { src: "/Images/ImagenesPub/AMENORREA.jpg", "data-concepto_especial": typeGrafica } },
                //Es un lienzo tipo paint, donde se carga una imagen según una selección, para su posterior edición con el uso del paint.
            ],
            isImportant: true,
        },
        category
    });
    //bm.add(FirmaDigital, {
    //    label: "Firma Digital",
    //    attributes: { class: 'gjs-fonts gjs-f-b1 gjs-concepts' },
    //    content: {
    //        type: typeConcepto,
    //        attributes: { 'data-type_concept': FirmaDigital },
    //        components: [
    //            { type: typeRotulo, content: "Firma Digital" },
    //            { type: typeThumbnail, attributes: { src: "/Images/ImagenesPub/escudo1.png" } },
    //        ],
    //        isImportant: true,
    //    },
    //    category: basicCategory
    //});
    //bm.add(Tabla, {
    //    label: "Tabla",
    //    attributes: { class: 'gjs-fonts gjs-f-b1 gjs-concepts' },
    //    content: {
    //        type: typeConcepto,
    //        attributes: { 'data-type_concept': Tabla },
    //        components: [
    //            { type: typeRotulo, content: "Tabla" },
    //            // Se debe crear una tabla por defecto
    //        ],
    //        isImportant: true,
    //    },
    //    category: basicCategory
    //});
    ////CONCEPTO DE TIPO TABLE
    //bm.add(Tabla, {
    //    label: "Tabla",
    //    content: {
    //        type: typeTable,
    //        classes: "table",
    //        attributes: { style: "position: absolute;", 'data-type_concept': Tabla },

    //        components: [
    //            {
    //                type: "thead",
    //                components: {
    //                    type: "row",
    //                    components: [
    //                        {
    //                            type: "cell",
    //                            tagName: "th",
    //                            components: { type: "textoFijoTabla" }
    //                        },
    //                        {
    //                            type: "cell",
    //                            tagName: "th",
    //                            components: { type: "textoFijoTabla" }
    //                        }
    //                    ]
    //                }

    //            },
    //            {
    //                type: "tbody",
    //                components: [{
    //                    type: "row",
    //                    components: [
    //                        {
    //                            type: "cell",
    //                            tagName: "td",
    //                            components: { type: "textoFijoTabla" }
    //                        },
    //                        {
    //                            type: "cell",
    //                            tagName: "td",
    //                            components: { type: "textoFijoTabla" }
    //                        }
    //                    ]
    //                }, {
    //                    type: "row",
    //                    components: [
    //                        {
    //                            type: "cell",
    //                            tagName: "td",
    //                            components: { type: "inputTabla" }
    //                        },
    //                        {
    //                            type: "cell",
    //                            tagName: "td",
    //                            components: { type: "inputTabla" }
    //                        }
    //                    ]
    //                }]

    //            },
    //        ],
    //        isImportant: true,

    //    },
    //    category
    //})
    function buildCeldaTabla(isEncabezado) {
        return {
            type: typeCeldaTable,
            selectable: isEncabezado ? false : true,
            tagName: isEncabezado ? "th" : "td",
            components: {
                copyable: false,
                draggable: false,
                droppable: false,
                stylable: false,
                components: isEncabezado ? "Encabezado" : "Contenido",
                style: {
                    width: "100%",
                    margin: 0,
                    padding: 0
                },
                tagName: "p",
                type: "text",
                attributes: { "data-tipo": 6 }
            }
        }
    }
    //CONCEPTO DE TIPO TABLE
    bm.add(Tabla, {
        label: "Tabla",
        content: {
            type: typeTable,
            classes: "table",
            idConceptoDB: 23021,
            attributes: { style: "position: absolute;", 'data-type_concept': Tabla },

            components: [
                {
                    type: "thead",
                    selectable: false,
                    components: {
                        type: "row",
                        draggable: false,
                        droppable: false,
                        selectable: false,
                        components: [
                            buildCeldaTabla(true), buildCeldaTabla(true)
                        ]
                    }

                },
                {
                    type: "tbody",
                    selectable: false,
                    components: [{
                        type: "row",
                        draggable: false,
                        droppable: false,
                        components: [
                            buildCeldaTabla(),
                            buildCeldaTabla()
                        ]
                    }]

                },
            ],
            isImportant: true,

        },
        category
    });
    bm.add(Etiqueta, {
        label: "Etiqueta",
        attributes: { class: 'gjs-fonts gjs-f-b1 gjs-concepts' },
        content: {
            type: typeConcepto,
            attributes: { 'data-type_concept': Etiqueta },
            components: [
                { type: typeRotulo, content: "Seleccione la etiqueta" },
                { type: typeLabel }
            ],
            isImportant: true,
        },
        category: basicCategory
    });
    //bm.add(GraficaXY, {
    //    label: "Grafica XY",
    //    attributes: { class: 'gjs-fonts gjs-f-b1 gjs-concepts' },
    //    content: {
    //        type: typeConcepto,
    //        attributes: { 'data-type_concept': GraficaXY },
    //        components: [
    //            { type: typeRotulo, content: "Grafica XY" },
    //            // Gráfica sin contenido
    //        ],
    //        isImportant: true,
    //    },
    //    category: basicCategory
    //});
    bm.add(Formula, {
        label: "Formula",
        attributes: { class: 'gjs-fonts gjs-f-b1 gjs-concepts' },
        content: {
            type: typeConcepto,
            attributes: { 'data-type_concept': Formula },
            components: [
                { type: typeRotulo, content: "Formula" },
                { type: typeFormula, attributes: { "data-concepto_especial": typeFormula } }
            ],
            isImportant: true,
        },
        category
    });
    bm.add(TextoFijo, {
        label: "Texto Fijo",
        attributes: { class: 'gjs-fonts gjs-f-b1 gjs-concepts' },
        content: {
            type: typeConcepto,
            attributes: { 'data-type_concept': TextoFijo },
            components: [
                { type: typeRotulo, content: "Seleccione Texto Fijo" },
                { type: typeLabel }
                // Éste concepto no tiene opciones especiales. Y tampoco trae algún tipo de input específico.
            ],
            isImportant: true,
        },
        category: basicCategory
    });
    bm.add(RIPS2, {
        label: "Lista desplegable",
        attributes: { class: 'gjs-fonts gjs-f-b1 gjs-concepts' },
        content: {
            type: typeConcepto,
            attributes: { 'data-type_concept': RIPS2 },
            components: [
                { type: typeRotulo, content: "Seleccione Texto de la lista" },
                { type: typeSelect, components: { type: typeOption, components: "Lista Desplegable" } }
            ],
            isImportant: true,
        },
        category
    });
    bm.add(RIPS1, {
        label: "Lista asociada",
        attributes: { class: 'gjs-fonts gjs-f-b1 gjs-concepts' },
        content: {
            type: typeConcepto,
            attributes: { 'data-type_concept': RIPS1 },
            components: [
                { type: typeRotulo, content: "Seleccione Texto de la lista" },
                { type: typeSelect, components: { type: typeOption, components: "Lista Asociada" } }
            ],
            isImportant: true,
        },
        category
    });
    //bm.add(TextoSegmentado, {
    //    label: "Texto segmentado",
    //    attributes: { class: 'gjs-fonts gjs-f-b1 gjs-concepts' },
    //    content: {
    //        type: typeConcepto,
    //        attributes: { 'data-type_concept': TextoSegmentado },
    //        components: [
    //            { type: typeRotulo, content: "Seleccione Texto" },
    //            { type: typeLabel }
    //        ],
    //        isImportant: true,
    //    },
    //    category: basicCategory
    //});
    //bm.add(FormulaOpcion, {
    //    label: "Formula opcion",
    //    attributes: { class: 'gjs-fonts gjs-f-b1 gjs-concepts' },
    //    content: {
    //        type: typeConcepto,
    //        attributes: { 'data-type_concept': FormulaOpcion },
    //        components: [
    //            { type: typeRotulo, content: "Seleccione Texto Formula" },
    //            //No existe ejemplo del concepto
    //        ],
    //        isImportant: true,
    //    },
    //    category: basicCategory
    //});
    bm.add(Odontograma, {
        label: "Odontograma",
        attributes: { class: 'gjs-fonts gjs-f-b1 gjs-concepts' },
        content: {
            type: typeConcepto,
            attributes: { 'data-type_concept': Odontograma },
            components: [
                { type: typeRotulo, content: "Odontograma" },
                { type: typeThumbnail, attributes: { src: "/Images/parametrizador/odontograma.png", "data-concepto_especial": typeThumbnail }, style: { "width": "950px", "height": "510px", "min-width": "950px", "min-height": "510px" } },
            ],
            isImportant: true,
        },
        category: odontoCategory
    });
    bm.add(Higieneograma, {
        label: "Higieneograma",
        attributes: { class: 'gjs-fonts gjs-f-b1 gjs-concepts' },
        content: {
            type: typeConcepto,
            attributes: { 'data-type_concept': Higieneograma },
            components: [
                { type: typeRotulo, content: "Higieneograma" },
                { type: typeThumbnail, attributes: { src: "/Images/parametrizador/higieneograma.png", "data-concepto_especial": typeThumbnail }, style: { "width": "867px", "height": "405px", "min-width": "867px", "min-height": "405px" } },
            ],
            isImportant: true,
        },
        category: odontoCategory
    });
    bm.add(Periodontograma, {
        label: "Periodontograma",
        attributes: { class: 'gjs-fonts gjs-f-b1 gjs-concepts' },
        content: {
            type: typeConcepto,
            attributes: { 'data-type_concept': Periodontograma },
            components: [
                { type: typeRotulo, content: "Periodontograma" },
                { type: typeThumbnail, attributes: { src: "/Images/parametrizador/periodontograma.png", "data-concepto_especial": typeThumbnail }, style: { "width": "820px", "height": "1600px", "min-width": "820px", "min-height": "1600px" } },
            ],
            isImportant: true,
        },
        category: odontoCategory
    });
    bm.add(ICDAS_Simplificado, {
        label: "ICDAS",
        attributes: { class: 'gjs-fonts gjs-f-b1 gjs-concepts' },
        content: {
            type: typeConcepto,
            attributes: { 'data-type_concept': ICDAS_Simplificado },
            components: [
                { type: typeRotulo, content: "ICDAS" },
                { type: typeThumbnail, attributes: { src: "/Images/parametrizador/ICDAS.png", "data-concepto_especial": typeThumbnail }, style: { "width": "1000px", "height": "667px", "min-width": "1000px", "min-height": "667px" } },
            ],
            isImportant: true,
        },
        category: odontoCategory
    });
    bm.add(IndicePlacaBacterianaSilness_Loe, {
        label: "Indice de placa Silness & Loe modificado",
        attributes: { class: 'gjs-fonts gjs-f-b1 gjs-concepts' },
        content: {
            type: typeConcepto,
            attributes: { 'data-type_concept': IndicePlacaBacterianaSilness_Loe },
            components: [
                { type: typeRotulo, content: "Indice de placa bacteriana Silness & Loe" },
                { type: typeThumbnail, attributes: { src: "/Images/parametrizador/silnessloe.png", "data-concepto_especial": typeThumbnail }, style: { "width": "880px","height": "220px","min-width": "880px","min-height":"220px"} },
            ],
            isImportant: true,
        },
        category: odontoCategory
    });
}