"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bedrock_client_1 = require("@ephox/bedrock-client");
var Insert = require("ssephox/sugar/api/dom/Insert");
var Remove = require("ssephox/sugar/api/dom/Remove");
var SugarBody = require("ssephox/sugar/api/node/SugarBody");
var SugarElement_1 = require("ssephox/sugar/api/node/SugarElement");
var SugarShadowDom = require("ssephox/sugar/api/node/SugarShadowDom");
var SelectorFind = require("ssephox/sugar/api/search/SelectorFind");
var WithHelpers_1 = require("ssephox/sugar/test/WithHelpers");
bedrock_client_1.UnitTest.test('Body.inBody - detached elements and their descendents', function () {
    var div = SugarElement_1.SugarElement.fromTag('div');
    var child = SugarElement_1.SugarElement.fromTag('span');
    var text = SugarElement_1.SugarElement.fromText('hi');
    Insert.append(child, text);
    Insert.append(div, child);
    bedrock_client_1.Assert.eq('should not be in body', false, SugarBody.inBody(div));
    bedrock_client_1.Assert.eq('should not be in body', false, SugarBody.inBody(child));
    bedrock_client_1.Assert.eq('should not be in body', false, SugarBody.inBody(text));
});
bedrock_client_1.UnitTest.test('Body.inBody - elements in body', function () {
    var body = SelectorFind.first('body').getOrDie();
    var div = SugarElement_1.SugarElement.fromTag('div');
    var child = SugarElement_1.SugarElement.fromTag('span');
    var text = SugarElement_1.SugarElement.fromText('hi');
    Insert.append(child, text);
    Insert.append(div, child);
    Insert.append(body, div);
    bedrock_client_1.Assert.eq('should be in body', true, SugarBody.inBody(div));
    bedrock_client_1.Assert.eq('should be in body', true, SugarBody.inBody(child));
    bedrock_client_1.Assert.eq('should be in body', true, SugarBody.inBody(text));
    bedrock_client_1.Assert.eq('should be in body', true, SugarBody.inBody(body));
    Remove.remove(div);
});
if (SugarShadowDom.isSupported()) {
    bedrock_client_1.UnitTest.test('Body.inBody - shadow root', function () {
        (0, WithHelpers_1.withShadowElement)(function (sr) {
            bedrock_client_1.Assert.eq('should be inBody', true, SugarBody.inBody(sr));
        });
    });
    bedrock_client_1.UnitTest.test('Body.inBody - element in shadow root', function () {
        (0, WithHelpers_1.withShadowElement)(function (sr) {
            bedrock_client_1.Assert.eq('should be inBody', true, SugarBody.inBody(sr));
        });
    });
    bedrock_client_1.UnitTest.test('Body.inBody - element in nested shadow root', function () {
        var div1 = document.createElement('div');
        document.body.appendChild(div1);
        var sr1 = div1.attachShadow({ mode: 'open' });
        var div2 = document.createElement('div');
        sr1.appendChild(div2);
        var sr2 = div2.attachShadow({ mode: 'open' });
        var div3 = document.createElement('div');
        sr2.appendChild(div3);
        var div4 = document.createElement('div');
        div3.appendChild(div4);
        bedrock_client_1.Assert.eq('div1 should be inBody', true, SugarBody.inBody(SugarElement_1.SugarElement.fromDom(div1)));
        bedrock_client_1.Assert.eq('div2 should be inBody', true, SugarBody.inBody(SugarElement_1.SugarElement.fromDom(div2)));
        bedrock_client_1.Assert.eq('div3 should be inBody', true, SugarBody.inBody(SugarElement_1.SugarElement.fromDom(div3)));
        bedrock_client_1.Assert.eq('div4 should be inBody', true, SugarBody.inBody(SugarElement_1.SugarElement.fromDom(div4)));
        bedrock_client_1.Assert.eq('sr1 should be inBody', true, SugarBody.inBody(SugarElement_1.SugarElement.fromDom(sr1)));
        bedrock_client_1.Assert.eq('sr2 should be inBody', true, SugarBody.inBody(SugarElement_1.SugarElement.fromDom(sr2)));
        document.body.removeChild(div1);
    });
}
//# sourceMappingURL=BodyTest.js.map