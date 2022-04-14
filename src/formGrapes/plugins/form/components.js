import {typeButton, typeCheckbox, typeForm, typeInput, typeLabel,
    typeOption, typeRadio, typeSelect, typeTextarea} from "../../types/formTypes.js";
   
const idTrait = {
  name: 'id'
};

const forTrait = {
  name: 'for'
};

const nameTrait = {
  name: 'name',
  label: "Nombre"
};

const placeholderTrait = {
  name: 'placeholder',
  label: "Marcador"
};

const valueTrait = {
  name: 'value',
  label: "Valor"
};

const requiredTrait = {
  type: 'checkbox',
  name: 'required',
  label: "Requerido"
};

const checkedTrait = {
  type: 'checkbox',
  name: 'checked',
  label: "Check"
};

const minLength = {
name: "minlength",
label: "Min. long."
}

const maxLength = {
name: "maxlength",
label: "Máx. long."
}   
   
export default function(editor, opt) {
  const domc = editor.DomComponents;

  domc.addType(typeForm, {
    isComponent: el => el.tagName == 'FORM',

    
    model: {
      defaults: {
        tagName: 'form',
        droppable: ':not(form)',
        draggable: ':not(form)',
        attributes: { method: 'POST', action: "/saveData" }
      },
    },

    view: {
      events: {
        submit: e => e.preventDefault(),
      }
    },
  });
  
  // INPUT
  domc.addType(typeInput, {
    isComponent: el => el.tagName == 'INPUT',

    model: {
      defaults: {
        tagName: 'input',
        draggable: '*',
        droppable: false,
        highlightable: false,
        attributes: { 
          type: 'text',
          "data-strict": true
        },
        traits: [
          nameTrait,
          placeholderTrait,
          {
            type: 'select',
            name: 'type',
            label: "Tipo",
            options: [
              { value: 'text' },
              { value: 'email' },
              { value: 'password' },
              { value: 'number' },
              { value: 'date' },
              { value: 'time' },
            ]
          },
          requiredTrait,
          minLength, maxLength
        ],
      },
    },

    extendFnView: ['updateAttributes'],
    view: {
      updateAttributes() {
        this.el.setAttribute('autocomplete', 'off');
      },
    }
  });

  // TEXTAREA
  domc.addType(typeTextarea, {
    extend: typeInput,
    isComponent: el => el.tagName == 'TEXTAREA',

    model: {
      defaults: {
        tagName: 'textarea',
        attributes: { "data-strict": true },
        traits: [
          nameTrait,
          placeholderTrait,
          requiredTrait,
          minLength,
          maxLength
        ]
      },
    },
  });

  // OPTION
  domc.addType(typeOption, {
    isComponent: el => el.tagName == 'OPTION',

    model: {
      defaults: {
        // attributes: {"data-strict": true},
        tagName: 'option',
        layerable: false,
        droppable: false,
        draggable: false,
        highlightable: false,
      },
    },
  });

  const createOption = (value, name) => ({ type: typeOption, components: name, attributes: { value } });

  // SELECT
  domc.addType(typeSelect, {
    extend: typeInput,
    isComponent: el => el.tagName == 'SELECT',

    model: {
      defaults: {
        tagName: 'select',
        attributes: {"data-strict": true},
        components: [
        createOption('opt1', 'Option 1'),
        createOption('opt2', 'Option 2'),
        ],
        traits: [
          nameTrait,
          requiredTrait,
          {
            name: "dataMaster",
            label: "Datos",
            type: "dataMaster-options"
          },
        ],
      },
    },

    view: {
      events: {
        mousedown: e => e.preventDefault(),
      },
    },
  });

  // CHECKBOX
  domc.addType(typeCheckbox, {
    extend: typeInput,
    isComponent: el => el.tagName == 'INPUT' && el.type == 'checkbox',

    model: {
      defaults: {
        copyable: false,
        attributes: { type: 'checkbox', "data-strict": true },
        traits: [
          idTrait,
          nameTrait,
          valueTrait,
          requiredTrait,
          checkedTrait
        ],
      },
    },

    view: {
      events: {
        click: e => e.preventDefault(),
      },

      init() {
        this.listenTo(this.model, 'change:attributes:checked', this.handleChecked);
      },

      handleChecked() {
        this.el.checked = !!this.model.get('attributes').checked;
      },
    },
  });

  // RADIO
  domc.addType(typeRadio, {
    extend: typeCheckbox,
    isComponent: el => el.tagName == 'INPUT' && el.type == 'radio',

    model: {
      defaults: {
        attributes: { type: 'radio', "data-strict": true },
      },
    },
  });

  domc.addType(typeButton, {
    extend: typeInput,
    isComponent: el => el.tagName == 'BUTTON',

    model: {
      defaults: {
        tagName: 'button',
        attributes: { type: 'button' },
        text: 'Send',
        traits: [
          {
            name: 'text',
            changeProp: true,
          }, {
            type: 'select',
            name: 'type',
            options: [
              { value: 'button' },
              { value: 'submit' },
              { value: 'reset' },
            ]
        }]
      },

      init() {
        const comps = this.components();
        const tChild =  comps.length === 1 && comps.models[0];
        const chCnt = (tChild && tChild.is('textnode') && tChild.get('content')) || '';
        const text = chCnt || this.get('text');
        this.set({ text });
        this.on('change:text', this.__onTextChange);
        (text !== chCnt) && this.__onTextChange();
      },

      __onTextChange() {
        this.components(this.get('text'));
      },
    },

    view: {
      events: {
        click: e => e.preventDefault(),
      },
    },
  });

  // LABEL
  domc.addType(typeLabel, {
    extend: 'text',
    isComponent: el => el.tagName == 'LABEL',

    model: {
      defaults: {
        tagName: 'label',
        label: "Etiqueta",
        components: 'Contenido',
        traits: [forTrait],
      },
    },
  });
}