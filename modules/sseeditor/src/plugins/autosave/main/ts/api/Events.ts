import Editor from 'sseeditor/core/api/Editor';
import { EditorEvent } from 'sseeditor/core/api/util/EventDispatcher';

const fireRestoreDraft = (editor: Editor): EditorEvent<{}> =>
  editor.dispatch('RestoreDraft');

const fireStoreDraft = (editor: Editor): EditorEvent<{}> =>
  editor.dispatch('StoreDraft');

const fireRemoveDraft = (editor: Editor): EditorEvent<{}> =>
  editor.dispatch('RemoveDraft');

export {
  fireRestoreDraft,
  fireStoreDraft,
  fireRemoveDraft
};
