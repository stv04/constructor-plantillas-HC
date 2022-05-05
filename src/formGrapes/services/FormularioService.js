import { endPoint } from "./config.js";

class Formulario {
    async createFormulario(body) {
        console.log(body);
        console.log(JSON.parse(body));
        return await fetch(endPoint, {
            method: "POST",
            headers: {
                "Content-Type": "Application/json"
            },
            body
        }).then(res => {
            if(!res.ok) {
                return res.text();
            }

            return res.json();
        })
        .catch(e => console.log(e));
    }

    async traerFormulario(id) {
        const form = await fetch(endPoint + "?id="+id).then(d => d.json());
        return form;
    }

    async traerFormularios() {
        const form = await fetch(endPoint).then(d => d.json());
        return form.map(f => {
            return {
                id: f.nU_IDFORMULARIO_FORM,
                nombre: f.tX_NOMBREFORMULARIO_FORM,
            }
        });
    }

    async obtenerDocumentosExternos() {
        const documentos = await fetch(endPoint + "/documentosExternos").then(d => d.json());

        return documentos;
    }

    async asociarDocumentosExternos(documentos) {
        for await (let doc of documentos) {
            await fetch(endPoint + "/relacionarDocumento", {
                method: "post",
                body: JSON.stringify(doc),
                headers: {"Content-Type": "Application/json"}
            });
        }
    }
}

export default new Formulario();