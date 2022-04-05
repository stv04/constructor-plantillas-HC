function subirFormulario(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);

    const x = {};

    for (let a of formData.entries()) {
        x[a[0]] = a[1]
    }

    console.log(x);
}

export default (modal, opts) => {
    const contenedor = document.createElement("div");
    const form = document.createElement("form");
    const {idEditing, btnTextContent} = opts;

    form.innerHTML = `
        <div class="mb-3">
            <label for="crear_titulo-grupo_hist" class="form-label">Título</label>
            <input type="text" class="form-control" name="TX_TITULO_GRHI" id="crear_titulo-grupo_hist">
        </div>
        <div class="mb-3">
            <label for="crear_codigo-grupo_hist" class="form-label">Código</label>
            <input type="text" class="form-control" name="CD_CODI_GRHI" id="crear_codigo-grupo_hist">
        </div>

        <input type="number" class="form-control d-none" name="NU_NUME_GRHI" value="${idEditing}">
        <button type="submit" class="btn btn-primary">${btnTextContent}</button>
    `;

    form.addEventListener("submit", e => {
        subirFormulario(e);
        modal.close();
    });
    contenedor.appendChild(form);
    return contenedor;
}