import { describe, it } from '@ephox/bedrock-client';
import { assert } from 'chai';

import Tools from 'sseeditor/core/api/util/Tools';

describe('browser.sseeditor.core.util.ToolsTest', () => {
  it('extend', () => {
    assert.deepEqual({ a: 1, b: 2, c: 3 }, Tools.extend({ a: 1 }, { b: 2 }, { c: 3 }));
    assert.deepEqual({ a: 1, c: 3 }, Tools.extend({ a: 1 }, null as any, { c: 3 }));
  });
});
