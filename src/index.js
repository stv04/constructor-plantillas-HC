import "./js/viewController.js";
// import "./grapesjs/index.js";
import "./formGrapes/index.js";
import FormularioService from "./formGrapes/services/FormularioService.js";
import cargarDocumentosExternos from "./js/documentos.js";

cargarDocumentosExternos();
const selector = document.querySelector("#form-creados");
selector.addEventListener("change", mostrarFormulario)

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

llenarFormularios();
async function llenarFormularios() {
  const formularios = await FormularioService.traerFormularios();
  formularios.forEach(f => {
    const op = document.createElement("option");
    op.value = f.id;
    op.innerHTML = f.nombre;

    selector.appendChild(op);
  })
}

async function mostrarFormulario() {
  const id = this.value;
  const form = await FormularioService.traerFormulario(id);

  editor.setComponents(JSON.parse(form.tX_JSON_FORM));
  editor.setStyle(form.tX_CSS_FORM);
}