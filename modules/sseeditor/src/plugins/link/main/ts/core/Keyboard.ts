import Editor from 'sseeditor/core/api/Editor';

const setup = (editor: Editor): void => {
  editor.addShortcut('Meta+K', '', () => {
    editor.execCommand('mceLink');
  });
};

export {
  setup
};
