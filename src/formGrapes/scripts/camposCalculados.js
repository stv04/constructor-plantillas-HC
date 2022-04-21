export default function(props) {
    const { dependence } = props;

    const els = dependence.split(",")
    .map(name => {
        return document.getElementsByName(name.trim())[0];
    });

    function calculo(e) {
        const val = e.target.value;

        console.log(val);
    }

    els.forEach(el => el.addEventListener("keyup", calculo))
    const target = this;
}