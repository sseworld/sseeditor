import { Assert, UnitTest } from '@ephox/bedrock-client';

import * as Style from 'ssephox/sugar/impl/Style';

UnitTest.test('SizeTest', () => {
  const fakeElement = {
    style: {}
  };
  Assert.eq('', false, Style.isSupported(fakeElement as any));
});
