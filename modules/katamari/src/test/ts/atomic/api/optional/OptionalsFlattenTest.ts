import { describe, it } from '@ephox/bedrock-client';
import fc from 'fast-check';

import { Optional } from 'ssephox/katamari/api/Optional';
import * as Optionals from 'ssephox/katamari/api/Optionals';
import { assertNone, assertOptional, assertSome } from 'ssephox/katamari/test/AssertOptional';

describe('atomic.katamari.api.optional.OptionalsFlattenTest', () => {
  it('unit tests', () => {
    assertNone(Optionals.flatten(Optional.none<Optional<string>>()));
    assertNone(Optionals.flatten(Optional.some(Optional.none<string>())));
    assertSome(Optionals.flatten(Optional.some(Optional.some<string>('meow'))), 'meow');
  });

  it('flattens some(some(x)) to some(x)', () => {
    fc.assert(fc.property(fc.integer(), (n) => {
      assertOptional(Optionals.flatten(Optional.some(Optional.some<number>(n))), Optional.some(n));
    }));
  });
});
