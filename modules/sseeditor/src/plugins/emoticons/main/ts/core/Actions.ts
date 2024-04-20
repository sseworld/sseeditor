import Editor from 'sseeditor/core/api/Editor';

const insertEmoticon = (editor: Editor, ch: string): void => {
  editor.insertContent(ch);
};

export {
  insertEmoticon
};
