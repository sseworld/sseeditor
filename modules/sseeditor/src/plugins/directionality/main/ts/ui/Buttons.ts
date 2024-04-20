import { Direction, SugarElement } from '@ephox/sugar';

import Editor from 'sseeditor/core/api/Editor';
import { NodeChangeEvent } from 'sseeditor/core/api/EventTypes';
import { Toolbar } from 'sseeditor/core/api/ui/Ui';
import { EditorEvent } from 'sseeditor/core/api/util/EventDispatcher';

const getNodeChangeHandler = (editor: Editor, dir: 'ltr' | 'rtl') => (api: Toolbar.ToolbarToggleButtonInstanceApi) => {
  const nodeChangeHandler = (e: EditorEvent<NodeChangeEvent>) => {
    const element = SugarElement.fromDom(e.element);
    api.setActive(Direction.getDirection(element) === dir);
    api.setEnabled(editor.selection.isEditable());
  };
  editor.on('NodeChange', nodeChangeHandler);
  api.setEnabled(editor.selection.isEditable());

  return () => editor.off('NodeChange', nodeChangeHandler);
};

const register = (editor: Editor): void => {
  editor.ui.registry.addToggleButton('ltr', {
    tooltip: 'Left to right',
    icon: 'ltr',
    onAction: () => editor.execCommand('mceDirectionLTR'),
    onSetup: getNodeChangeHandler(editor, 'ltr')
  });

  editor.ui.registry.addToggleButton('rtl', {
    tooltip: 'Right to left',
    icon: 'rtl',
    onAction: () => editor.execCommand('mceDirectionRTL'),
    onSetup: getNodeChangeHandler(editor, 'rtl')
  });
};

export {
  register
};
