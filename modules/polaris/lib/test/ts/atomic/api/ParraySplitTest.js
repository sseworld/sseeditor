import { Assert, UnitTest } from '@ephox/bedrock-client';
import * as PositionArray from 'ssephox/polaris/api/PositionArray';
import * as Strings from 'ssephox/polaris/api/Strings';
import * as Parrays from 'ssephox/polaris/test/Parrays';
UnitTest.test('api.PositionArray.splits', () => {
    const subdivide = (unit, positions) => {
        const tokens = Strings.splits(unit.item, positions);
        return Parrays.make(tokens);
    };
    const check = (expected, input, positions) => {
        const parray = Parrays.make(input);
        const actual = PositionArray.splits(parray, positions, subdivide);
        Assert.eq('', expected, Parrays.dump(actual));
    };
    check([], [], []);
    check(['0->2@ ha'], ['ha'], []);
    check(['0->5@ hallo', '5->14@ hallobalo'], ['hallo', 'hallobalo'], []);
    check([
        '0->1@ h',
        '1->2@ a',
        '2->3@ l',
        '3->5@ lo',
        '5->6@ h',
        '6->9@ all',
        '9->11@ ob',
        '11->13@ al',
        '13->14@ o'
    ], ['hallo', 'hallobalo'], [1, 2, 3, 6, 9, 11, 13]);
});
//# sourceMappingURL=ParraySplitTest.js.map