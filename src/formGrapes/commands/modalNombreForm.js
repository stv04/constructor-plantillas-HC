import FormularioService from "../services/FormularioService.js";

export default (modal, opts) => {
    const contenedor = document.createElement("div");
    const form = document.createElement("form");
    const {btnTextContent, sendingData} = opts;

    form.innerHTML = `
        <div class="mb-3">
            <label for="crear_titulo-concepto_hist" class="form-label">Título</label>
            <input type="text" class="form-control" name="TX_NOMBREFORMULARIO_FORM" id="crear_titulo-concepto_hist">
        </div>

        <button type="submit" class="btn btn-primary">${btnTextContent}</button>
    `;

    form.addEventListener("submit", async e => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const nombreForm = formData.get("TX_NOMBREFORMULARIO_FORM");
        sendingData["TX_NOMBREFORMULARIO_FORM"] = nombreForm;

        
        const formularioCreado = FormularioService.createFormulario(JSON.stringify(sendingData));

        modal.close();
        
        if(typeof formularioCreado === "string")
        return modal.open({
            title,
            content: formularioCreado
        })
    });
    contenedor.appendChild(form);
    return contenedor;
}