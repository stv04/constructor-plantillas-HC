export default function(props) {
    const camposCalculados = (props) => {
        let { sentence } = props;

        const matchEl = /{[^{}]+}/g;
        const target = this;
        
        const nameEls = sentence.match(matchEl);

        console.log(nameEls);
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
            target.value = Function("return " + "Math.ceil("+sentencia+"* 100).toFixed(2) / 100")()

        }

        els.forEach(el => el.addEventListener("keyup", calculo));
    }

    const campoDependiente = (props) => {
        const {dependence} = props;
        const [elName, igualator] = dependence.split("::");
        const el = document.getElementsByName(elName)[0];
        const prevDisplay = el.style.display;
    
        const target = this;
    
        function hideShow(e) {
            const val = e.target ? e.target.value : e;
            
            if(val !== igualator) {
                target.style.display = "none";
            } else {
                target.style.display = prevDisplay;
            }
        }
        
        hideShow(el.value);
    
        el.addEventListener("change", hideShow);
    }

    if(props.sentence) {
        camposCalculados(props);
    }

    if(props.dependence) {
        campoDependiente.bind(this)(props)
    }
}