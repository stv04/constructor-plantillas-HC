export default function(props) {
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