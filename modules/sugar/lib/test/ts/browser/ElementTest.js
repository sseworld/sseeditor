import { Assert, UnitTest } from '@ephox/bedrock-client';
import { SugarElement } from 'ssephox/sugar/api/node/SugarElement';
UnitTest.test('ElementTest', () => {
    const checkErr = (f, node) => {
        try {
            f(node);
        }
        catch (e) {
            // expected
            return;
        }
        Assert.fail('function did not throw an error');
    };
    const checkEl = (f, el, expt) => {
        const element = f(el);
        Assert.eq('', true, expt === element.dom);
    };
    checkErr(SugarElement.fromDom, undefined);
    checkErr(SugarElement.fromDom, null);
    checkEl(SugarElement.fromDom, document.body, document.body);
});
//# sourceMappingURL=ElementTest.js.map