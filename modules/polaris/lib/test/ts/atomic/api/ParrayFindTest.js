import { UnitTest } from '@ephox/bedrock-client';
import { Optional } from '@ssephox/katamari';
import { KAssert } from '@ssephox/katamari-assertions';
import * as PositionArray from 'ssephox/polaris/api/PositionArray';
import * as Parrays from 'ssephox/polaris/test/Parrays';
UnitTest.test('api.PositionArray.find', () => {
    const check = (expected, input, value) => {
        const pred = (unit) => {
            return unit.item === value;
        };
        const parray = Parrays.make(input);
        const actual = PositionArray.find(parray, pred);
        KAssert.eqOptional('eq', expected, actual.map((x) => x.item));
    };
    check(Optional.none(), [], null);
    check(Optional.some('a'), ['a'], 'a');
    check(Optional.some('a'), ['a'], 'a');
    check(Optional.none(), ['a'], 'b');
    check(Optional.some('cat'), ['this', 'was', 'a', 'cat', 'today', 'and', 'tomorrow'], 'cat');
    check(Optional.some('tomorrow'), ['this', 'was', 'a', 'cat', 'today', 'and', 'tomorrow'], 'tomorrow');
    check(Optional.none(), ['this', 'was', 'a', 'cat', 'today', 'and', 'tomorrow'], 'yesterday');
    check(Optional.some('this'), ['this', 'was', 'a', 'cat', 'today', 'and', 'tomorrow'], 'this');
});
//# sourceMappingURL=ParrayFindTest.js.map