const quitHash = hexa => hexa.replace("#", "");

function formatColor(clr, def) {
	if(!clr) return def;
  let colorExa = def;
  const initial = "#FF";

	if(/rgb/.test(clr)) {
  	const reColores = /\d+/g;
    const colores = clr.match(reColores);
    if(colores.length === 4) colores.pop();
    
      colorExa = colores.reduce((a,b) => {
        const color = parseInt(b);
        let actual = color.toString(16).toUpperCase();
        
        if(isNaN(color) || color < 0) {
          actual = "00"
        } else if(color > 255) {
          actual = "FF"
        }
        
        actual = actual.length === 1 ? "0" + actual : actual;
        return a += actual;
      }, initial)
  	} else {
  		colorExa = initial + clr.replace("#", "");
  	}
  
  console.log(colorExa);
  return colorExa;
}

function setBorders(style) {
	const borderPositions = ["left", "top", "right", "bottom"];
  
  if(style.border) return "0;0;0;0";
  
  const formedBorder = borderPositions.map(b => {
  	const borderWidth = style["border-"+b+"width"];
    const borderPos = style["border-"+b];
    
    return borderWidth || borderPos ? 1 : 0
  }).join(";");
  
  console.log(formedBorder);
  return formedBorder;
}

const getPropertiesRotulo = rotulo => {
    const definiciones = [
      "0:background-color", "1:color", "2:total_ancho", "3:text-align", "4:rotuloPerpen",
      "5:visible", "6:font-weight", "7:alineacion vertical", "8:font-size"
    ]
    const valores = ["#00FFFFFF", "#FF000000", 1, 0, 0, 1, 0, 0, 14];
    
    if (rotulo && rotulo.style) {
      console.log(rotulo);
      const style = rotulo.style;
      const {color, display} = style;
      const backgroundColor = style["background-color"];
      const fontSize = style["font-size"];
      const fontWeigth = style["font-weigth"];
      const textAlign = style["text-align"];
  
  
      if(backgroundColor) valores[0] = formatColor(backgroundColor, valores[0]);
      if(color) valores[1] = formatColor(color, valores[1]);
      if(display === "none") valores[5] = 0;
      if(fontWeigth > 500) valores[6] = 1;
      if(fontSize) valores[8] = parseInt(fontSize);
  
      if(textAlign === "center") valores[3] = 1;
      if(textAlign === "right") valores[3] = 2;
    }
  
    return valores;
}

const convert_px_to_tw = px => {
    const pixel = parseInt(px);
    return Math.round(pixel * 567 / 37.7952)
}

export {quitHash, getPropertiesRotulo, convert_px_to_tw, setBorders};