import { describe, it } from '@ephox/bedrock-client';
import { assert } from 'chai';

import * as Zwsp from 'sseeditor/core/text/Zwsp';

describe('atomic.sseeditor.core.text.ZwspTest', () => {
  it('Zero-width space', () => {
    assert.equal(Zwsp.ZWSP, '\uFEFF', 'ZWSP should be FEFF');
    assert.isTrue(Zwsp.isZwsp(Zwsp.ZWSP), 'isZwsp(ZWSP) should be true');
    assert.equal(Zwsp.trim('a' + Zwsp.ZWSP + 'b'), 'ab', 'ZWSP should be stripped out');
  });
});
