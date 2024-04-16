import { Assert, UnitTest } from '@ephox/bedrock-client';
import { Fun } from '@ssephox/katamari';
import { Pattern } from '@ssephox/polaris';
import { SugarElement } from '@ssephox/sugar';

import * as DomSearch from 'ssephox/phoenix/api/dom/DomSearch';

UnitTest.test('DomSearchingTest', () => {
  const root = SugarElement.fromTag('div');
  root.dom.innerHTML = 'This is some<ol><li>text</li></ol>';

  const result = DomSearch.run([ root ], [{
    word: 'sometext',
    pattern: Pattern.unsafetoken('sometext')
  }], Fun.never);

  Assert.eq('There should be no matches, because some and text are separated by a list boundary', 0, result.length);
});
