import { typeInput } from "../../types/formTypes.js";
import { typeCol1, typeCol2, typeCol3, typeCol4, typeCol6,  typeConcepto,  typeGrupo,  typeRotulo,  typeRow } from "../../types/gridTypes.js";

const styleMinHeight = '<style>.min-h{min-height: 70px}</style>'

export default (editor, opts) => {
    const bm = editor.BlockManager;
    const category = {
        id: "complement",
        label: "Complementos"
    }

    // titulo
    bm.add("title", {
        label: "Título",
        content: {
            type: "tittle",
            content: "Ingrese título",
        },
        category
    });

    // 1 column
    bm.add(typeCol1, {
        label: "1 columna",
        attributes: {class:'gjs-fonts gjs-f-b1'},
        content: {
            type: typeRow,
            components: [
                styleMinHeight,
                '<div class="min-h col-12"></div>',
            ],
            isImportant: true,
        },
        category
    });

    // 2 column
    bm.add(typeCol2, {
        label: "2 columnas",
        attributes: {class:'gjs-fonts gjs-f-b2'},
        content: {
            type: typeRow,
            components: [
                styleMinHeight,
                '<div class="min-h col-12 col-sm-6"></div>',
                '<div class="min-h col-12 col-sm-6"></div>',
            ]
        },
        category
    });

    // 3 column
    bm.add(typeCol3, {
        label: "3 columnas",
        attributes: {class:'gjs-fonts gjs-f-b3'},
        content: {
            type: typeRow,
            components: [
                styleMinHeight,
                '<div class="min-h col-12 col-sm-4"></div>',
                '<div class="min-h col-12 col-sm-4"></div>',
                '<div class="min-h col-12 col-sm-4"></div>',
            ]
        },
        category
    });

    bm.add("odontograma" , {
        label: "Contenedor Odontograma",
        content: {
            type: "odontograma",
            components: [`<div
            class="modal fade"
            id="modal-odontograma"
            tabindex="-1"
            aria-labelledby="modal-odontogramaLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-xl">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="modal-odontogramaLabel">Modal title</h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  <div class="row">
                      <div class="col-3">
                          <div class="accordion-item">
                              <h2 class="accordion-header" id="header-selector-dg">
                                  <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#content-selector-dg" aria-expanded="true" aria-controls="content-selector-dg">
                                      Diagnóticos
                                  </button>
                              </h2>
                              <div id="content-selector-dg" class="accordion-collapse collapse show" aria-labelledby="header-selector-dg">
                                  <div class="accordion-body">
                                      <div class="btn-group-vertical button-group-sm">
                                          <input type="radio" class="btn-check" name="options-type" data-codType="1" data-nameType="carie" id="selector-carie" autocomplete="off" value="Dx:Caries" checked>
                                          <label class="btn btn-sm btn-outline-secondary" for="selector-carie">Caries</label>
                                  
                                          <input type="radio" class="btn-check" name="options-type" data-codType="2" data-nameType="sinErupcionar"  id="selector-sinErupcionar" value="Dx:Sin erupcionar" autocomplete="off">
                                          <label class="btn btn-sm btn-outline-secondary" for="selector-sinErupcionar">Sin erupcionar</label>
              
                                          <input type="radio" class="btn-check" name="options-type" data-codType="3" data-nameType="porExtraer" id="selector-porExtraer" autocomplete="off" value="Dx:Por extraer">
                                          <label class="btn btn-sm btn-outline-secondary" for="selector-porExtraer">Por extraer</label>
                                  
                                          <input type="radio" class="btn-check" name="options-type" data-codType="4" data-nameType="ausente"  id="selector-ausente" value="Dx:Ausente" autocomplete="off">
                                          <label class="btn btn-sm btn-outline-secondary" for="selector-ausente">Ausente</label>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div class="col">
                          <div class="btn-group btn-group-sm m-2">
                              <input type="radio" class="btn-check" name="donde-procesar" id="seleccionar-superficie" value="superficie" autocomplete="off" checked>
                              <label class="btn btn-outline-primary" for="seleccionar-superficie">Superficie</label>
              
                              <input type="radio" class="btn-check" name="donde-procesar" id="seleccionar-todo" value="Todas" autocomplete="off">
                              <label class="btn btn-outline-primary" for="seleccionar-todo">Todo</label>
                          </div>
                          <div class="text-center">
                              <svg xmlns="http://www.w3.org/2000/svg" id="svg-principal-editor" xmlns:xlink="http://www.w3.org/1999/xlink" max-height="400px" zoomAndPan="magnify"
                              viewBox="0 0 1300 800" preserveAspectRatio="xMidYMid meet" version="1.0">
                  
                                  <defs>
                                      <pattern id="codType-superficie-1" data-codigo="codType-superficie-1" width="100%" height="100%" viewBox="0 0 10 10">
                                          <circle  cx="5" cy="5" r="3" />
                                      </pattern>
                                      
                                      <pattern id="codType-superficie-2" data-codigo="codType-superficie-2" width="100%" height="100%" viewBox="0 0 200 200">
                                          <text fill="#4a90d6" text-anchor="middle" alignment-baseline="middle" stroke="none"
                                              fill-rule="nonzero" font-size="120" font-family="Arial, Helvetica, sans-serif" letter-spacing="0"
                                              word-spacing="0" marker-start="" marker-mid="" marker-end="" id="svg_6" x="100" y="110" width="190"
                                              height="190" style="color: rgb(122, 161, 239); text-align: center; " class="selected" font-weight="bold"
                                              stroke-opacity="1">SE
                                          </text>
                                      </pattern>
                  
                                      <pattern id="codType-superficie-3" data-codigo="codType-superficie-3" width="100%" height="100%" viewBox="0 0 500 500">
                                          <path
                                              style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(247,47,58); fill-rule: nonzero; opacity: 1;"
                                              vector-effect="non-scaling-stroke"
                                              d="M 396.03283 499.999 L 249.99699999999999 353.96142000000003 L 103.96116999999998 500 L -1.4210854715202004e-14 396.03758 L 146.03683 250 L 0.0010000000000047748 103.96242000000001 L 103.96317 1.4210854715202004e-14 L 250 146.03858000000002 L 396.03683 0.0010000000000331966 L 499.999 103.96442000000003 L 353.96317 250.00300000000004 L 500 396.04158000000007 z"
                                              stroke-linecap="round" />
                                      </pattern>
                                      
                                      <pattern id="codType-superficie-4" data-codigo="codType-superficie-4" width="100%" height="100%" viewBox="0 0 100 100">
                                          <line x1="50" y1="0" x2="50" y2="100" style="stroke:rgb(255,0,0);stroke-width:10" />
                                      </pattern>
                                      
                                      <pattern id="codType-superficie-5" data-codigo="codType-superficie-5" width="100%" height="100%" viewBox="0 0 200 200">
                                          <path fill="#4a90d6" stroke="none" stroke-width="2" stroke-linejoin="round" stroke-dashoffset=""
                                              fill-rule="nonzero" marker-start="" marker-mid="" marker-end="" id="svg_1"
                                              d="M3.814534607279169,67.17456916957464 L69.54367424062198,67.17456916957464 L69.54367424062198,0.4740579294517058 L131.4187557946563,0.4740579294517058 L131.4187557946563,67.17456916957464 L197.14786949927782,67.17456916957464 L197.14786949927782,129.9640593209412 L131.4187557946563,129.9640593209412 L131.4187557946563,196.66453767118446 L69.54367424062198,196.66453767118446 L69.54367424062198,129.9640593209412 L3.814534607279169,129.9640593209412 L3.814534607279169,67.17456916957464 z"
                                              style="color: rgb(0, 0, 0);" class="selected" filter="" />
                                      </pattern>
                  
                                      <pattern id="codType-superficie-6" data-codigo="codType-superficie-6" width="100%" height="100%" viewBox="0 0 100 100">
                                          <line x1="30" y1="0" x2="30" y2="100" style="stroke:rgb(6, 189, 0);stroke-width:10" />
                                          <line x1="70" y1="0" x2="70" y2="100" style="stroke:rgb(6, 189, 0);stroke-width:10" />
                                      </pattern>
                                      
                                      <pattern id="codType-superficie-7" data-codigo="codType-superficie-7" width="100%" height="100%" viewBox="0 0 100 100">
                                          <line x1="0" y1="30" x2="10" y2="30" style="stroke:rgb(6, 189, 0);stroke-width:10" />
                                          <line x1="20" y1="30" x2="30" y2="30" style="stroke:rgb(6, 189, 0);stroke-width:10" />
                                          <line x1="40" y1="30" x2="50" y2="30" style="stroke:rgb(6, 189, 0);stroke-width:10" />
                                          <line x1="60" y1="30" x2="70" y2="30" style="stroke:rgb(6, 189, 0);stroke-width:10" />
                                          <line x1="80" y1="30" x2="100" y2="30" style="stroke:rgb(6, 189, 0);stroke-width:10" />
                                          
                                          <line x1="0" y1="70" x2="10" y2="70" style="stroke:rgb(6, 189, 0);stroke-width:10" />
                                          <line x1="20" y1="70" x2="30" y2="70" style="stroke:rgb(6, 189, 0);stroke-width:10" />
                                          <line x1="40" y1="70" x2="50" y2="70" style="stroke:rgb(6, 189, 0);stroke-width:10" />
                                          <line x1="60" y1="70" x2="70" y2="70" style="stroke:rgb(6, 189, 0);stroke-width:10" />
                                          <line x1="80" y1="70" x2="100" y2="70" style="stroke:rgb(6, 189, 0);stroke-width:10" />
                                      </pattern>
                  
                                      <pattern id="codType-superficie-8" data-codigo="codType-superficie-8" width="100%" height="100%" viewBox="0 0 100 100">
                                          <polygon points="50,10 90,75 10,75" style="fill:none;stroke:rgb(122, 161, 239);stroke-width:10" />
                                      </pattern>
                  
                                      <pattern id="codType-superficie-9" data-codigo="codType-superficie-9" width="100%" height="100%" viewBox="0 0 10 10">
                                          <circle  cx="5" cy="5" r="3.5" fill="none" stroke="rgb(255,0,0)" stroke-width="0.5"/>
                                      </pattern>
                  
                                      <pattern id="codType-superficie-10" data-codigo="codType-superficie-10" width="100%" height="100%" viewBox="0 0 100 100">
                                          <line x1="0" y1="50" x2="10" y2="50" style="stroke:rgb(255,0,0);stroke-width:10" />
                                          <line x1="20" y1="50" x2="30" y2="50" style="stroke:rgb(255,0,0);stroke-width:10" />
                                          <line x1="40" y1="50" x2="50" y2="50" style="stroke:rgb(255,0,0);stroke-width:10" />
                                          <line x1="60" y1="50" x2="70" y2="50" style="stroke:rgb(255,0,0);stroke-width:10" />
                                          <line x1="80" y1="50" x2="100" y2="50" style="stroke:rgb(255,0,0);stroke-width:10" />
                                      </pattern>
                  
                                      <pattern id="codType-superficie-11" data-codigo="codType-superficie-11" width="100%" height="100%" viewBox="0 0 100 100">
                                          <circle  cx="50" cy="50" r="40" fill="none" stroke="rgb(122, 161, 239)" stroke-width="4"/>
                                          <circle  cx="50" cy="50" r="10" fill="black"/>
                                      </pattern>
                  
                                      <circle  cx="562" cy="412" r="315" id="seleccion-global" data-codigo="seleccion-global"/>
                  
                                  </defs>
                  
                                  
                                  <!--FIGURA PRINCIPAL-->
                                  <path class="d-none" fill="rgb(85.099792%, 85.099792%, 85.099792%)"
                                  d="M 562.402344 291.984375 C 496.542969 291.984375 443.152344 345.375 443.152344 411.234375 C 443.152344 477.097656 496.542969 530.484375 562.402344 530.484375 C 628.261719 530.484375 681.652344 477.097656 681.652344 411.234375 C 681.652344 345.375 628.261719 291.984375 562.402344 291.984375 "
                                  fill-opacity="1" fill-rule="nonzero" />
                                  
                                  <circle  cx="563" cy="410" r="110" fill="transparent" stroke-width="2" stroke="black" class="superficie-diente" data-superficie="Oclusal" data-codSuperficie="0"/>
                                  
                                  <path class="superficie-diente" data-superficie="Vestibular" data-codSuperficie="1" fill="transparent" stroke="black" stroke-width="2"
                                      d="M 647.21875 326.621094 L 715.234375 258.609375 C 630.878906 174.257812 494.117188 174.257812 409.761719 258.609375 L 477.777344 326.621094 C 524.566406 279.832031 600.429688 279.832031 647.21875 326.621094 Z M 647.21875 326.621094 "
                                      fill-opacity="1" fill-rule="nonzero" />
                  
                                  <path class="superficie-diente" data-superficie="Mesial" data-codSuperficie="2"  fill="transparent" stroke="black" stroke-width="2"
                                      d="M 647.207031 496.054688 L 715.21875 564.066406 C 799.574219 479.714844 799.574219 342.949219 715.21875 258.597656 L 647.207031 326.609375 C 693.996094 373.402344 693.996094 449.265625 647.207031 496.054688 Z M 647.207031 496.054688 "
                                      fill-opacity="1" fill-rule="nonzero" />
                  
                                  <path class="superficie-diente" data-superficie="Lingual" data-codSuperficie="3" fill="transparent" stroke="black" stroke-width="2"
                                      d="M 477.773438 496.042969 L 409.761719 564.054688 C 494.117188 648.40625 630.878906 648.40625 715.230469 564.054688 L 647.21875 496.042969 C 600.429688 542.832031 524.566406 542.832031 477.773438 496.042969 Z M 477.773438 496.042969 "
                                      fill-opacity="1" fill-rule="nonzero" />
                                  
                                  <path class="superficie-diente" data-superficie="Distal" data-codSuperficie="4" fill="transparent" stroke="black" stroke-width="2"
                                      d="M 477.789062 326.609375 L 409.773438 258.597656 C 325.421875 342.949219 325.421875 479.714844 409.773438 564.066406 L 477.789062 496.054688 C 430.996094 449.261719 430.996094 373.398438 477.789062 326.609375 Z M 477.789062 326.609375 "
                                      fill-opacity="1" fill-rule="nonzero" />
                                  
                                  
                                      
                                  <path class="superficie-diente" data-superficie="Gingival vestibular" data-codSuperficie="5" fill="transparent" stroke="black" stroke-width="2"
                                      d="M 407.46875 256.296875 C 493.011719 170.75 631.976562 170.75 717.523438 256.296875 L 783.644531 190.175781 C 661.488281 68.023438 463.503906 68.023438 341.347656 190.175781 Z M 407.46875 256.296875 "
                                      fill-opacity="1" fill-rule="nonzero" />
                                      
                                  <path class="superficie-diente" data-superficie="Gingival lingual" data-codSuperficie="6" fill="transparent" stroke="black" stroke-width="2"
                                      d="M 717.523438 566.363281 C 631.976562 651.910156 493.011719 651.910156 407.46875 566.363281 L 341.347656 632.484375 C 463.503906 754.636719 661.488281 754.636719 783.644531 632.484375 Z M 717.523438 566.363281 "
                                      fill-opacity="1" fill-rule="nonzero" />
                  
                                  <!--FIN DE FIGURA PRINCIPAL-->
                  
                                  <!--A PARTIR DE AQUÍ COMIENZAN LAS FLECHAS-->
                                  <g>
                                      <path stroke-linecap="round" transform="matrix(2.247334, 0, 0, 2.548672, 562.051153, 148.024582)" fill="none"
                                          stroke-linejoin="miter" d="M 0.500428 -0.000449209 L 124.48761 -0.000449209 " stroke="rgb(0%, 0%, 0%)"
                                          stroke-width="1" stroke-opacity="1" stroke-miterlimit="4" />
                                      <path stroke-linecap="round" transform="matrix(2.247334, 0, 0, 2.548672, 848.557883, 148.024582)" fill-opacity="1"
                                          fill="rgb(0%, 0%, 0%)" fill-rule="nonzero" stroke-linejoin="round"
                                          d="M -2.499173 -1.499391 L -0.500277 -0.000449209 L -2.499173 1.500026 Z M -2.499173 -1.499391 "
                                          stroke="rgb(0%, 0%, 0%)" stroke-width="1" stroke-opacity="1" stroke-miterlimit="4" />
                              
                                      <path stroke-linecap="round"
                                          transform="matrix(-2.251634, -0.000000000000000276, 0.000000000000000312, -2.548672, 562.049089, 239.026415)"
                                          fill="none" stroke-linejoin="miter" d="M 0.50062 -0.000364503 L 121.162999 -0.000364503 "
                                          stroke="rgb(0%, 0%, 0%)" stroke-width="1" stroke-opacity="1" stroke-miterlimit="4" />
                                      <path stroke-linecap="round"
                                          transform="matrix(-2.251634, -0.000000000000000276, 0.000000000000000312, -2.548672, 287.547091, 239.026415)"
                                          fill="none" stroke-linejoin="round" d="M -2.499825 -1.499307 L -0.499541 -0.000364503 L -2.499825 1.50011 "
                                          stroke="rgb(0%, 0%, 0%)" stroke-width="1" stroke-opacity="1" stroke-miterlimit="4" />
                              
                                      <path stroke-linecap="round"
                                          transform="matrix(-2.254057, 0.000000000000001277, -0.000000000000001444, -2.548672, 430.730455, 335.843646)"
                                          fill="none" stroke-linejoin="miter" d="M 0.500827 -0.0000407925 L 62.805157 -0.0000407925 "
                                          stroke="rgb(0%, 0%, 0%)" stroke-width="1" stroke-opacity="1" stroke-miterlimit="4" />
                                      <path stroke-linecap="round"
                                          transform="matrix(-2.254057, 0.000000000000001277, -0.000000000000001444, -2.548672, 287.472792, 335.843646)"
                                          fill="none" stroke-linejoin="round" d="M -2.500639 -1.500516 L -0.500773 -0.0000407925 L -2.500639 1.500434 "
                                          stroke="rgb(0%, 0%, 0%)" stroke-width="1" stroke-opacity="1" stroke-miterlimit="4" />
                                          
                                      <path stroke-linecap="round" transform="matrix(-2.251593, -0.0136259, 0.0154235, -2.548626, 562.043761, 409.720704)"
                                          fill="none" stroke-linejoin="miter" d="M 0.499995 -0.000373773 L 121.164583 -0.000229862 "
                                          stroke="rgb(0%, 0%, 0%)" stroke-width="1" stroke-opacity="1" stroke-miterlimit="4" />
                                      <path stroke-linecap="round" transform="matrix(-2.251593, -0.0136259, 0.0154235, -2.548626, 287.541758, 408.059472)"
                                          fill="none" stroke-linejoin="round" d="M -2.500374 -1.500584 L -0.500184 -0.0000465624 L -2.500636 1.500422 "
                                          stroke="rgb(0%, 0%, 0%)" stroke-width="1" stroke-opacity="1" stroke-miterlimit="4" />
                              
                                      <path stroke-linecap="round" transform="matrix(2.247334, 0, 0, 2.548672, 562.051153, 581.752144)" fill="none"
                                          stroke-linejoin="miter" d="M 0.500428 0.000691576 L 124.48761 0.000691576 " stroke="rgb(0%, 0%, 0%)"
                                          stroke-width="1" stroke-opacity="1" stroke-miterlimit="4" />
                                      <path stroke-linecap="round" transform="matrix(2.247334, 0, 0, 2.548672, 848.557883, 581.752144)" fill-opacity="1"
                                          fill="rgb(0%, 0%, 0%)" fill-rule="nonzero" stroke-linejoin="round"
                                          d="M -2.499173 -1.499783 L -0.500277 0.000691576 L -2.499173 1.499634 Z M -2.499173 -1.499783 "
                                          stroke="rgb(0%, 0%, 0%)" stroke-width="1" stroke-opacity="1" stroke-miterlimit="4" />
                                          
                                      <path stroke-linecap="round" transform="matrix(2.247238, 0, 0, 2.548672, 715.230329, 406.300968)" fill="none"
                                          stroke-linejoin="miter" d="M 0.500677 -0.0000733518 L 56.407842 -0.0000733518 " stroke="rgb(0%, 0%, 0%)"
                                          stroke-width="1" stroke-opacity="1" stroke-miterlimit="4" />
                                      <path stroke-linecap="round" transform="matrix(2.247238, 0, 0, 2.548672, 848.733659, 406.300968)" fill-opacity="1"
                                          fill="rgb(0%, 0%, 0%)" fill-rule="nonzero" stroke-linejoin="round"
                                          d="M -2.499277 -1.500548 L -0.500296 -0.0000733518 L -2.499277 1.500401 Z M -2.499277 -1.500548 "
                                          stroke="rgb(0%, 0%, 0%)" stroke-width="1" stroke-opacity="1" stroke-miterlimit="4" />
                              
                                      <path stroke-linecap="round"
                                          transform="matrix(-2.251634, -0.000000000000000276, 0.000000000000000312, -2.548672, 562.049089, 678.031499)"
                                          fill="none" stroke-linejoin="miter" d="M 0.50062 0.0000976812 L 121.162999 0.0000976812 "
                                          stroke="rgb(0%, 0%, 0%)" stroke-width="1" stroke-opacity="1" stroke-miterlimit="4" />
                                      <path stroke-linecap="round"
                                          transform="matrix(-2.251634, -0.000000000000000276, 0.000000000000000312, -2.548672, 287.547091, 678.031499)"
                                          fill="none" stroke-linejoin="round" d="M -2.499825 -1.500377 L -0.499541 0.0000976812 L -2.499825 1.500573 "
                                          stroke="rgb(0%, 0%, 0%)" stroke-width="1" stroke-opacity="1" stroke-miterlimit="4" />
                  
                                  </g>
                  
                                  <!--AQUÍ TERMINAN LAS FLECHAS-->
                  
                                  <!--CUADROS SUPERIORES DERECHO-->
                                  <rect class="superficie-diente" data-superficie="Complementaria" data-codSuperficie="7" fill="transparent" stroke="black" stroke-width="2"
                                  x="1022" y="45" width="60" height="60" />
                                  
                                  <rect class="superficie-diente" data-superficie="-3" data-codSuperficie="8" fill="transparent" stroke="black" stroke-width="2"
                                  x="1022" y="145" width="60" height="60" />
                                  <!--FIN DE CUADROS SUPERIORES DERECHO-->
                  
                                  <!--TEXTOS INFORMATIVOS (DERECHA)-->
                                  <text x="855" y="160" class="texto-superficie-5" font-size="28">
                                      Texto
                                  </text>
                                  <text x="855" y="413" class="texto-superficie-2" font-size="28">
                                      Texto
                                  </text>
                                  <text x="855" y="585" class="texto-superficie-3" font-size="28">
                                      Texto
                                  </text>
                                  
                                  <!--TEXTOS INFORMATIVOS (IZQUIERDA)-->
                                  <text text-anchor="end" x="280" y="250" class="texto-superficie-1" font-size="28">
                                      Texto
                                  </text>
                                  <text text-anchor="end" x="280" y="345" class="texto-superficie-4" font-size="28">
                                      Texto
                                  </text>
                                  <text text-anchor="end" x="280" y="420" class="texto-superficie-0" font-size="28">
                                      Texto
                                  </text>
                                  <text text-anchor="end" x="280" y="690" class="texto-superficie-6" font-size="28">
                                      Texto
                                  </text>
                  
                                  <use xlink:href="#seleccion-global" id="inabilitador-seleccion" class="inabilitador-seleccion" fill="none"/>
                          
                              </svg>
                          </div>
                          
                      </div>
                      <div class="col-3">
                          <div class="accordion-item">
                              <h2 class="accordion-header" id="header-selector-procedimiento">
                                  <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#content-selector-procedimiento" aria-expanded="true" aria-controls="content-selector-procedimiento">
                                      Procedimientos
                                  </button>
                              </h2>
                              <div id="content-selector-procedimiento" class="accordion-collapse collapse show" aria-labelledby="header-selector-procedimiento">
                                  <div class="accordion-body">
                                      <div class="btn-group-vertical button-group-sm">
                                          <input type="radio" class="btn-check" name="options-type" data-codType="5" data-nameType="amalgama" id="selector-amalgama" autocomplete="off" value="Procedimiento:Amalgama">
                                          <label class="btn btn-sm btn-outline-secondary" for="selector-amalgama">Amalgama</label>
                                  
                                          <input type="radio" class="btn-check" name="options-type" data-codType="6" data-nameType="ionomero"  id="selector-ionomero" value="Procedimiento:Ionomero" autocomplete="off">
                                          <label class="btn btn-sm btn-outline-secondary" for="selector-ionomero">Ionomero</label>
              
                                          <input type="radio" class="btn-check" name="options-type" data-codType="7" data-nameType="resina" id="selector-resina" autocomplete="off" value="Procedimiento:Resina">
                                          <label class="btn btn-sm btn-outline-secondary" for="selector-resina">Resina</label>
                                  
                                          <input type="radio" class="btn-check" name="options-type" data-codType="8" data-nameType="endodoncia"  id="selector-endodoncia" value="Procedimiento:Endodoncia" autocomplete="off">
                                          <label class="btn btn-sm btn-outline-secondary" for="selector-endodoncia">Endodoncia</label>
              
                                          <input type="radio" class="btn-check" name="options-type" data-codType="9" data-nameType="protesisFija"  id="selector-protesisFija" value="Procedimiento:Prótesis fija" autocomplete="off">
                                          <label class="btn btn-sm btn-outline-secondary" for="selector-protesisFija">Prótesis fija</label>
              
                                          <input type="radio" class="btn-check" name="options-type" data-codType="10" data-nameType="protesisRemovible"  id="selector-protesisRemovible" value="Procedimiento:Prótesis removible" autocomplete="off">
                                          <label class="btn btn-sm btn-outline-secondary" for="selector-protesisRemovible">Prótesis removible</label>
              
                                          <input type="radio" class="btn-check" name="options-type" data-codType="11" data-nameType="ortodoncia"  id="selector-ortodoncia" value="Procedimiento:Ortodoncia" autocomplete="off">
                                          <label class="btn btn-sm btn-outline-secondary" for="selector-ortodoncia">Ortodoncia</label>
              
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
                  
                  <table class="table table-sm">
                      <thead>
                        <tr>
                          <th scope="col">Action</th>
                          <th scope="col">Superficie</th>
                          <th scope="col">Detalle</th>
                          <th scope="col">Tipo</th>
                        </tr>
                      </thead>
                      <tbody id="seguimiento-molar"></tbody>
                  </table>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="button" id="btn-guardar-configuracion" class="btn btn-primary" data-bs-dismiss="modal">Guardar</button>
                </div>
              </div>
            </div>
          </div>`]
        }
    });

    bm.add("odontogramaEsq", {
        label: "Odontograma",
        content: {
            type: "odontogramaEsq",
            components: [`<svg data-value="[]"
            data-bs-toggle="modal"
            data-bs-target="#modal-odontograma"
            xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" max-height="150px" zoomAndPan="magnify"
            viewBox="300 50 600 700" preserveAspectRatio="xMidYMid meet" version="1.0">
    
                <defs>
                    <pattern id="codType-superficie-1" data-codigo="codType-superficie-1" width="100%" height="100%" viewBox="0 0 10 10">
                        <circle  cx="5" cy="5" r="3" />
                    </pattern>
                    
                    <pattern id="codType-superficie-2" data-codigo="codType-superficie-2" width="100%" height="100%" viewBox="0 0 200 200">
                        <text fill="#4a90d6" text-anchor="middle" alignment-baseline="middle" stroke="none"
                            fill-rule="nonzero" font-size="120" font-family="Arial, Helvetica, sans-serif" letter-spacing="0"
                            word-spacing="0" marker-start="" marker-mid="" marker-end="" id="svg_6" x="100" y="110" width="190"
                            height="190" style="color: rgb(122, 161, 239); text-align: center; " class="selected" font-weight="bold"
                            stroke-opacity="1">SE
                        </text>
                    </pattern>
    
                    <pattern id="codType-superficie-3" data-codigo="codType-superficie-3" width="100%" height="100%" viewBox="0 0 500 500">
                        <path
                            style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(247,47,58); fill-rule: nonzero; opacity: 1;"
                            vector-effect="non-scaling-stroke"
                            d="M 396.03283 499.999 L 249.99699999999999 353.96142000000003 L 103.96116999999998 500 L -1.4210854715202004e-14 396.03758 L 146.03683 250 L 0.0010000000000047748 103.96242000000001 L 103.96317 1.4210854715202004e-14 L 250 146.03858000000002 L 396.03683 0.0010000000000331966 L 499.999 103.96442000000003 L 353.96317 250.00300000000004 L 500 396.04158000000007 z"
                            stroke-linecap="round" />
                    </pattern>
                    
                    <pattern id="codType-superficie-4" data-codigo="codType-superficie-4" width="100%" height="100%" viewBox="0 0 100 100">
                        <line x1="50" y1="0" x2="50" y2="100" style="stroke:rgb(255,0,0);stroke-width:10" />
                    </pattern>
                    
                    <pattern id="codType-superficie-5" data-codigo="codType-superficie-5" width="100%" height="100%" viewBox="0 0 200 200">
                        <path fill="#4a90d6" stroke="none" stroke-width="2" stroke-linejoin="round" stroke-dashoffset=""
                            fill-rule="nonzero" marker-start="" marker-mid="" marker-end="" id="svg_1"
                            d="M3.814534607279169,67.17456916957464 L69.54367424062198,67.17456916957464 L69.54367424062198,0.4740579294517058 L131.4187557946563,0.4740579294517058 L131.4187557946563,67.17456916957464 L197.14786949927782,67.17456916957464 L197.14786949927782,129.9640593209412 L131.4187557946563,129.9640593209412 L131.4187557946563,196.66453767118446 L69.54367424062198,196.66453767118446 L69.54367424062198,129.9640593209412 L3.814534607279169,129.9640593209412 L3.814534607279169,67.17456916957464 z"
                            style="color: rgb(0, 0, 0);" class="selected" filter="" />
                    </pattern>
    
                    <pattern id="codType-superficie-6" data-codigo="codType-superficie-6" width="100%" height="100%" viewBox="0 0 100 100">
                        <line x1="30" y1="0" x2="30" y2="100" style="stroke:rgb(6, 189, 0);stroke-width:10" />
                        <line x1="70" y1="0" x2="70" y2="100" style="stroke:rgb(6, 189, 0);stroke-width:10" />
                    </pattern>
                    
                    <pattern id="codType-superficie-7" data-codigo="codType-superficie-7" width="100%" height="100%" viewBox="0 0 100 100">
                        <line x1="0" y1="30" x2="10" y2="30" style="stroke:rgb(6, 189, 0);stroke-width:10" />
                        <line x1="20" y1="30" x2="30" y2="30" style="stroke:rgb(6, 189, 0);stroke-width:10" />
                        <line x1="40" y1="30" x2="50" y2="30" style="stroke:rgb(6, 189, 0);stroke-width:10" />
                        <line x1="60" y1="30" x2="70" y2="30" style="stroke:rgb(6, 189, 0);stroke-width:10" />
                        <line x1="80" y1="30" x2="100" y2="30" style="stroke:rgb(6, 189, 0);stroke-width:10" />
                        
                        <line x1="0" y1="70" x2="10" y2="70" style="stroke:rgb(6, 189, 0);stroke-width:10" />
                        <line x1="20" y1="70" x2="30" y2="70" style="stroke:rgb(6, 189, 0);stroke-width:10" />
                        <line x1="40" y1="70" x2="50" y2="70" style="stroke:rgb(6, 189, 0);stroke-width:10" />
                        <line x1="60" y1="70" x2="70" y2="70" style="stroke:rgb(6, 189, 0);stroke-width:10" />
                        <line x1="80" y1="70" x2="100" y2="70" style="stroke:rgb(6, 189, 0);stroke-width:10" />
                    </pattern>
    
                    <pattern id="codType-superficie-8" data-codigo="codType-superficie-8" width="100%" height="100%" viewBox="0 0 100 100">
                        <polygon points="50,10 90,75 10,75" style="fill:none;stroke:rgb(122, 161, 239);stroke-width:10" />
                    </pattern>
    
                    <pattern id="codType-superficie-9" data-codigo="codType-superficie-9" width="100%" height="100%" viewBox="0 0 10 10">
                        <circle  cx="5" cy="5" r="3.5" fill="none" stroke="rgb(255,0,0)" stroke-width="0.5"/>
                    </pattern>
    
                    <pattern id="codType-superficie-10" data-codigo="codType-superficie-10" width="100%" height="100%" viewBox="0 0 100 100">
                        <line x1="0" y1="50" x2="10" y2="50" style="stroke:rgb(255,0,0);stroke-width:10" />
                        <line x1="20" y1="50" x2="30" y2="50" style="stroke:rgb(255,0,0);stroke-width:10" />
                        <line x1="40" y1="50" x2="50" y2="50" style="stroke:rgb(255,0,0);stroke-width:10" />
                        <line x1="60" y1="50" x2="70" y2="50" style="stroke:rgb(255,0,0);stroke-width:10" />
                        <line x1="80" y1="50" x2="100" y2="50" style="stroke:rgb(255,0,0);stroke-width:10" />
                    </pattern>
    
                    <pattern id="codType-superficie-11" data-codigo="codType-superficie-11" width="100%" height="100%" viewBox="0 0 100 100">
                        <circle  cx="50" cy="50" r="40" fill="none" stroke="rgb(122, 161, 239)" stroke-width="4"/>
                        <circle  cx="50" cy="50" r="10" fill="black"/>
                    </pattern>
    
                    <circle  cx="562" cy="412" r="315" id="seleccion-global" data-codigo="seleccion-global"/>
    
                </defs>
    
                
                <!--FIGURA PRINCIPAL-->                    
                <circle  cx="563" cy="410" r="110" fill="transparent" stroke-width="2" stroke="black" data-superficie="Oclusal" data-codSuperficie="0"/>
                
                <path data-superficie="Vestibular" data-codSuperficie="1" fill="transparent" stroke="black" stroke-width="2"
                    d="M 647.21875 326.621094 L 715.234375 258.609375 C 630.878906 174.257812 494.117188 174.257812 409.761719 258.609375 L 477.777344 326.621094 C 524.566406 279.832031 600.429688 279.832031 647.21875 326.621094 Z M 647.21875 326.621094 "
                    fill-opacity="1" fill-rule="nonzero" />
    
                <path data-superficie="Mesial" data-codSuperficie="2"  fill="transparent" stroke="black" stroke-width="2"
                    d="M 647.207031 496.054688 L 715.21875 564.066406 C 799.574219 479.714844 799.574219 342.949219 715.21875 258.597656 L 647.207031 326.609375 C 693.996094 373.402344 693.996094 449.265625 647.207031 496.054688 Z M 647.207031 496.054688 "
                    fill-opacity="1" fill-rule="nonzero" />
    
                <path data-superficie="Lingual" data-codSuperficie="3" fill="transparent" stroke="black" stroke-width="2"
                    d="M 477.773438 496.042969 L 409.761719 564.054688 C 494.117188 648.40625 630.878906 648.40625 715.230469 564.054688 L 647.21875 496.042969 C 600.429688 542.832031 524.566406 542.832031 477.773438 496.042969 Z M 477.773438 496.042969 "
                    fill-opacity="1" fill-rule="nonzero" />
                
                <path data-superficie="Distal" data-codSuperficie="4" fill="transparent" stroke="black" stroke-width="2"
                    d="M 477.789062 326.609375 L 409.773438 258.597656 C 325.421875 342.949219 325.421875 479.714844 409.773438 564.066406 L 477.789062 496.054688 C 430.996094 449.261719 430.996094 373.398438 477.789062 326.609375 Z M 477.789062 326.609375 "
                    fill-opacity="1" fill-rule="nonzero" />
                
                
                    
                <path data-superficie="Gingival vestibular" data-codSuperficie="5" fill="transparent" stroke="black" stroke-width="2"
                    d="M 407.46875 256.296875 C 493.011719 170.75 631.976562 170.75 717.523438 256.296875 L 783.644531 190.175781 C 661.488281 68.023438 463.503906 68.023438 341.347656 190.175781 Z M 407.46875 256.296875 "
                    fill-opacity="1" fill-rule="nonzero" />
                    
                <path data-superficie="Gingival lingual" data-codSuperficie="6" fill="transparent" stroke="black" stroke-width="2"
                    d="M 717.523438 566.363281 C 631.976562 651.910156 493.011719 651.910156 407.46875 566.363281 L 341.347656 632.484375 C 463.503906 754.636719 661.488281 754.636719 783.644531 632.484375 Z M 717.523438 566.363281 "
                    fill-opacity="1" fill-rule="nonzero" />
    
                <!--FIN DE FIGURA PRINCIPAL-->
    
                <!--CUADROS SUPERIORES DERECHO-->
                <rect data-superficie="Complementaria" data-codSuperficie="7" fill="transparent" stroke="black" stroke-width="2"
                x="800" y="250" width="60" height="60" />
                
                <rect data-superficie="-3" data-codSuperficie="8" fill="transparent" stroke="black" stroke-width="2"
                x="800" y="500" width="60" height="60" />
                <!--FIN DE CUADROS SUPERIORES DERECHO-->   
                
                <use xlink:href="#seleccion-global" id="inabilitador-seleccion" class="inabilitador-seleccion" fill="none"/>
                
            </svg>`]
        }
    })
}