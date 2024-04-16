import { Assert, UnitTest } from '@ephox/bedrock-client';

import { Gene } from 'ssephox/boss/api/Gene';
import * as Creator from 'ssephox/boss/mutant/Creator';

UnitTest.test('CreatorTest', () => {
  Assert.eq('', Gene('clone**<c>', 'cat', []), Creator.clone(Gene('c', 'cat', [ Gene('kitten', 'kitten') ])));
});
