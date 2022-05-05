import FormularioService from "../formGrapes/services/FormularioService.js";

const visor = document.querySelector("#documentos");
const name = "selector-documento_externo";

const checkbox =  (val, label) => new DOMParser().parseFromString(`
    <div class="form-check form-check-inline">
        <input class="form-check-input" type="checkbox" id="documentos-checkbox-${val}" value="${val}" name="selector-documento_externo">
        <label class="form-check-label" for="documentos-checkbox-${val}">${label}</label>
    </div>
`, "text/html").body.firstChild;

export default async function cargarDocumentosExternos() {
    const documentos = await FormularioService.obtenerDocumentosExternos();

    documentos.forEach(doc => {
        visor.appendChild(checkbox(doc.nU_IDDOCEXT_DOCEXT, doc.tX_NOMBREDOC_DOCEXT));
    });
}

export function asociarDocumentoConFormulario(id_form) {
    const formData = new FormData(visor);
    const selectedDocs = formData.getAll(name);

    return selectedDocs.map(idDoc => new Object({
        nU_IDFORMULARIO_FORMXDOC: id_form,
        nU_IDDOCUMENTO_FORMXDOC: idDoc
    }));
}