import { describe, it } from '@ephox/bedrock-client';
import { assert } from 'chai';

import * as InternalHtml from 'sseeditor/core/paste/InternalHtml';

describe('atomic.sseeditor.core.paste.InternalHtmlTest', () => {
  it('mark', () => {
    assert.equal(InternalHtml.mark('abc'), '<!-- x-sseeditor/html -->abc');
  });

  it('unmark', () => {
    assert.equal(InternalHtml.unmark('<!-- x-sseeditor/html -->abc'), 'abc');
    assert.equal(InternalHtml.unmark('abc<!-- x-sseeditor/html -->'), 'abc');
  });

  it('isMarked', () => {
    assert.isTrue(InternalHtml.isMarked('<!-- x-sseeditor/html -->abc'));
    assert.isTrue(InternalHtml.isMarked('abc<!-- x-sseeditor/html -->'));
    assert.isFalse(InternalHtml.isMarked('abc'));
  });

  it('internalHtmlMime', () => {
    assert.equal(InternalHtml.internalHtmlMime(), 'x-sseeditor/html');
  });
});
