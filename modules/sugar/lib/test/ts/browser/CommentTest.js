import { Assert, UnitTest } from '@ephox/bedrock-client';
import * as SugarComment from 'ssephox/sugar/api/node/SugarComment';
import { SugarElement } from 'ssephox/sugar/api/node/SugarElement';
import * as SugarNode from 'ssephox/sugar/api/node/SugarNode';
import * as Traverse from 'ssephox/sugar/api/search/Traverse';
UnitTest.test('CommentTest', () => {
    const ensureClobberedTextNodeDoesNotThrow = () => {
        const span = SugarElement.fromHtml('<span><!--a--></span>');
        Traverse.child(span, 0).filter(SugarNode.isComment).each((text0) => {
            span.dom.innerHTML = 'smashed';
            const v = SugarComment.get(text0); // Throws in IE10.
            Assert.eq('', 'string', typeof v);
        });
    };
    ensureClobberedTextNodeDoesNotThrow();
    const notComment = SugarElement.fromTag('span');
    const c = SugarElement.fromHtml('<!--a-->');
    Assert.eq('', 'a', SugarComment.get(c));
    SugarComment.set(c, 'blue');
    Assert.eq('', 'blue', c.dom.nodeValue);
    try {
        SugarComment.get(notComment);
        Assert.fail('get on non-comment did not throw');
    }
    catch (e) {
        // pass
    }
    try {
        SugarComment.set(notComment, 'bogus');
        Assert.fail('set on non-comment did not throw');
    }
    catch (e) {
        // pass
    }
});
//# sourceMappingURL=CommentTest.js.map