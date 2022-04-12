export const viewErrorsBeforeSave = (arrComponent) => {
    let res;
    for (let i = 0; i < arrComponent.length; i++) {
        const comp = arrComponent[i];
        const acceptedtypes = ["form", "input", "option", "select", "button", "radio", "checkbox"];
        const component = Object.assign({}, comp.attributes);
        component.type = comp.type;
        
        if (comp.isImportant && !component.name) return true;
        
        if(comp.components) {
          res = viewErrorsBeforeSave(comp.components);
        }

        if(res) {
            break;
        }
    }
  
    return res;
}
