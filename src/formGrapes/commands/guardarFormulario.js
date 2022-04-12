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

        console.log(html);

        console.log(JSON.parse(components));

        if(viewErrorsBeforeSave(JSON.parse(components))) {
            return modal.open({
                title: "Error en validación",
                content: "Faltan llenar algunos elementos"
            });
        }

        const opts = {
            btnTextContent: "Crear Nuevo formulario",
            sendingData
        }
        modal.open({
            title: "Creando nuevo concepto",
        });

        modal.setContent(modalNombreForm(modal, opts))
    }
}