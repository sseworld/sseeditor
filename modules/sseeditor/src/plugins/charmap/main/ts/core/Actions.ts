import Editor from 'sseeditor/core/api/Editor';

import * as Events from '../api/Events';

const insertChar = (editor: Editor, chr: string): void => {
  const evtChr = Events.fireInsertCustomChar(editor, chr).chr;
  editor.execCommand('mceInsertContent', false, evtChr);
};

export {
  insertChar
};
