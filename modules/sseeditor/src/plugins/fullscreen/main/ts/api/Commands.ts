import { Cell } from '@ephox/katamari';

import Editor from 'sseeditor/core/api/Editor';

import * as Actions from '../core/Actions';

const register = (editor: Editor, fullscreenState: Cell<Actions.FullScreenInfo | null>): void => {
  editor.addCommand('mceFullScreen', () => {
    Actions.toggleFullscreen(editor, fullscreenState);
  });
};

export {
  register
};
