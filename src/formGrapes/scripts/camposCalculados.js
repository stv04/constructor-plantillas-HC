export default function(props) {
    let { sentence, nombreCampo } = props;

    const matchEl = /{[^{}]+}/g;
    const target = this;
    
    const nameEls = sentence.match(matchEl);

    const els = nameEls.map(name => {
        const nameEl = name.replace(/[{}]/g, "");

        return document.getElementsByName(nameEl.trim())[0];
    });

    function calculo(e) {
        const val = e.target.value;
        let sentencia = sentence;
        let full = true;

        els.forEach(el => {
            const name = "{" + el.getAttribute("name") + "}";
            const value = el.value;
            if(!value) full = false;
            sentencia = sentencia.replace(name, value);
        });

        if(full)
        target.value = Function("return " + sentencia)()

        console.log(val);
    }

    els.forEach(el => el.addEventListener("keyup", calculo));
}