import modalEditgrupo from "./modalEditgrupo.js";
import { typeConcepto, typeGrupo, typeRotulo, typeRotuloGrupo } from "../../types/gridTypes.js";
import conceptoHistService from "../../adherenciaServices/conceptoHistService.js";
import GrupoHistService from "../../adherenciaServices/GrupoHistService.js";
import modalEditConcepto from "./modalEditConcepto.js";


export default [
  {
      id: "editar-grupo_hist",
      run(editor) {
          const selected = editor.getSelected();
          const idEditing = selected.getTrait("grupoHist").el.value.split(":")[0];
          const modal = editor.Modal;
          modal.open({
              title: "Editar " + idEditing,
          });

          const opts = {
              btnTextContent: "Editar grupo",
              idEditing
          }

          modal.setContent(modalEditgrupo(modal, opts))
      }
  }, {
      id: "crear-grupo_hist",
      run(editor) {
          const modal = editor.Modal;
          const opts = {
              btnTextContent: "Crear Nuevo grupo"
          }
          modal.open({
              title: "Creando nuevo grupo",
          });

          modal.setContent(modalEditgrupo(modal, opts))
      }
  }, {
      id: "editar-concepto_hist",
      run(editor) {
          const selected = editor.getSelected();
          const idEditing = selected.getTrait("conceptoHist").el.value.split("::")[1];
          const modal = editor.Modal;
          modal.open({
              title: "Editar " + idEditing,
          });

          const opts = {
              btnTextContent: "Editar Concepto",
              idEditing
          }

          modal.setContent(modalEditConcepto(modal, opts))
      }
  }, {
    id: "crear-concepto_hist",
    run(editor) {
      const modal = editor.Modal;
      const opts = {
        btnTextContent: "Crear Nuevo concepto"
      }
      modal.open({
          title: "Creando nuevo concepto",
      });

      modal.setContent(modalEditConcepto(modal, opts))
    }
  }, {
    id: "save-json",
    run(editor) {verJson(editor)}
  }
]

async function verJson(editor) {
    const original = editor.getComponents();
    const components = JSON.parse(JSON.stringify(original));
    const styles = JSON.parse(JSON.stringify(editor.getCss({json: true})));
  
    globalThis.o = original;
    console.log("Antes de convertir => ", components);
    
    const final = depureComponent(components, {
      parent: 0, idGrupoParent: 0, sort: 0, sortConcepto: 0
    });

    const grupos = [];
    const conceptos = [];
  
    console.log("Luego de depurar => ", final);
    
    final.map(f => {
      const style = styles.find(e => e.selectors.includes("#" + f.id));
      const rotulo = final.find(e => e.type === typeRotulo && e.parent !== f.sort);
      
      if (style) {
        f.style = style.style;
      }
      
      if(rotulo) {
        console.log(rotulo.style);
        f.rotulo = rotulo;
      }
  
      if (f.isImportant && f.type === "grupo")
      grupos.push(f);
      // console.log(GrupoHistService.crearR_plan_grup(f));
      
      if (f.isImportant && f.type === "concepto")
      conceptos.push(f);
  
      return f
    });

    for await (let grupo of grupos) {
      const respuestaGrupo = await GrupoHistService.crearR_plan_grup(grupo);
      console.log(respuestaGrupo);
    }

    for await (let concepto of conceptos) {
      const respuestaConc = await conceptoHistService.crearR_plan_conc(concepto);
      console.log(respuestaConc);
    }
    
    console.log("Este el es documento que se va a enviar => ", final);
  
    return final;
}  

function depureComponent(arrComponent, herencia, arr) {
  let res = arr || [];
  const {parent, idGrupoParent} = herencia;
  let { sort, sortConcepto } = herencia;

  arrComponent.forEach((comp) => {
    
    let save = true;
    let componentToSave;
    
    const acceptedtypes = ["form", "input", "option", "select", "button", "radio", "checkbox"];
    
    componentToSave = Object.assign({}, comp.attributes);
    componentToSave.type = comp.type;
    
    if (comp.isImportant) componentToSave.isImportant = comp.isImportant;
    
    let heredar = {};
    switch(comp.type) {
      case typeGrupo:
        console.log(typeGrupo, sort);
        save = true;
        sort ++;
        componentToSave.sort = sort
        componentToSave.parent = parent || 0;
        componentToSave.idGrupoDB = comp.idGrupoDB;
        componentToSave.idGrupoParentDB = idGrupoParent || 0;
        // console.log(sort, res.filter(c => c.type === comp.type).length);
        heredar = {
          parent: sort,
          idGrupoParent: componentToSave.idGrupoDB,
          parentType: componentToSave.type,
          sort, sortConcepto
        }
        break;
      case typeConcepto: 
        console.log(typeConcepto, sortConcepto, sortConcepto + 1);

        save = true;
        sortConcepto ++;
        componentToSave.sort = sortConcepto;
        componentToSave.parent = parent || 0;
        componentToSave.idConceptoDB = comp.idConceptoDB;
        componentToSave.idGrupoParentDB = idGrupoParent || 0;

        heredar = {
          parent: sortConcepto,
          idConceptoParent: componentToSave.idConceptoDB,
          parentType: componentToSave.type,
          sort, sortConcepto
        }
      case typeRotuloGrupo:
        componentToSave.parent = parent || 0;
        componentToSave.typeParent = parent || 0;
        save = true;
    }

    if(save) res.push(componentToSave);

    if(comp.components) {
      res = depureComponent(comp.components, heredar, res);
      sortConcepto = res.filter(c => c.type === typeConcepto).length;
    }
  });

  return res;
}
