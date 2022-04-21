import FormularioService from "../../formGrapes/services/FormularioService.js";

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
    const iFrame = document.querySelector("#iframe-visor");
    const docFrame = iFrame.contentDocument;

    agregarEncabezadosFrame(docFrame);

    let html = d.tX_HTML_FORM;
    const css = d.tX_CSS_FORM;
    const js = d.tX_JS_FORM;
    html = html.replace("<body>", "");
    html = html.replace("</body>", "");

    let styletag = document.createElement("style");
    styletag.setAttribute("id", "estilos-personalizados");

    if(docFrame.getElementById("estilos-personalizados")) {
      styletag = docFrame.getElementById("estilos-personalizados");
    } else {
      docFrame.head.appendChild(styletag);
    }
    
    
    styletag.innerHTML = css;

    
    docFrame.body.innerHTML = html;
    let scripttag = document.createElement("script");
    scripttag.setAttribute("id", "js-personalizado");

    if(docFrame.getElementById("js-personalizado")) {
      scripttag = docFrame.getElementById("js-personalizado");
    } else {
      docFrame.body.appendChild(scripttag);
    }
    
    scripttag.innerHTML = "";

    if(js) {
      // html += "<script>" + js + "</script>";
      scripttag.innerHTML = js;
    }
  })
});

function agregarEncabezadosFrame(docFrame) {

  docFrame.open();
  docFrame.write("<!DOCTYPE html>");
  docFrame.close();
  docFrame.head.innerHTML = `
    <meta charset="UTF-8" />
  
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
      rel="stylesheet"
    />
  `;
}
  