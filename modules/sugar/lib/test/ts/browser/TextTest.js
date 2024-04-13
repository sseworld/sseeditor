"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bedrock_client_1 = require("@ephox/bedrock-client");
var SugarElement_1 = require("ssephox/sugar/api/node/SugarElement");
var SugarNode = require("ssephox/sugar/api/node/SugarNode");
var SugarText = require("ssephox/sugar/api/node/SugarText");
var Traverse = require("ssephox/sugar/api/search/Traverse");
bedrock_client_1.UnitTest.test('TextTest', function () {
    var ensureClobberedTextNodeDoesNotThrow = function () {
        var span = SugarElement_1.SugarElement.fromHtml('<span>hi</span>');
        Traverse.child(span, 0).filter(SugarNode.isText).each(function (text0) {
            span.dom.innerHTML = 'smashed';
            var v = SugarText.get(text0); // Throws in IE10.
            bedrock_client_1.Assert.eq('', 'string', typeof v);
        });
    };
    ensureClobberedTextNodeDoesNotThrow();
    var notText = SugarElement_1.SugarElement.fromTag('span');
    var t = SugarElement_1.SugarElement.fromText('a');
    bedrock_client_1.Assert.eq('', 'a', SugarText.get(t));
    SugarText.set(t, 'blue');
    bedrock_client_1.Assert.eq('', 'blue', t.dom.nodeValue);
    try {
        SugarText.get(notText);
        bedrock_client_1.Assert.fail('get on non-text did not throw');
    }
    catch (e) {
        // pass
    }
    try {
        SugarText.set(notText, 'bogus');
        bedrock_client_1.Assert.fail('set on non-text did not throw');
    }
    catch (e) {
        // pass
    }
});
//# sourceMappingURL=TextTest.js.map