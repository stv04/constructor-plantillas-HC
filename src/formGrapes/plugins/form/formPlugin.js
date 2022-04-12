import formTraits from "./traits.js";
import formBlocks from "./blocks.js";
import formComponent from "./components.js";

export default (editor, opts) => {
    const config = {
        blocks: ['form', 'input', 'textarea', 'select', 'button', 'label', 'checkbox', 'radio'],
        ...opts
    };

    formComponent(editor, config);
    formTraits(editor);
    formBlocks(editor, config);
}