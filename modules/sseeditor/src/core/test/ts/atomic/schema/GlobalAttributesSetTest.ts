import { describe, it } from '@ephox/bedrock-client';
import { assert } from 'chai';

import * as GlobalAttributesSet from 'sseeditor/core/schema/GlobalAttributesSet';
import * as SchemaTypes from 'sseeditor/core/schema/SchemaTypes';

describe('atomic.sseeditor.core.schema.GlobalAttributesSetTest', () => {
  const testGlobalAttributesSet = (testCase: { type: SchemaTypes.SchemaType; expected: readonly string[] }) => {
    const globalAttributes = GlobalAttributesSet.getGlobalAttributeSet(testCase.type);

    assert.deepEqual(globalAttributes, testCase.expected);

    // Should not be mutable
    assert.throw(() => {
      (globalAttributes as string[]).push('foo');
    });
  };

  it('HTML5 element sets', () => testGlobalAttributesSet({
    type: 'html5',
    expected: [
      'id', 'accesskey', 'class', 'dir', 'lang', 'style', 'tabindex', 'title', 'role', 'contenteditable', 'contextmenu',
      'draggable', 'dropzone', 'hidden', 'spellcheck', 'translate', 'xml:lang'
    ]
  }));

  it('HTML5-strict element sets', () => testGlobalAttributesSet({
    type: 'html5-strict',
    expected: [
      'id', 'accesskey', 'class', 'dir', 'lang', 'style', 'tabindex', 'title', 'role', 'contenteditable', 'contextmenu',
      'draggable', 'dropzone', 'hidden', 'spellcheck', 'translate'
    ]
  }));

  it('HTML4 element sets', () => testGlobalAttributesSet({
    type: 'html4',
    expected: [
      'id', 'accesskey', 'class', 'dir', 'lang', 'style', 'tabindex', 'title', 'role', 'xml:lang'
    ]
  }));
});

