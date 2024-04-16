import { Assert, UnitTest } from '@ephox/bedrock-client';
import * as PositionArray from 'ssephox/polaris/api/PositionArray';
import * as Parrays from 'ssephox/polaris/test/Parrays';
UnitTest.test('api.PositionArray.translate', () => {
    const check = (expected, input, offset) => {
        const initial = Parrays.make(input);
        const actual = PositionArray.translate(initial, offset);
        Assert.eq('', expected, Parrays.dump(actual));
    };
    check([], [], 0);
    check(['1->4@ cat'], ['cat'], 1);
    check(['0->3@ cat', '3->5@ yo', '5->8@ sup'], ['cat', 'yo', 'sup'], 0);
    check(['3->6@ cat', '6->8@ yo', '8->11@ sup'], ['cat', 'yo', 'sup'], 3);
});
//# sourceMappingURL=ParrayTranslateTest.js.map