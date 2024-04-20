import Editor from 'sseeditor/core/api/Editor';
import { EditorEvent } from 'sseeditor/core/api/util/EventDispatcher';

const fireResizeEditor = (editor: Editor): EditorEvent<{}> =>
  editor.dispatch('ResizeEditor');

export {
  fireResizeEditor
};
