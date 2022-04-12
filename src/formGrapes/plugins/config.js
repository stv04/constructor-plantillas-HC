import formPlugin from "./form/formPlugin.js";
import gridPlugin from "./grid/gridPlugin.js";

grapesjs.plugins.add("basicPlugin", (editor, opts = {}) => {
    const config = opts;
    
    const grid = config.gridConfig || {};
    gridPlugin(editor, grid);
});

grapesjs.plugins.add("formPlugin", (editor, opts = {}) => {
    const config = opts;
    
    const form = config.formConfig || {};
    form && formPlugin(editor, form);
    
});