import conceptoHistService from "../adherenciaServices/conceptoHistService.js";

const inpsConfiguracionTablas = `
    <div id="configuraciones-tablas-consulta" class="d-none row my-3">
        <h5 class="col-12">Describa las opciones de consulta</h5>

        <div class="form-group col-4">
            <label for="TX_TBLBASE_COHI" class="form-label">Nombre Tabla</label>
            <input type="text" class="form-control" name="TX_TBLBASE_COHI" id="TX_TBLBASE_COHI">
        </div>
        <div class="form-group col-4">
            <label for="TX_CODBASE_COHI" class="form-label">Codigo identificador</label>
            <input type="text" class="form-control" name="TX_CODBASE_COHI" id="TX_CODBASE_COHI">
        </div>
        <div class="form-group col-4">
            <label for="TX_NOMBASE_COHI" class="form-label">Nombre campo</label>
            <input type="text" class="form-control" name="TX_NOMBASE_COHI" id="TX_NOMBASE_COHI">
        </div>
        <div class="form-group col-12 mt-2">
            <label for="TX_CONDBAS_COHI" class="form-label">Condicional</label>
            <input type="text" class="form-control" name="TX_CONDBAS_COHI" id="TX_CONDBAS_COHI">
        </div>
    </div>
`;

export default (modal, opts) => {
    const contenedor = document.createElement("div");
    const form = document.createElement("form");
    const {idEditing, btnTextContent, type} = opts;

    const optsListaDesplegable = type === "listaDezplegable"
    ? `
        <div class="mb-3">
            <label for="select_type-concepto_hist" class="form-label">Seleccione tipo</label>
            <select type="text" class="form-select" name="TX_CONDBAS_COHI" value="${type}" id="select_relacion-concepto_hist">
                <option value="0">Número</option>
                <option value="1">Texto</option>
                <option value="2">Fecha</option>
                <option value="3">Memorando</option>
                <option value="4">Opción</option>
                <option value="5">Selección</option>
                <option value="7">Hora</option>
            </select>
        </div>
    `
    : "";

    const optsListaAsociada = type === "listaAsociada"
    ? `
        <div class="form-group row mb-3">
            <label for="selector-dato_fijo" class="col-2">Es dato fijo</label>
            <div class="col-10">
                <select id="selector-dato_fijo" name="TX_DATFIJO_COHI" class="form-select">
                    <option value="N" selected>No</option>
                    <option value="S">Si</option>
                </select>
            </div>
        </div>
    `
    : "";

    form.innerHTML = `
        <div class="mb-3">
            <label for="select_type-concepto_hist" class="form-label">Seleccione tipo</label>
            <select type="text" class="form-select" name="NU_TIPO_COHI" value="${type}" id="select_type-concepto_hist">
                <option value="0">Número</option>
                <option value="1">Texto</option>
                <option value="2">Fecha</option>
                <option value="3">Memorando</option>
                <option value="4">Opción</option>
                <option value="5">Selección</option>
                <option value="7">Hora</option>
            </select>
        </div>
        
        ${!idEditing ? `
            <div class="mb-3">
                <label for="crear_CODIGO-concepto_hist" class="form-label">Código</label>
                <input type="text" class="form-control" name="CD_CODI_COHI" id="crear_CODIGO-concepto_hist">
            </div>
        ` : ""}
        
        <div class="mb-3">
            <label for="crear_titulo-concepto_hist" class="form-label">Título</label>
            <input type="text" class="form-control" name="TX_TITULO_COHI" id="crear_titulo-concepto_hist">
        </div>

        ${optsListaDesplegable}
        ${optsListaAsociada}
        ${inpsConfiguracionTablas}

        <input type="number" class="form-control d-none" name="NU_NUME_COHI" value="${idEditing}">
        
        <button type="submit" class="btn btn-primary">${btnTextContent}</button>
    `;

    form.addEventListener("submit", async e => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const idEditing = formData.get("NU_NUME_COHI");
        const title = idEditing ? "Error editando concepto." : "Error crando concepto.";

        if(type === "listaAsociada") {
            const relacion = formData.get("TX_CONDBAS_COHI");
            formData.set("TX_TBLBASE_COHI", "LISTA_OPCION")
            formData.set("TX_CODBASE_COHI", "ID_AUTO_OPCIO")
            formData.set("TX_NOMBASE_COHI", "TX_DESC_OPCI")
            formData.set("TX_CONDBAS_COHI", `TX_GRUP_OPCI=''${relacion}''`)
        }

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

    const selectorDatoFijo = form.querySelector("#selector-dato_fijo");
    if(selectorDatoFijo) {
        const confTablas = form.querySelector("#configuraciones-tablas-consulta");
        selectorDatoFijo.addEventListener("change", (e) => {
            console.log(confTablas);
            if(e.target.value === "S") {
                confTablas.classList.remove("d-none");
                confTablas.style.display = "none";
            } else {
                confTablas.classList.add("d-none");
            }

        });

    }

    contenedor.appendChild(form);
    return contenedor;
}