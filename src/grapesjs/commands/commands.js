import modalEditgrupo from "./modalEditgrupo.js";


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
        }
    ]
}