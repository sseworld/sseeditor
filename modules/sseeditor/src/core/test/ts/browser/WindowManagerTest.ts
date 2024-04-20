import { describe, it } from '@ephox/bedrock-client';
import { TinyHooks } from '@ephox/wrap-mcagar';
import { assert } from 'chai';

import Editor from 'sseeditor/core/api/Editor';
import { WindowEvent } from 'sseeditor/core/api/EventTypes';
import { EditorEvent } from 'sseeditor/core/api/util/EventDispatcher';

describe('browser.sseeditor.core.WindowManagerTest', () => {
  const hook = TinyHooks.bddSetupLight<Editor>({
    add_unload_trigger: false,
    disable_nodechange: true,
    indent: false,
    entities: 'raw',
    base_url: '/project/sseeditor/js/sseeditor'
  }, []);

  it('OpenWindow/CloseWindow events', () => {
    const editor = hook.editor();
    let openWindowArgs: EditorEvent<WindowEvent<any>> | undefined;
    let closeWindowArgs: EditorEvent<WindowEvent<any>> | undefined;

    editor.on('CloseWindow', (e) => {
      closeWindowArgs = e;
    });

    editor.on('OpenWindow', (e) => {
      openWindowArgs = e;
      editor.windowManager.close();
    });

    editor.windowManager.open({
      title: 'Find and Replace',
      body: {
        type: 'panel',
        items: []
      },
      buttons: []
    });

    assert.equal(openWindowArgs?.type, 'openwindow');
    assert.equal(closeWindowArgs?.type, 'closewindow');

    editor.off('CloseWindow OpenWindow');
  });
});
