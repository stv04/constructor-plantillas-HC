import modalNombreForm from "./modalNombreForm.js";
import { viewErrorsBeforeSave } from "./utils.js";

export default {
    id: "guardar-formulario",
    run(editor) {
        const modal = editor.Modal;
        const html = editor.getHtml();
        const css = editor.getCss();
        const js = editor.getJs();
        const components = JSON.stringify(editor.getComponents());

        const sendingData = {
            "tX_JSON_FORM": components,
            "tX_HTML_FORM": html,
            "tX_CSS_FORM": css,
            "tX_JS_FORM": js
        }


        console.log(JSON.parse(components));
        const errores = viewErrorsBeforeSave(JSON.parse(components));
        if(errores) {
            return modal.open({
                title: "Error en validación",
                content: "Faltan llenar el nombre de un campo de tipo " + errores.type
            });
        }

        // return;

        const opts = {
            btnTextContent: "Crear Nuevo formulario",
            sendingData
        }
        modal.open({
            title: "Creando nuevo formulario",
        });

        modal.setContent(modalNombreForm(modal, opts))
    }
}