import { Assert, UnitTest } from '@ephox/bedrock-client';
import { SugarElement } from 'ssephox/sugar/api/node/SugarElement';
import * as SugarNode from 'ssephox/sugar/api/node/SugarNode';
import * as SugarText from 'ssephox/sugar/api/node/SugarText';
import * as Traverse from 'ssephox/sugar/api/search/Traverse';
UnitTest.test('TextTest', () => {
    const ensureClobberedTextNodeDoesNotThrow = () => {
        const span = SugarElement.fromHtml('<span>hi</span>');
        Traverse.child(span, 0).filter(SugarNode.isText).each((text0) => {
            span.dom.innerHTML = 'smashed';
            const v = SugarText.get(text0); // Throws in IE10.
            Assert.eq('', 'string', typeof v);
        });
    };
    ensureClobberedTextNodeDoesNotThrow();
    const notText = SugarElement.fromTag('span');
    const t = SugarElement.fromText('a');
    Assert.eq('', 'a', SugarText.get(t));
    SugarText.set(t, 'blue');
    Assert.eq('', 'blue', t.dom.nodeValue);
    try {
        SugarText.get(notText);
        Assert.fail('get on non-text did not throw');
    }
    catch (e) {
        // pass
    }
    try {
        SugarText.set(notText, 'bogus');
        Assert.fail('set on non-text did not throw');
    }
    catch (e) {
        // pass
    }
});
//# sourceMappingURL=TextTest.js.map