export default function() {
    class Seguimiento {
        constructor(element) {
            this.element = element;
            this.seguimiento =
                JSON.parse(element.getAttribute("data-value")) || [];
        }

        init() {
            this.bodySeguimiento = document.getElementById("seguimiento-molar");
            this.stop = false;
            this.agregarSeguimientos();
            this.render();
        }

        push(obj, fnc) {
            if (this.stop) return;
            this.seguimiento.push(obj);
            
            this.agregarSeguimiento(document.getElementById("seguimiento-molar"), obj);
            
            let limpio;
            if(obj.culminado) {
                this.stop = true;
                this.controlGlobal(this.element, obj.idCodTipo);
                limpio = true;
                this.render(this.element, limpio);
            };


            if (fnc) fnc(limpio);
        }

        delete(id, fnc) {
            const i = this.seguimiento.findIndex((p) => p.id == id);
            this.seguimiento.splice(i, 1);
            if (fnc) fnc();
            this.stop = this.seguimiento.some(s => s.culminado);
            this.render(this.element);
            return this.seguimiento;
        }

        render(nodeElement, clean) {
            const element = nodeElement || this.element;
                
            element
            .querySelectorAll("[data-superficie]")
            .forEach((el) => (el.style.fill = "transparent"));

            if(clean) return;
            console.log(element);

            this.controlGlobal(element);
            for(let hist of this.seguimiento) {
                element.querySelector(
                "[data-codsuperficie='" + hist.codSuperficie + "']"
                ).style.fill = "url("+findIdBackground(element, hist.idCodTipo)+")";

                if(hist.culminado) {
                    this.controlGlobal(element, hist.idCodTipo);
                    this.render(element, true);

                    break;
                }
            }

            element.setAttribute("data-value", JSON.stringify(this.seguimiento));
        }

        controlGlobal(elementNode, idCodTipo) {
            const element = elementNode || this.element;
            const fondo = element.querySelector(`[data-codigo="${idCodTipo}"]`);
            const hashFondo = fondo ? "#" + fondo.id : false;
            const codTipo = hashFondo 
            ? "url(" + hashFondo + ")" : "none";

            element.querySelector(".inabilitador-seleccion")
            .style.fill = codTipo
        }

        agregarSeguimiento(container, prop) {
            const fila = document.createElement("tr");
            const celdaAction = document.createElement("td");

            const button = document.createElement("button");
            button.setAttribute("class", "btn btn-sm btn-danger rounded deleter");
            button.innerText = "D";
            const newRow = new DOMParser().parseFromString(
                `
                        <tr>
                            <td scope="row">
                                <button 
                                class="btn btn-sm btn-danger rounded deleter"
                                >
                                    D
                                </button>
                            </td>
                            
                        </tr>    
                    `,
                "text/html"
            );

            celdaAction.appendChild(button);
            fila.appendChild(celdaAction);
            fila.innerHTML += `
                <td>${prop.superficie}</td>
                <td>${prop.detalle}</td>
                <td>${prop.tipo}</td>
            `;

            container.appendChild(fila);
            fila.querySelector(".deleter").addEventListener("click", () => {
                container.innerHTML = "";
                const newHistorial = this.delete(prop.id);
                newHistorial.forEach((h) => this.agregarSeguimiento(container, h));
            });
        }

        agregarSeguimientos() {
            this.bodySeguimiento.innerHTML = "";
            this.seguimiento.forEach((seg) => {
                this.agregarSeguimiento(this.bodySeguimiento, seg);
            });
        }
    }

    function findIdBackground(element, codigo) {
        const fondo = element.querySelector(`[data-codigo="${codigo}"]`);
        const hashFondo = fondo ? "#" + fondo.id : false;
        return hashFondo;
    }

    const modal = document.getElementById("modal-odontograma");
    const editor = modal.querySelector("#svg-principal-editor");
    let controladorSeguimiento = new Seguimiento(editor);
    
    modal.querySelectorAll(".superficie-diente")
        .forEach(el => {
            el.addEventListener("click", (e) => {
                const superficie = el.getAttribute("data-superficie");
                const selector = document.querySelector("[name='options-type']:checked");
                const selectorGlobal = document.querySelector("[name='donde-procesar']:checked");
                const [tipo, detalle] = selector.value.split(":");
                
                let superficieTotal, culminado = false;
                if(selectorGlobal.value !== "superficie") {
                    superficieTotal = selectorGlobal.value;
                    culminado = true;
                }

                const codTipo = selector.getAttribute("data-codtype");
                const idCodTipo = "codType-superficie-" + codTipo;
        
                const propiedad = {
                    tipo,
                    detalle, codTipo, idCodTipo,
                    codSuperficie: el.getAttribute("data-codsuperficie"),
                    superficie: superficieTotal || superficie,
                    id: new Date().getTime(),
                    culminado
                };
            
            
                controladorSeguimiento.push(propiedad, (limpio) => {
                    if(limpio) return;
                    const fondo = modal.querySelector(`[data-codigo="${idCodTipo}"]`);
                    const hashFondo = "#" + fondo.id;

                    el.style.fill = "url("+hashFondo+")";   
                    const texto = el.parentElement.querySelector(".texto-superficie-"+propiedad.codSuperficie.trim())
                    if(texto) texto.innerHTML = propiedad.detalle;
                    
                });
            })
        })

    let guardarConfiguracion = () => {}

    modal.addEventListener("show.bs.modal", function (event) {
        // Button that triggered the modal
        var triger = event.relatedTarget;
        const historialPrevioString = triger.getAttribute("data-value")
        const historialPrev = JSON.parse(historialPrevioString);
        
        controladorSeguimiento.seguimiento = historialPrev || [];
        controladorSeguimiento.init();

        guardarConfiguracion = () => {
            controladorSeguimiento.render(triger);
        }
    });

    modal.querySelector("#btn-guardar-configuracion")
    .addEventListener("click", () => {
        guardarConfiguracion();
    })


}
