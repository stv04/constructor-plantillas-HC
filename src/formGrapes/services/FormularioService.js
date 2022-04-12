import { endPoint } from "./config.js";

class Formulario {
    createFormulario(body) {
        fetch(endPoint, {
            method: "POST",
            headers: {
                "Content-Type": "Application/json"
            },
            body
        }).then(res => {
            if(!res.ok) {
                return res.text();
            }
        })
        .then(d => console.log(d))
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

    
}

export default new Formulario();