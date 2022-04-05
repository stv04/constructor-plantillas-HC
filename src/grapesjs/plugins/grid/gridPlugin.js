import components from './components.js';
import blocks from './blocks.js';
import traits from './traits.js';

export default (editor, opts = {}) => {
  const config = {
    blocks: ['column1', 'column2', 'column3', 'column4', 'column6', "row"],
    flexGrid: 0,
    stylePrefix: 'gjs-',
    addBasicStyle: true,
    category: 'Basic',
    labelColumn1: '1 Columna',
    labelColumn2: '2 Columnas',
    labelColumn3: '3 Columnas',
    labelColumn4: '4 Columnas',
    labelColumn6: '6 Columns',
    labelText: 'Text',
    labelLink: 'Link',
    labelImage: 'Image',
    labelVideo: 'Video',
    labelMap: 'Map',
    ...opts
  };

  // Add blocks
  components(editor, config);
  blocks(editor, config);
  traits(editor);
};
