import modalEditgrupo from "./modalEditgrupo.js";
import { typeConcepto, typeGrupo, typeRotulo, typeRotuloGrupo } from "../types/gridTypes.js";
import conceptoHistService from "../adherenciaServices/conceptoHistService.js";
import GrupoHistService from "../adherenciaServices/GrupoHistService.js";
import modalEditConcepto from "./modalEditConcepto.js";
import PlantillaHistService from "../adherenciaServices/PlantillaHistService.js";


export default {
    defaults: [
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
          const selected = editor.getSelected();

          const type = "listaAsociada" || selected.attributes.attributes["data-type"];

          const opts = {
            btnTextContent: "Crear Nuevo concepto", type
          }
          modal.open({
              title: "Creando nuevo concepto",
          });

          modal.setContent(modalEditConcepto(modal, opts))
        }
      }, {
        id: "agregar_fila_tabla",
        run(editor) {
          const selected = editor.getSelected();
          const tbody = selected.getLastChild();
          const encabezado = selected.find("tr")[0];
          const nuCols = encabezado.findType("celdaTabla").length;

          const fila = buildFilaTabla(nuCols);

          console.log(tbody);
          
          tbody.append(fila);

          
        }
      }, {
        id: "eliminar_fila_tabla",
        run(editor) {
          const selected = editor.getSelected();
          const tbody = selected.getLastChild();

          const lastRow = tbody.getLastChild();

          if(lastRow)
          lastRow.remove()

          
        }
      }, {
        id: "agregar_columna_tabla",
        run(editor) {
          const selected = editor.getSelected();
          const filas = selected.find("tr");
          
          filas.forEach((fila, i) => {
            fila.append(buildCeldaTabla(!i));
          });
          
        }
      }, {
        id: "eliminar_columna_tabla",
        run(editor) {
          const selected = editor.getSelected();
          const filas = selected.find("tr");
          
          filas.forEach(fila => fila.getLastChild().remove());
        }
      }, {
        id: "guardado-parcial",
        run(editor) {PlantillaHistService.guardadoParcial(editor)}
      }, {
        id: "llenado-formato",
        run(editor) {PlantillaHistService.llenadoFormato(editor)}
      }, {
        id: "save-json",
        run(editor) {guardar(editor)}
      }, {
        id: "guardar-imagen",
        run(editor) {
          const modalAgregarImagen = (modal) => {
            const contenedor = document.createElement("div");
            const form = document.createElement("form");
        
            form.innerHTML = `
        
                <input type="file" name="archivo">
                
                <button type="submit" class="btn btn-primary">Añadir archivo</button>
            `;
        
            form.addEventListener("submit", async e => {
                e.preventDefault();
                const formData = new FormData(e.target);
        
                conceptoHistService.agregarArchivo(formData);
        
                modal.close();
            });
        
            contenedor.appendChild(form);
            return contenedor;
          }

          const modal = editor.Modal;
          modal.open({
            title: "Agregar imágen",
          });

          modal.setContent(modalAgregarImagen(modal))
        }
      }
    ]
}

async function verJson(editor) {
    const original = editor.getComponents();
    const components = JSON.parse(JSON.stringify(original));
    const styles = JSON.parse(JSON.stringify(editor.getCss({json: true})));
  
    globalThis.o = original;
    console.log("Antes de convertir => ", components);
    
    const final = depureComponent2(components, {
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

function depureComponent2(arrComponent, herencia, arr) {
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


async function guardar(editor) {
  const original = editor.getComponents();
  const components = JSON.parse(JSON.stringify(original));
  const styles = JSON.parse(JSON.stringify(editor.getCss({json: true})));

  globalThis.o = original;
  console.log("Antes de convertir => ", components);
  
  const componentesImportantes = depureComponent(components, {
    idParent: 0
  });

  let [sortGrupo, sortConcepto] = [1,1];

  const grupos = [];
  const conceptos = [];

  console.log("Luego de depurar => ", componentesImportantes);
  
  componentesImportantes.map(comp => {
    const style = styles.find(e => e.selectors.includes("#" + comp.id));
    const nombreDependiente = comp["data-dependiente"];

    //Para encontrar el rótulo de cierto elemento tomamos el id actual, tenemos que encontrar encontrar cualquier hijo 
    // de tipo rotulo cuyo parent id General de orden sea coincidente
    const rotulo = comp.type !== typeRotulo 
    ? componentesImportantes.find(c => c.type === typeRotulo && c.idParent === comp.idOrdenGeneral)
    : null;

    // Para conseguir el parent necesitamos buscar su id general de orden por medio del parentId
    const parent = componentesImportantes.find(c => c.idOrdenGeneral === comp.idParent);

    //componente necesario para el guardado del concepto con configuraciones particulares
    const innerComponent = componentesImportantes.find( c => c.special && c.idParent === comp.idOrdenGeneral);
    
    
    if (style) comp.style = style.style;
    
    if(rotulo) {
      console.log(rotulo.style);
      comp.rotulo = rotulo;
    }

    if(innerComponent) comp.innerComponent = innerComponent;

    comp.parent = 0;
    comp.idGrupoParentDB = 0;

    if(parent) {
      comp.parent = parent.sort || 0;
      comp.idGrupoParentDB = parent.idGrupoDB || 0;
    }

    if(nombreDependiente) {
      const dependiente = componentesImportantes.find(c => c.codigoConcepto == nombreDependiente);

      if(dependiente)
      comp.dependiente = dependiente;
    }

    if (comp.isImportant && comp.saveIn === typeGrupo) {
      comp.sort = sortGrupo;
      grupos.push(comp);

      sortGrupo ++;
    }
    
    if (comp.isImportant && comp.saveIn === typeConcepto) {
      if(comp.type === "table") {
        const celdasTabla = componentesImportantes.filter( c => c.typeCelda === "celdaTabla" && c.idParent === comp.idOrdenGeneral);
        console.log(celdasTabla);
        comp.celdasTabla = celdasTabla;
      }
      

      comp.sort = sortConcepto;
      conceptos.push(comp);

      sortConcepto ++;
    }

    return comp
  });


  for await (let grupo of grupos) {
    const respuestaGrupo = await GrupoHistService.crearR_plan_grup(grupo);
    console.log(respuestaGrupo);
  }

  for await (let concepto of conceptos) {
    const respuestaConc = await conceptoHistService.crearR_plan_conc(concepto);
    console.log(respuestaConc);
  }
  
  console.log("Este el es documento que se va a enviar => ", componentesImportantes);

  return componentesImportantes;
}


function depureComponent(arrComponent, herencia, arr) {
  let res = arr || [];
  let {idParent} = herencia;
  
  arrComponent.forEach((comp) => {
    
    let save = false;
    let componentToSave;
    
    
    componentToSave = Object.assign({}, comp.attributes);
    componentToSave.type = comp.type;
    
    if (comp.isImportant) componentToSave.isImportant = comp.isImportant;

    const componentSpecial = componentToSave["data-concepto_especial"];
    
    let heredar = herencia;

    const id = res.length + 1;
    let breakDepure;

    //Revisamos lo tipos que son importantes para guardar para asignarlo
    switch(comp.type) {
      case typeGrupo:
        save = true;

        // Tomamos el id heredado para encontra insertar el idParent
        componentToSave.idParent = idParent;

        componentToSave.idOrdenGeneral = id;

        componentToSave.idGrupoDB = comp.idGrupoDB;

        // Para medir donde se va a guardar
        componentToSave.saveIn = typeGrupo;

        heredar = {
          idParent: id
        }
        break;
      case typeConcepto: 
        save = true;

        // Tomamos el id heredado para encontra insertar el idParent
        componentToSave.idParent = idParent;

        componentToSave.idOrdenGeneral = id;

        componentToSave.idConceptoDB = comp.idConceptoDB;
        componentToSave.nombreConcepto = comp.nombreConcepto;
        componentToSave.codigoConcepto = comp.codigoConcepto;

        componentToSave.saveIn = typeConcepto;

        heredar = {
          idParent: id
        }
        break;
      case typeRotulo:
        componentToSave.idParent = idParent;
        save = true;
        break;
      case "table":
        componentToSave.idParent = idParent;

        componentToSave.idOrdenGeneral = id;

        componentToSave.idConceptoDB = comp.idConceptoDB;
        componentToSave.saveIn = typeConcepto;

        heredar = {
          idParent: id
        }

        if(comp.components) {
          const cells = depureTable(comp.components, id);
          res = res.concat(cells);
        }
        breakDepure = true;
        save = true;

        break;
    }
    //En caso de no pasar por el switch hereda la información que heredó

    // Para guardar un componente en particular porque se necesitan sus propiedades internas
    if(componentSpecial) {
      componentToSave.idParent = idParent;
      componentToSave.special = true;
      componentToSave.tipoEspecial = componentSpecial;
      save = true;
    }

    if(save) res.push(componentToSave);

    if(comp.components && !breakDepure) {
      res = depureComponent(comp.components, heredar, res);
    }
  });

  return res;
}

function depureTable(components, idParent, nuRow = 0) {
  let res = [];
  components.forEach((comp, i) => {
    console.log(comp.type);
    if(comp.type === "celdaTabla") {
      const celdaInterna = getFirsComponent(comp);
      const elText = getFirsComponent(celdaInterna);
      const content = elText.content;
      const tagCelda = comp.tagName;

      const gridRow = tagCelda === "th" ? 0 : nuRow
      
      const defaults = {
        content, idParent, gridRow, gridCol: i,
        typeCelda: comp.type,
        value: comp.value
      };      
     
      const cellToSave = Object.assign(defaults, celdaInterna.attributes);

      res.push(cellToSave);
      return;
    }
    
    if(comp.type === "row") {
      nuRow ++;
      console.log(comp.type, nuRow);
    }
    if(comp.components) res = res.concat(depureTable(comp.components, idParent, nuRow));
  });
  
  function getFirsComponent(comp) {
    if(!comp) return {};
    if(!comp.components) return [];
  
    return comp.components[0]
  }

  return res;
}




function buildFilaTabla(nuCols) {
  const components = [];
  for(let i =0; i < nuCols; i++) {
    components.push(buildCeldaTabla());
  }
  return {
    type: "row",
    draggable: false,
    droppable: false,
    components
  }
}

function buildCeldaTabla(isEncabezado) {
  return { 
    type: "celdaTabla", 
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
      attributes: {"data-tipo": 6}
    }
  }
}