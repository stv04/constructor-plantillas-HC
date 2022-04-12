import GrupoHistService from "../adherenciaServices/GrupoHistService.js";

export default (modal, opts) => {
    const contenedor = document.createElement("div");
    const form = document.createElement("form");
    const {idEditing, btnTextContent} = opts;

    form.innerHTML = `
        ${!idEditing ? `
            <div class="mb-3">
                <label for="crear_codigo-grupo_hist" class="form-label">Código</label>
                <input type="text" class="form-control" name="CD_CODI_GRHI" id="crear_codigo-grupo_hist">
            </div>
        ` : ""}

        <div class="mb-3">
            <label for="crear_titulo-grupo_hist" class="form-label">Título</label>
            <input type="text" class="form-control" name="TX_TITULO_GRHI" id="crear_titulo-grupo_hist">
        </div>

        <input type="number" class="form-control d-none" name="NU_NUME_GRHI" value="${idEditing}">
        <button type="submit" class="btn btn-primary">${btnTextContent}</button>
    `;

    form.addEventListener("submit", async e => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const idEditing = formData.get("NU_NUME_GRHI");
        const title = idEditing ? "Error editando grupo." : "Error crando grupo";

        let grupoCreado;
        if(idEditing) {
            grupoCreado = await GrupoHistService.actualizarGrupo(formData);
        } else {
            grupoCreado = await GrupoHistService.crearGrupo(formData);
        }

        modal.close();
        
        if(typeof grupoCreado === "string")
        return modal.open({
            title,
            content: grupoCreado
        })
    });
    contenedor.appendChild(form);
    return contenedor;
}