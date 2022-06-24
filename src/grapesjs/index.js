import '//unpkg.com/grapesjs';

import es from "./locale/es.js";
import commands from './commands/commands.js';
import "//unpkg.com/grapesjs-preset-webpage";
import "//unpkg.com/grapesjs-plugin-export";
import "./plugins/config.js";

globalThis.editor = grapesjs.init({
  // Indicate where to init the editor. You can also pass an HTMLElement
  container: '#gjs',
  i18n: {
    messages: { es },
  },
  // Get the content for the canvas directly from the element
  // As an alternative we could use: `components: '<h1>Hello World Component!</h1>'`,
  fromElement: true,
  // Size of the editor
  height: '100vh',
  width: 'auto',
  // Disable the storage manager for the moment
  storageManager: false,
  plugins: ["basicPlugin", "formPlugin"],
  pluginsOpts: {
    'gjs-preset-webpage': {
        exportOpts: false,
        countdownOpts: false,
        navbarOpts: false,
        blocksBasicOpts: false,
        blocks: [],
        

        formsOpts: false
    },
    'gjs-plugin-export': {
        btnLabel: 'Exportar',
        preHtml: '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"><link rel="stylesheet" href="./css/style.css"><script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" defer="defer" crossorigin="anonymous"></script></head><body>',
    }
  },
  canvas: {
    styles: ["https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"]
  },
  // blockManager: {
  //   appendTo: "#blockManager"
  // },
  // traitManager: {
  //   appendTo: "#traitManager"
  // },
  // layerManager: {
  //   appendTo: "#layerManager"
  // },
  selectorManager: {
    // appendTo: "#selectorManager",
    componentFirst: true
  },
  // styleManager: {
  //   appendTo: "#styleManager"
  // },
  // Avoid any default panel
  // panels: { 
  //   defaults: [] 
  // },
  commands
  // blockManager: {
  //   // appendTo: "#blocks",
  //   // custom: true,
  //   blocks: [{
  //     id: "group",
  //     label: `Grupo`,
  //     content: `<div style="display: grid; grid-template-columns: 1fr 1fr"></div>`
  //   }, {
  //     id: "button",
  //     label: `Botón`,
  //     content: `<button mat-flat-button color="primary">Basico</button>`
  //   }, {
  //     id: "number",
  //     label: `Campo numérico`,
  //     content: `<input type="number"/>`
  //   }, {
  //     id: "email",
  //     label: `Correo Electrónico`,
  //     content: `<input type="email"/>`
  //   }, {
  //     id: "text",
  //     label: `Campo de texto`,
  //     content: `<input type="text"/>`
  //   }, {
  //     id: "textarea",
  //     label: `Texto amplio`,
  //     content: `<textarea></textarea>`
  //   }, {
  //     id: "styles",
  //     label: "Estilos",
  //     content: `
  //     <div class="txt-danger">texto</div>
  //     <style>
  //       .txt-danger {
  //         color: red;
  //       }

  //       .txt-blue: {
  //         color: blue
  //       }
  //     </style>`
  //   }]
  // },
  // style: styles,
});

editor.toJson = function () {
  console.log(this);
  return JSON.parse(JSON.stringify(this.getComponents()));
}

const css = '#ino7{height:700px;width:900px;position:absolute;top:200px;left:60px;border-top-width:1px;border-right-width:1px;border-bottom-width:1px;border-left-width:1px;border-top-style:solid;border-right-style:solid;border-bottom-style:solid;border-left-style:solid;border-top-color:black;border-right-color:black;border-bottom-color:black;border-left-color:black;border-image-source:initial;border-image-slice:initial;border-image-width:initial;border-image-outset:initial;border-image-repeat:initial;}#ioxg{height:calc(100% - 28px);width:100%;}#iyal{font-size:24px;font-weight:700;text-align:center;background-color:rgb(38, 197, 98);color:rgb(255, 255, 255);}#idpo{top:50px;position:absolute;left:20px;width:300px;}#i56q{top:50px;position:absolute;left:340px;}#iagf2{top:50px;position:absolute;left:520px;}#i43q2{height:200px;width:858px;position:absolute;top:130px;border-top-width:1px;border-right-width:1px;border-bottom-width:1px;border-left-width:1px;border-top-style:solid;border-right-style:solid;border-bottom-style:solid;border-left-style:solid;border-top-color:black;border-right-color:black;border-bottom-color:black;border-left-color:black;border-image-source:initial;border-image-slice:initial;border-image-width:initial;border-image-outset:initial;border-image-repeat:initial;left:20px;}#i4ka3{height:calc(100% - 28px);width:100%;}#i1kog{top:50px;position:absolute;left:20px;width:818px;}#idcsf{top:128px;position:absolute;left:20px;}#ihrhi{top:128px;position:absolute;left:186px;}#i9tjr{height:200px;width:860px;position:absolute;top:400px;left:20px;border:1px solid black;}#ibtk8{height:calc(100% - 28px);width:100%;}#i65ge{font-size:18px;font-weight:700;text-align:center;background-color:#08b9c1;color:white;}';
const comp = JSON.parse('[{"type":"grupo","style":"","attributes":{"id":"ino7"},"components":[{"type":"rotulo","content":"Diagnósticos Generales","attributes":{"style":"padding: 5px;","id":"iyal"}},{"type":"grupoBody","style":"","classes":["grupo-body"],"attributes":{"style":"padding: 5px;","id":"ioxg"},"components":[{"type":"concepto","style":"","attributes":{"data-type_concept":"RIPS1","data-nombrecampo":"Tipo_documento_17-06-2022","data-genero":"0","id":"i56q"},"components":[{"type":"rotulo","content":"Tipo de documento","attributes":{"style":"padding: 5px;","id":"iby8g"}},{"type":"select","attributes":{"data-save":true},"components":[{"type":"option","attributes":{"data-save":true},"components":[{"type":"textnode","content":"Lista Asociada"}]}]}],"isImportant":true,"idConceptoDB":31053,"nombreConcepto":"Tipo de documento","codigoConcepto":"Tipo_documento_17-06-2022"},{"type":"concepto","style":"","attributes":{"data-type_concept":"RIPS1","data-nombrecampo":"Nombres_Y_Apellidos_17-06-2022","data-genero":"0","id":"idpo"},"components":[{"type":"rotulo","content":"Nombres y apellidos","attributes":{"style":"padding: 5px;","id":"id22"}},{"type":"select","attributes":{"data-save":true},"components":[{"type":"option","attributes":{"data-save":true},"components":[{"type":"textnode","content":"Lista Asociada"}]}]}],"isImportant":true,"idConceptoDB":31052,"nombreConcepto":"Nombres y apellidos","codigoConcepto":"Nombres_Y_Apellidos_17-06-2022"},{"type":"concepto","style":"","attributes":{"data-type_concept":"RIPS1","data-nombrecampo":"Numero_Documento","data-genero":"0","id":"iagf2"},"components":[{"type":"rotulo","content":"Número de documento","attributes":{"style":"padding: 5px;","id":"i1akc"}},{"type":"select","attributes":{"data-save":true},"components":[{"type":"option","attributes":{"data-save":true},"components":[{"type":"textnode","content":"Lista Asociada"}]}]}],"isImportant":true,"idConceptoDB":31051,"nombreConcepto":"Número de documento","codigoConcepto":"Numero_Documento"},{"type":"grupo","style":"","attributes":{"id":"i43q2"},"components":[{"type":"rotulo","content":"Antecedentes personales","attributes":{"style":"padding: 5px;","id":"i1oji"}},{"type":"grupoBody","style":"","classes":["grupo-body"],"attributes":{"style":"padding: 5px;","id":"i4ka3"},"components":[{"type":"concepto","style":"","attributes":{"data-type_concept":"RIPS1","data-nombrecampo":"Lista_Diagnostico_06-06-2022","id":"i1kog"},"components":[{"type":"rotulo","content":"Consulta Diagnósticos","attributes":{"style":"padding: 5px;","id":"ib46i"}},{"type":"select","attributes":{"data-save":true},"components":[{"type":"option","attributes":{"data-save":true},"components":[{"type":"textnode","content":"Lista Asociada"}]}]}],"isImportant":true,"idConceptoDB":31033,"nombreConcepto":"Consulta Diagnósticos","codigoConcepto":"Lista_Diagnostico_06-06-2022"},{"type":"concepto","style":"","attributes":{"data-type_concept":"Numerico","data-nombrecampo":"Peso(KG)","id":"ihrhi"},"components":[{"type":"rotulo","content":"Peso (KG)","attributes":{"style":"padding: 5px;","id":"ias0p"}},{"type":"input","void":true,"attributes":{"type":"number","data-save":true}}],"isImportant":true,"idConceptoDB":31028,"nombreConcepto":"Peso (KG)","codigoConcepto":"Peso(KG)"},{"type":"concepto","style":"","attributes":{"data-type_concept":"RIPS2","data-nombrecampo":"Etnia_13-06-2022","id":"idcsf"},"components":[{"type":"rotulo","content":"Etnia","attributes":{"style":"padding: 5px;","id":"izxt1"}},{"type":"select","attributes":{"data-save":true},"components":[{"type":"option","attributes":{"data-save":true},"components":[{"type":"textnode","content":"Lista Desplegable"}]}]}],"isImportant":true,"idConceptoDB":31047,"nombreConcepto":"Etnia","codigoConcepto":"Etnia_13-06-2022"}]}],"isImportant":true,"idGrupoDB":4114},{"type":"grupo","style":"","attributes":{"id":"i9tjr"},"components":[{"type":"rotulo","content":"Residencia","attributes":{"style":"padding: 5px;","id":"i65ge"}},{"type":"grupoBody","style":"","classes":["grupo-body"],"attributes":{"style":"padding: 5px;","id":"ibtk8"}}],"isImportant":true,"idGrupoDB":4110}]}],"isImportant":true,"idGrupoDB":10764}]');

editor.setStyle(css)
editor.setComponents(comp);