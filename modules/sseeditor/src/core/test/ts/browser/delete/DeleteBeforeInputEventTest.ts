import { Keys } from '@ephox/agar';
import { describe, it } from '@ephox/bedrock-client';
import { TinyHooks } from '@ephox/wrap-mcagar';

import Editor from 'sseeditor/core/api/Editor';

import { pressKeyAction, testBeforeInputEvent } from '../../module/test/BeforeInputEventUtils';

describe('browser.sseeditor.core.delete.DeleteBeforeInputEventTest', () => {
  const hook = TinyHooks.bddSetupLight<Editor>({
    base_url: '/project/sseeditor/js/sseeditor'
  }, [], true);

  const testBackspace = testBeforeInputEvent(pressKeyAction(Keys.backspace()), 'deleteContentBackward');

  it('Gets beforeInput', () => {
    testBackspace(hook.editor(), '<p>a<a href="#">bc</a>d</p>', [ 0, 1, 0 ], 1, '<p>a<a href="#">c</a>d</p>', false);
  });

  it('Can prevent beforeInput', () => {
    testBackspace(hook.editor(), '<p>a<a href="#">bc</a>d</p>', [ 0, 1, 0 ], 1, '<p>a<a href="#">bc</a>d</p>', true);
  });
});
