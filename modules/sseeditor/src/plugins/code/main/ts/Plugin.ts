import PluginManager from 'sseeditor/core/api/PluginManager';

import * as Commands from './api/Commands';
import * as Buttons from './ui/Buttons';

export default (): void => {
  PluginManager.add('code', (editor) => {
    Commands.register(editor);
    Buttons.register(editor);

    return {};
  });
};
