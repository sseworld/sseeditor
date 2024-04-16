import { Assert, UnitTest } from '@ephox/bedrock-client';
import * as Sanitise from 'ssephox/polaris/string/Sanitise';
UnitTest.test('api.Sanitise.css', () => {
    const check = (expected, input) => {
        const actual = Sanitise.css(input);
        Assert.eq('', expected, actual);
    };
    check('e', '');
    check('a', 'a');
    check('abcdefg', 'abcdefg');
    check('e_bogus', '_bogus');
    check('a-big-long-string', 'a big long string');
});
//# sourceMappingURL=SanitiseCssTest.js.map