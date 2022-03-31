export default function(props) {
    const {dependence, typeOption} = props;

    const els = dependence.split(",")
    .map(name => {
        return document.getElementsByName(name.trim())[0];
    })
    const target = this;

    function showFinded(e) {
        const val = e.target ? e.target.value : e;
        const [tabla, relacion] = val.split(",");
        target.innerHTML = "<option value''>---Cargando---</option>"

        fetch("http://localhost:3000/maestros?idrelacion=" + tabla)
        .then(d => d.json())
        .then(data => {
            data = data.filter(d => d.relacion == relacion);
            if(!data.length) return;

            target.innerHTML = "";
            appendOption("", "-- Seleccione --");
            data.forEach(completeData => {
                JSON.parse(completeData.dato).forEach((d, i) => {
                    appendOption(completeData.iddatomaestro + "," + i, d);
                });
            });
        });
        
    }

    function appendOption(value, text) {
        const option = document.createElement("option");
        option.value = value;
        option.innerHTML = text;
        target.appendChild(option);
    }

    showFinded(el.value);

    els.forEach(el => {
        el.addEventListener("change", showFinded);
    })
}