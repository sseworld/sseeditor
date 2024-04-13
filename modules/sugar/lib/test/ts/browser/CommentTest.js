"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bedrock_client_1 = require("@ephox/bedrock-client");
var SugarComment = require("ssephox/sugar/api/node/SugarComment");
var SugarElement_1 = require("ssephox/sugar/api/node/SugarElement");
var SugarNode = require("ssephox/sugar/api/node/SugarNode");
var Traverse = require("ssephox/sugar/api/search/Traverse");
bedrock_client_1.UnitTest.test('CommentTest', function () {
    var ensureClobberedTextNodeDoesNotThrow = function () {
        var span = SugarElement_1.SugarElement.fromHtml('<span><!--a--></span>');
        Traverse.child(span, 0).filter(SugarNode.isComment).each(function (text0) {
            span.dom.innerHTML = 'smashed';
            var v = SugarComment.get(text0); // Throws in IE10.
            bedrock_client_1.Assert.eq('', 'string', typeof v);
        });
    };
    ensureClobberedTextNodeDoesNotThrow();
    var notComment = SugarElement_1.SugarElement.fromTag('span');
    var c = SugarElement_1.SugarElement.fromHtml('<!--a-->');
    bedrock_client_1.Assert.eq('', 'a', SugarComment.get(c));
    SugarComment.set(c, 'blue');
    bedrock_client_1.Assert.eq('', 'blue', c.dom.nodeValue);
    try {
        SugarComment.get(notComment);
        bedrock_client_1.Assert.fail('get on non-comment did not throw');
    }
    catch (e) {
        // pass
    }
    try {
        SugarComment.set(notComment, 'bogus');
        bedrock_client_1.Assert.fail('set on non-comment did not throw');
    }
    catch (e) {
        // pass
    }
});
//# sourceMappingURL=CommentTest.js.map