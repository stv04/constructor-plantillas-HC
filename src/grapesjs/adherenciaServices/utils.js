const quitHash = hexa => hexa.replace("#", "");
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
  
  
      if(backgroundColor) valores[0] = "#FF" + quitHash(backgroundColor);
      if(color) valores[1] = "#FF" + quitHash(color);
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

export {quitHash, getPropertiesRotulo, convert_px_to_tw};