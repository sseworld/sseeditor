import { UnitTest } from '@ephox/bedrock-client';
import { assert } from 'chai';
import * as fc from 'fast-check';
import { Rect } from 'ssephox/sugar/api/selection/Rect';
UnitTest.test('Rect', () => {
    fc.assert(fc.property(fc.float(), fc.float(), fc.float(), fc.float(), fc.float(), fc.float(), (left, right, top, bottom, width, height) => assert.deepEqual({
        left,
        top,
        right,
        bottom,
        width,
        height
    }, Rect.toRaw({
        left: () => left,
        top: () => top,
        right: () => right,
        bottom: () => bottom,
        width: () => width,
        height: () => height
    }))));
});
//# sourceMappingURL=RectTest.js.map