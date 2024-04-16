import { UnitTest } from '@ephox/bedrock-client';
import { Optional } from '@ssephox/katamari';
import { KAssert } from '@ssephox/katamari-assertions';

import { Gene } from 'ssephox/boss/api/Gene';
import * as Creator from 'ssephox/boss/mutant/Creator';
import * as Locator from 'ssephox/boss/mutant/Locator';
import * as Tracks from 'ssephox/boss/mutant/Tracks';

UnitTest.test('LocatorTest', () => {
  const family = Tracks.track(
    Gene('A', '.', [
      Gene('B', '.'),
      Gene('C', '.', [
        Gene('D', '.', [
          Gene('E', '.')
        ]),
        Gene('F', '.'),
        Creator.text('cattle')
      ])
    ]), Optional.none());

  const getId = (x: Gene) => x.id;

  KAssert.eqSome('locate D', 'D', Locator.byId(family, 'D').map(getId));
  KAssert.eqSome('locate A', 'A', Locator.byId(family, 'A').map(getId));
  KAssert.eqNone('cattle .', Locator.byItem(family, Gene('?_cattle', '.')));
  KAssert.eqSome('cattle', '?_cattle', Locator.byId(family, '?_cattle').bind((x) => Locator.byItem(family, x)).map(getId));
  KAssert.eqNone('locate Z', Locator.byId(family, 'Z'));
});
