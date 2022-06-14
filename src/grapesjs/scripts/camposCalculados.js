export default function(props) {
    let { sentence, nombreCampo } = props;

    const matchEl = /\?[^\?]+\?/g;
    const target = this;
    
    const nameEls = sentence.match(matchEl);

    const frame = document.getElementById("gjs").querySelector("iframe").contentDocument;

    console.log(sentence, nameEls);
    const els = nameEls.map(name => {
        const nameEl = name.replace(/[\?]+/g, "");

        const query = `[data-nombrecampo="${nameEl}"]`;
        console.log(nameEl, name, query);

        return frame.querySelector(query);
    });

    console.log(els);

    function calculo(e) {
        const val = e.target.value;
        let sentencia = sentence;
        let full = true;

        els.forEach(el => {
            const name = "?" + el.getAttribute("data-nombrecampo") + "?";
            console.log(el, name)
            const value = el.querySelector("input").value;
            if(!value) full = false;
            sentencia = sentencia.replace(name, value);
        });

        console.log(target);

        if(full)
        target.value = Function("return " + sentencia)()

        console.log(val);
    }

    els.forEach(el => el && el.removeEventListener("keyup", calculo));
    els.forEach(el => el && el.addEventListener("keyup", calculo));
}