import { Cell } from '@ephox/katamari';

import Editor from 'sseeditor/core/api/Editor';
import { Menu, Toolbar } from 'sseeditor/core/api/ui/Ui';
import { EditorEvent } from 'sseeditor/core/api/util/EventDispatcher';

const toggleActiveState = (editor: Editor, enabledStated: Cell<boolean>) => (api: Toolbar.ToolbarToggleButtonInstanceApi | Menu.ToggleMenuItemInstanceApi) => {
  api.setActive(enabledStated.get());
  const editorEventCallback = (e: EditorEvent<{ state: boolean }>) => api.setActive(e.state);
  editor.on('VisualChars', editorEventCallback);
  return () => editor.off('VisualChars', editorEventCallback);
};

const register = (editor: Editor, toggleState: Cell<boolean>): void => {
  const onAction = () => editor.execCommand('mceVisualChars');

  editor.ui.registry.addToggleButton('visualchars', {
    tooltip: 'Show invisible characters',
    icon: 'visualchars',
    onAction,
    onSetup: toggleActiveState(editor, toggleState)
  });

  editor.ui.registry.addToggleMenuItem('visualchars', {
    text: 'Show invisible characters',
    icon: 'visualchars',
    onAction,
    onSetup: toggleActiveState(editor, toggleState)
  });
};

export {
  register
};
