import { typeButton, typeInput, typeRadio, typeTextarea } from "../../types/formTypes.js"
import { typeRotulo } from "../../types/gridTypes.js"

export default (idType, idConcept, nombre) => {
    const rotuloComponent = {type: typeRotulo, content: nombre};
    switch(parseInt(idType)) {
        case 0: 
            return [
                rotuloComponent,
                {type: typeInput, attributes: {type: "number"}}
            ]
        case 1: 
            return [
                rotuloComponent,
                {type: typeInput}
            ]
        case 2: 
            return [
                rotuloComponent,
                {type: typeInput, attributes: {type: "date"}}
            ]
        case 3: 
            return [
                rotuloComponent,
                {type: typeTextarea}
            ]
        case 4: 
            return [
                rotuloComponent,
                {type: typeRadio}
            ]
        case 5: 
            return [
                {type: typeRotulo, content: nombre},
                {type: typeInput, attributes: {type: "checkbox"}}
            ]
        //preguntar sobre el 6
        case 7: 
            return [
                {type: typeRotulo, content: nombre},
                {type: typeInput, attributes: {type: "time"}}
            ]
        default:
            return [
                {type: typeRotulo, content: nombre},
                {type: typeButton}
            ]
    }
}