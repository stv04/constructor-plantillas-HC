import conceptoHistService from "../../adherenciaServices/conceptoHistService.js";

export default (modal, opts) => {
    const contenedor = document.createElement("div");
    const form = document.createElement("form");
    const {idEditing, btnTextContent} = opts;

    form.innerHTML = `
        <div class="mb-3">
            <label for="select_type-concepto_hist" class="form-label">Seleccione tipo</label>
            <select type="text" class="form-select" name="NU_TIPO_COHI" id="select_type-concepto_hist">
                <option value="0">Número</option>
                <option value="1">Texto</option>
                <option value="2">Fecha</option>
                <option value="3">Memorando</option>
                <option value="4">Opción</option>
                <option value="5">Selección</option>
                <option value="7">Hora</option>
            </select>
        </div>
        
        <div class="mb-3">
            <label for="crear_titulo-concepto_hist" class="form-label">Título</label>
            <input type="text" class="form-control" name="TX_TITULO_COHI" id="crear_titulo-concepto_hist">
        </div>

        <input type="number" class="form-control d-none" name="NU_NUME_COHI" value="${idEditing}">
        <button type="submit" class="btn btn-primary">${btnTextContent}</button>
    `;

    form.addEventListener("submit", async e => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const idEditing = formData.get("NU_NUME_COHI");
        const title = idEditing ? "Error editando concepto." : "Error crando concepto.";

        let conceptoCreado;
        if(idEditing) {
            conceptoCreado = await conceptoHistService.actualizarConcepto(formData);
        } else {
            conceptoCreado = await conceptoHistService.crearConcepto(formData);
        }

        modal.close();
        
        if(typeof conceptoCreado === "string")
        return modal.open({
            title,
            content: conceptoCreado
        })
    });
    contenedor.appendChild(form);
    return contenedor;
}