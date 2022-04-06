import "./js/viewController.js";
import grapesConfig from "./grapesjs/grapes.config.js";
import { typeGrupo, typeRotuloGrupo } from "./grapesjs/types/gridTypes.js";

globalThis.editor = grapesConfig();

const quitHash = hexa => hexa.replace("#", "");

document.getElementById("ver-json").addEventListener("click", verJson);
editor.Commands.add("save-json", verJson);

habilitateComands();
function habilitateComands() {
  const els = document.querySelectorAll("[data-command]")
  .forEach(el => el.addEventListener("click", runCommand))
}

function runCommand(e) {
  const command = this.getAttribute("data-command");
  const isActive = this.classList.contains("active");
  const changeable = this.classList.contains("changeable");

  if(isActive) {
    editor.stopCommand(command);
  } else {
    editor.runCommand(command);
  }

  if(changeable)
  this.classList.toggle("active");
}

function verJson() {
  const original = editor.getComponents();
  const components = JSON.parse(JSON.stringify(original));
  const styles = JSON.parse(JSON.stringify(editor.getCss({json: true})));
  console.log(styles);

  globalThis.o = original;
  console.log("Antes de convertir => ", components);
  
  const final = depureComponent(components, {
    parent: 0, idGrupoParent: 0
  });

  console.log("Luego de depurar => ", final);
  
  final.map(f => {
    const style = styles.find(e => e.selectors.includes("#" + f.id));
    const rotulo = final.find(e => e.type === typeRotuloGrupo && e.type !== f.type);
    
    if (style) {
      f.style = style.style;
    }
    
    if(rotulo) {
      console.log(rotulo.style);
      f.rotulo = rotulo;
    }

    if (f.isImportant && f.type === "grupo")
    console.log(crearR_plan_grup(f));
    
    if (f.isImportant && f.type === "concepto")
    console.log(crearR_plan_conc(f));

    return f
  });

  
  console.log("Este el es documento que se va a enviar => ", final);

  return final;
}

function depureComponent(arrComponent, {parent, idGrupoParent}, sort = 0) {
  let res = [];
  
  arrComponent.forEach((comp) => {
    let componentList = [];
    let save = true;
    let componentToSave;
    
    const acceptedtypes = ["form", "input", "option", "select", "button", "radio", "checkbox"]
    
    
    componentToSave = Object.assign({}, comp.attributes);
    componentToSave.type = comp.type;
    
    if (comp.isImportant) componentToSave.isImportant = comp.isImportant;
    
    let heredar = {};
    switch(comp.type) {
      case typeGrupo:
        save = true;
        sort++
        componentToSave.sort = sort
        componentToSave.parent = parent || 0;
        componentToSave.idGrupoDB = comp.idGrupoDB;
        componentToSave.idGrupoParentDB = idGrupoParent || 0;
    
        heredar = {
          parent: sort,
          idGrupoParent: componentToSave.idGrupoDB
        }
        break;
      case typeRotuloGrupo:
        componentToSave.parent = parent || 0;
        save = true;
    }

    if(save) res.push(componentToSave);

    if(comp.components) {
      componentList = depureComponent(comp.components, heredar, sort);
      sort += componentList.length;
      res = res.concat(componentList);
    }
  });

  return res;
}


function crearR_plan_conc(component) {
  const styles = component.style;
  const concepto = component.concepto;
  const backgroundColor = styles["background-color"];

  const { top, left, height, width, border } = styles || {};

  let [
    TX_HXCOLORROTULO_RPC, TX_HXCOLORLETRA_RPC, NU_ROTULOTOTALANCHO_RPC, 
    NU_ALINEAROTULO_RPC, NU_ROTULOPERPEN_RPC, NU_ROTULOVISIBLE_RPC,
    NU_NEGRILLA_RPC, NU_ALINEAROTULOVERTICAL_RPC, NU_TAMFUENTE_RPC
  ] = getPropertiesRotulo(component.rotulo);

  let initialTop = convert_px_to_tw(top) || 0;
  let initialLeft = convert_px_to_tw(left) || 0;

  return {
    "NU_NUME_PLHI_RPC": 1, // código de plantilla hist
    "NU_NUME_COHI_RPC": 1, // código concepto
    "NU_NUME_GRHI_RPC": 1, // código grupo
    "NU_INGR_RPC": 1, // código de r_plan_grup
    "NU_INDI_RPC": 0, // índice del concepto!!
    "NU_TOP_RPC": initialTop || 0, // top
    "NU_LEFT_RPC": convert_px_to_tw(initialLeft) || 50, // height
    "NU_HEIGHT_RPC": convert_px_to_tw(height) || 50, // height
    "NU_WIDTH_RPC": convert_px_to_tw(width) || 150, // width
    "NU_PATH_FILE": "sirve para fórmulas", // formulas de consulta / path
    "NU_VISIBLE_RPC": 1, //"visibilidad del concepto:bool",
    "NU_INDIDEP_RPC": -1, // concepto de dependencia option de select
    TX_HXCOLORLETRA_RPC, //: "Color del título del concepto",
    NU_ROTULOTOTALANCHO_RPC, //: "si el rotulo ocupará el ancho del concepto",
    NU_ALINEAROTULO_RPC, //: "alineación delrótulo",
    "TX_IDGROP_RPC": "Referencia para indicar grupo de opciones",
    NU_TAMFUENTE_RPC, // "tamaño letra concepto",
    NU_ROTULOPERPEN_RPC, //: "Si la posición del rotulo del concepto será vertical",
    NU_ROTULOVISIBLE_RPC, //: "Visibilidad titulo concepto",
    NU_NEGRILLA_RPC, //: "si el título del concepto está en negrita",
    NU_ALINEAROTULOVERTICAL_RPC, //: "alineacion del rotulo",
    "TX_COLORFONDO_RPC": backgroundColor ? "#FF" + quitHash(backgroundColor) : "#00FFFFFF", // "Color fondo rotulo",
    TX_HXCOLORROTULO_RPC, //: "Color rotulo",
    
    //Valores estáticos
    "TX_NOMBRPT_RPC": null,
    "TX_FORMRPT_RPC": null,
    "NU_EDITA_RPC": 0,
    
    "TX_CAMPOSASOCIA_RPC": null,
    
    "TX_KEYESTILO_RPC": null,
    
    "NU_INVACTASO_RPC": null,

    "TX_ALINEAROTULO_RPC": "0;0",
    "NU_ORDEN_COLDEP_RPC": 0,
    "AUTO_INC_RPC": null,
    "ES_SEMA_RPC": null,
    "TX_DESC_SEMA_RPC": null,
    "TX_VALOR_SEMA_RPC": null,
    "TX_RELA_SEMA_RPC": null,
    "TX_COLOR_SEMA_RPC": null
  };
}

function crearR_plan_grup(component) {
  const style = component.style;
  const {top, left, height, width, border} = component.style;
  const backgroundColor = style["background-color"];
  const grupoHeredado = 2101;
  const plantilla = 3383;

  let [
    TX_hxCOLORROTULO_RPG, TX_hxCOLORLETRA_RPG, NU_ROTULOTOTALANCHO_RPG, 
    NU_ALINEAROTULO_RPG, NU_ROTULOPERPEN_RPG, NU_ROTULOVISIBLE_RPG,
    NU_NEGRILLA_RPG, NU_ALINEAROTULOVERTICAL_RPG, NU_TAMFUENTE_RPG
  ] = getPropertiesRotulo(component.rotulo);
 

  let initialTop = convert_px_to_tw(top) || 0;
  let initialLeft = convert_px_to_tw(left) || 0;
  let borderConverted = border ? "1;1;1;1" : "0;0;0;0";

  return {
    "NU_NUME_PLHI_RPG": plantilla,
    "NU_NUME_GRHI_RPG": component.idGrupoDB,
    "NU_INDI_RPG": component.sort,
    "NU_INGR_RPG": component.parent,
    "NU_NUGR_RPG": component.idGrupoParentDB,

    "NU_TOP_RPG": initialTop + 3000, // "posicion y (min:3000)",
    "NU_LEFT_RPG": initialLeft + 1000, // "posicion x (min: 1000)",
    "NU_HEIGHT_RPG": convert_px_to_tw(height) || 1000,
    "NU_WIDTH_RPG": convert_px_to_tw(width) || 12000,
    "TX_BORDES_RPG": borderConverted, //"bordes (1;0;0;0) (izq;top;der;inferior)",
    TX_hxCOLORROTULO_RPG, //: "fondo rotulo",
    TX_hxCOLORLETRA_RPG, // "color letra rotulo",
    NU_ROTULOTOTALANCHO_RPG, // "Si el rotulo abarca todo el ancho:bool",
    NU_ALINEAROTULO_RPG, //: "Alineacion:number",
    NU_TAMFUENTE_RPG, //: "font-size",
    NU_ROTULOPERPEN_RPG, // "orientacion del rotulo",
    NU_ROTULOVISIBLE_RPG, //: "Si el rótulo es visible:bool",
    NU_NEGRILLA_RPG, //"negrita para el rotulo",
    NU_ALINEAROTULOVERTICAL_RPG, // "la alineacion para cual el rotulo está vertical",
    "TX_COLORFONDO_RPG": backgroundColor ? "#FF" + quitHash(backgroundColor) : "#00FFFFFF",

    // Valores estáticos
    "NU_ORDEN_COLDEP_RPG": 0,
    "NU_INDIDEP_RPC_RPG": -1,
    "NU_INVACTASO_RPG": 0,
    "TX_ALINEAR_ROTULO": "0;0"
  }
}

function getPropertiesRotulo(rotulo) {
  const definiciones = [
    "0:background-color", "1:color", "2:total_ancho", "3:text-align", "4:rotuloPerpen",
    "5:visible", "6:font-weight", "7:alineacion vertical", "8:font-size"
  ]
  const valores = ["#00FFFFFF", "#FF000000", 1, 0, 0, 1, 0, 0, 14];
  
  if (rotulo && rotulo.style) {
    console.log(rotulo);
    const style = rotulo.style;
    const {color, display} = style;
    const backgroundColor = style["background-color"];
    const fontSize = style["font-size"];
    const fontWeigth = style["font-weigth"];
    const textAlign = style["text-align"];


    if(backgroundColor) valores[0] = "#FF" + quitHash(backgroundColor);
    if(color) valores[1] = "#FF" + quitHash(color);
    if(display === "none") valores[5] = 0;
    if(fontWeigth > 500) valores[6] = 1;
    if(fontSize) valores[8] = parseInt(fontSize);

    if(textAlign === "center") valores[3] = 1;
    if(textAlign === "right") valores[3] = 2;
  }

  return valores;
}

function convert_px_to_tw(px) {
  const pixel = parseInt(px);
  return pixel * 567 / 37.7952
}
