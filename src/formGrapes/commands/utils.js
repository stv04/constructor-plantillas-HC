export const viewErrorsBeforeSave = (arrComponent) => {
    let res;
    for (let i = 0; i < arrComponent.length; i++) {
        const comp = arrComponent[i];
        const acceptedtypes = ["form", "input", "option", "select", "button", "radio", "checkbox"];
        const component = Object.assign({}, comp.attributes);
        component.type = comp.type;
        
        if (component["data-strict"] && !component.name) return component;
        
        if(comp.components) {
          res = viewErrorsBeforeSave(comp.components);
        }

        if(res) {
            break;
        }
    }
  
    return res;
}
