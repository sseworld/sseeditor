import Editor from 'sseeditor/core/api/Editor';

const register = (editor: Editor, dialogOpener: () => void): void => {
  editor.addCommand('mceHelp', dialogOpener);
};

export {
  register
};
