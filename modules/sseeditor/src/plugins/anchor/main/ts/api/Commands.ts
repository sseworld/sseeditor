import Editor from 'sseeditor/core/api/Editor';

import * as Dialog from '../ui/Dialog';

const register = (editor: Editor): void => {
  editor.addCommand('mceAnchor', () => {
    Dialog.open(editor);
  });
};

export {
  register
};
