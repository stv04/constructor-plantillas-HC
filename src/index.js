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


