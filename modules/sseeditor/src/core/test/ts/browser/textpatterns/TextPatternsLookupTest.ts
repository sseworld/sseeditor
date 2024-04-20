import { TestStore } from '@ephox/agar';
import { beforeEach, describe, it } from '@ephox/bedrock-client';
import { TinyHooks } from '@ephox/wrap-mcagar';

import Editor from 'sseeditor/core/api/Editor';
import { DynamicPatternContext } from 'sseeditor/core/textpatterns/core/PatternTypes';

import * as Utils from '../../module/test/TextPatternsUtils';

describe('browser.sseeditor.textpatterns.TextPatternsLookupTest', () => {
  const store = TestStore();
  const hook = TinyHooks.bddSetupLight<Editor>({
    text_patterns: [
      { start: '**', end: '**', format: 'bold' }
    ],
    base_url: '/project/sseeditor/js/sseeditor',
    text_patterns_lookup: (ctx: DynamicPatternContext) => {
      store.add(ctx.text);
      return [
        { start: '**', end: '**', format: 'italic' }
      ];
    }
  }, [ ]);

  beforeEach(() => {
    store.clear();
  });

  it('TINY-8778: should only be called once when pressing enter key', () => {
    Utils.setContentAndPressSpace(hook.editor(), 'brb');
    store.assertEq('should only be called once', [ 'brb' ]);
  });

  it('TINY-8778: should only be called once when pressing space key', () => {
    Utils.setContentAndPressSpace(hook.editor(), '**brb**');
    store.assertEq('should only be called once', [ '**brb**' ]);
  });
});
