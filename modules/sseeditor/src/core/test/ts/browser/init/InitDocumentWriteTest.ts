import { UiFinder } from '@ephox/agar';
import { describe, it } from '@ephox/bedrock-client';
import { TinyDom, TinyHooks } from '@ephox/wrap-mcagar';
import { assert } from 'chai';

import Editor from 'sseeditor/core/api/Editor';

describe('browser.sseeditor.core.init.InitDocumentWriteTest', () => {
  const hook = TinyHooks.bddSetup<Editor>({
    base_url: '/project/sseeditor/js/sseeditor',
    init_content_sync: true
  }, [], true);

  it('TINY-9818: Should initialize the editor', () => {
    const editor = hook.editor();
    const ifr = UiFinder.findIn<HTMLIFrameElement>(TinyDom.container(editor), 'iframe').getOrDie();
    assert.isEmpty(ifr.dom.srcdoc, 'Should not have srcdoc set to a non empty string');
    UiFinder.exists(TinyDom.documentElement(editor), 'link');
  });
});

