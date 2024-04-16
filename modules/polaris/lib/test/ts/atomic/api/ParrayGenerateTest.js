import { Assert, UnitTest } from '@ephox/bedrock-client';
import { Arr, Optional } from '@ssephox/katamari';
import * as PositionArray from 'ssephox/polaris/api/PositionArray';
UnitTest.test('api.PositionArray.generate', () => {
    const generator = (item, start) => {
        const firstletter = item[0];
        if (firstletter === 'a') {
            return Optional.none();
        }
        return Optional.some({
            start,
            finish: start + item.length,
            item
        });
    };
    const check = (expected, input, start) => {
        const result = PositionArray.generate(input, generator, start);
        Assert.eq('', expected, Arr.map(result, (item) => {
            return item.start + '->' + item.finish + '@ ' + item.item;
        }));
    };
    check([
        '0->3@ cat',
        '3->6@ dog',
        '6->11@ mogel',
        '11->11@ ',
        '11->13@ hi'
    ], ['cat', 'dog', 'ab', 'mogel', '', 'hi']);
    check([
        '10->13@ cat',
        '13->16@ dog',
        '16->21@ mogel',
        '21->21@ ',
        '21->23@ hi'
    ], ['cat', 'dog', 'ab', 'mogel', '', 'hi'], 10);
});
//# sourceMappingURL=ParrayGenerateTest.js.map