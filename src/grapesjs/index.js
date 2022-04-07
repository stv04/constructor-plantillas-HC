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
  // selectorManager: {
  //   // appendTo: "#selectorManager",
  //   componentFirst: true
  // },
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