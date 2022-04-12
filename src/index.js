import "./js/viewController.js";
// import "./grapesjs/index.js";
import "./formGrapes/index.js";
import FormularioService from "./formGrapes/services/FormularioService.js";

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

const el = document.querySelector("#selector-formularios");
leerForms();
function leerForms() {

  el.innerHTML = `<option value="">Seleccione</option>`;
  FormularioService.traerFormularios()
  .then(d => {

    d.forEach(f => {
      el
      .innerHTML += `<option value="${f.id}">${f.nombre}</option>`;
    })
  })
}

el.addEventListener("change", (e) => {
  FormularioService.traerFormulario(e.target.value).then(d => {
    let html = d.tX_HTML_FORM;
    const css = d.tX_CSS_FORM;
    const js = d.tX_JS_FORM;
    html = html.replace("<body>", "");
    html = html.replace("</body>", "");

    if(js) {
      html += "<script>" + js + "</script>";
    }

    editor.setComponents(html);
    editor.setStyle(css)
  })
})

