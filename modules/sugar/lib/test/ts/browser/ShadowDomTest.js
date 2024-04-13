"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bedrock_client_1 = require("@ephox/bedrock-client");
var dispute_1 = require("@ephox/dispute");
var katamari_1 = require("@ssephox/katamari");
var fast_check_1 = require("fast-check");
var Insert = require("ssephox/sugar/api/dom/Insert");
var Remove = require("ssephox/sugar/api/dom/Remove");
var DomEvent = require("ssephox/sugar/api/events/DomEvent");
var SugarBody = require("ssephox/sugar/api/node/SugarBody");
var SugarDocument = require("ssephox/sugar/api/node/SugarDocument");
var SugarElement_1 = require("ssephox/sugar/api/node/SugarElement");
var SugarElementInstances_1 = require("ssephox/sugar/api/node/SugarElementInstances");
var SugarHead = require("ssephox/sugar/api/node/SugarHead");
var SugarNode = require("ssephox/sugar/api/node/SugarNode");
var SugarShadowDom = require("ssephox/sugar/api/node/SugarShadowDom");
var Attribute = require("ssephox/sugar/api/properties/Attribute");
var SelectorFind = require("ssephox/sugar/api/search/SelectorFind");
var Arbitrary_1 = require("ssephox/sugar/test/Arbitrary");
var WithHelpers_1 = require("ssephox/sugar/test/WithHelpers");
bedrock_client_1.UnitTest.test('ShadowDom - SelectorFind.descendant', function () {
    if (SugarShadowDom.isSupported()) {
        fast_check_1.default.assert(fast_check_1.default.property((0, Arbitrary_1.htmlBlockTagName)(), (0, Arbitrary_1.htmlInlineTagName)(), fast_check_1.default.hexaString(), function (block, inline, text) {
            (0, WithHelpers_1.withShadowElement)(function (ss) {
                var id = 'theid';
                var inner = SugarElement_1.SugarElement.fromHtml("<".concat(block, "><p>hello<").concat(inline, " id=\"").concat(id, "\">").concat(text, "</").concat(inline, "></p></").concat(block, ">"));
                Insert.append(ss, inner);
                var frog = SelectorFind.descendant(ss, "#".concat(id)).getOrDie('Element not found');
                bedrock_client_1.Assert.eq('textcontent', text, frog.dom.textContent);
            });
        }));
    }
});
var shouldBeShadowRoot = function (n) {
    bedrock_client_1.Assert.eq('should be shadow root', true, SugarShadowDom.isShadowRoot(n));
    bedrock_client_1.Assert.eq('should not be document', false, SugarNode.isDocument(n));
};
var shouldBeDocument = function (n) {
    bedrock_client_1.Assert.eq('should not be shadow root', false, SugarShadowDom.isShadowRoot(n));
    bedrock_client_1.Assert.eq('should be document', true, SugarNode.isDocument(n));
};
bedrock_client_1.UnitTest.test('getRootNode === document on normal element in dom', function () {
    (0, WithHelpers_1.withNormalElement)(function (div) {
        bedrock_client_1.Assert.eq('should be document', SugarDocument.getDocument(), SugarShadowDom.getRootNode(div), (0, SugarElementInstances_1.tElement)());
    });
});
bedrock_client_1.UnitTest.test('getRootNode(document) === document on normal element in dom', function () {
    (0, WithHelpers_1.withNormalElement)(function () {
        bedrock_client_1.Assert.eq('should be document', SugarDocument.getDocument(), SugarShadowDom.getRootNode(SugarDocument.getDocument()), (0, SugarElementInstances_1.tElement)());
    });
});
bedrock_client_1.UnitTest.test('isDocument(getRootNode) === true on normal element in dom', function () {
    (0, WithHelpers_1.withNormalElement)(function (div) {
        shouldBeDocument(SugarShadowDom.getRootNode(div));
    });
});
bedrock_client_1.UnitTest.test('document is document', function () {
    shouldBeDocument(SugarDocument.getDocument());
});
bedrock_client_1.UnitTest.test('getRootNode === shadowroot on element in shadow root', function () {
    (0, WithHelpers_1.withShadowElement)(function (sr, innerDiv) {
        bedrock_client_1.Assert.eq('should be shadowroot', sr, SugarShadowDom.getRootNode(innerDiv), (0, SugarElementInstances_1.tElement)());
    });
});
bedrock_client_1.UnitTest.test('getRootNode(shadowroot) === shadowroot', function () {
    (0, WithHelpers_1.withShadowElement)(function (sr) {
        bedrock_client_1.Assert.eq('should be shadowroot', sr, sr, (0, SugarElementInstances_1.tElement)());
    });
});
bedrock_client_1.UnitTest.test('shadow root is shadow root', function () {
    (0, WithHelpers_1.withShadowElement)(function (sr, innerDiv) {
        shouldBeShadowRoot(SugarShadowDom.getRootNode(innerDiv));
        shouldBeShadowRoot(sr);
    });
});
bedrock_client_1.UnitTest.test('getRootNode in iframe', function () {
    (0, WithHelpers_1.withIframe)(function (div, iframe, cw) {
        bedrock_client_1.Assert.eq('should be inner doc', cw.document, SugarShadowDom.getRootNode(div).dom, dispute_1.Testable.tStrict);
    });
});
bedrock_client_1.UnitTest.test('isDocument in iframe', function () {
    (0, WithHelpers_1.withIframe)(function (div, iframe, cw) {
        shouldBeDocument(SugarElement_1.SugarElement.fromDom(cw.document));
    });
});
bedrock_client_1.UnitTest.test('isSupported platform test', function () {
    // as of TinyMCE 6 all browsers support it
    bedrock_client_1.Assert.eq('This browser should support root node', true, SugarShadowDom.isSupported());
});
bedrock_client_1.UnitTest.test('stylecontainer is shadow root for shadow root', function () {
    (0, WithHelpers_1.withShadowElement)(function (sr) {
        bedrock_client_1.Assert.eq('Should be shadow root', sr, SugarShadowDom.getStyleContainer(sr), (0, SugarElementInstances_1.tElement)());
    });
});
bedrock_client_1.UnitTest.test('stylecontainer is head for document', function () {
    bedrock_client_1.Assert.eq('Should be head', SugarHead.getHead(SugarDocument.getDocument()), SugarShadowDom.getStyleContainer(SugarDocument.getDocument()), (0, SugarElementInstances_1.tElement)());
});
bedrock_client_1.UnitTest.test('contentcontainer is shadow root for shadow root', function () {
    (0, WithHelpers_1.withShadowElement)(function (sr) {
        bedrock_client_1.Assert.eq('Should be shadow root', sr, SugarShadowDom.getContentContainer(sr), (0, SugarElementInstances_1.tElement)());
    });
});
bedrock_client_1.UnitTest.test('contentcontainer is body for document', function () {
    bedrock_client_1.Assert.eq('Should be head', SugarBody.getBody(SugarDocument.getDocument()), SugarShadowDom.getContentContainer(SugarDocument.getDocument()), (0, SugarElementInstances_1.tElement)());
});
bedrock_client_1.UnitTest.test('getShadowHost', function () {
    (0, WithHelpers_1.withShadowElement)(function (sr, inner, sh) {
        bedrock_client_1.Assert.eq('Should be shadow host', sh, SugarShadowDom.getShadowHost(sr), (0, SugarElementInstances_1.tElement)());
    });
});
bedrock_client_1.UnitTest.test('isOpenShadowRoot / isClosedShadowRoot', function () {
    (0, WithHelpers_1.withShadowElementInMode)('open', function (sr) {
        bedrock_client_1.Assert.eq('open shadow root is open', true, SugarShadowDom.isOpenShadowRoot(sr));
        bedrock_client_1.Assert.eq('open shadow root is not closed', false, SugarShadowDom.isClosedShadowRoot(sr));
    });
    (0, WithHelpers_1.withShadowElementInMode)('closed', function (sr) {
        bedrock_client_1.Assert.eq('closed shadow root is not open', false, SugarShadowDom.isOpenShadowRoot(sr));
        bedrock_client_1.Assert.eq('closed shadow root is closed', true, SugarShadowDom.isClosedShadowRoot(sr));
    });
});
var checkOriginalEventTarget = function (mode, success, failure) {
    var _a = (0, WithHelpers_1.setupShadowRoot)(mode), innerDiv = _a.innerDiv, shadowHost = _a.shadowHost;
    var input = function (desc, parent) {
        var i = SugarElement_1.SugarElement.fromTag('input');
        Attribute.setAll(i, { 'type': 'text', 'data-description': desc });
        Insert.append(parent, i);
        return i;
    };
    var i1 = input('i2', SugarBody.body());
    var i2 = input('i2', innerDiv);
    i1.dom.click();
    var unbinder = DomEvent.bind(SugarBody.body(), 'click', function (evt) {
        try {
            var expected = mode === 'open' ? i2 : shadowHost;
            bedrock_client_1.Assert.eq('Check event target', expected, evt.target, (0, SugarElementInstances_1.tElement)());
            unbinder.unbind();
            Remove.remove(i1);
            Remove.remove(shadowHost);
            success();
        }
        catch (e) {
            failure(e);
        }
    });
    i2.dom.click();
};
bedrock_client_1.UnitTest.asynctest('getOriginalEventTarget on a closed shadow root', function (success, failure) {
    if (!SugarShadowDom.isSupported()) {
        return success();
    }
    checkOriginalEventTarget('closed', success, failure);
});
bedrock_client_1.UnitTest.asynctest('getOriginalEventTarget on an open shadow root', function (success, failure) {
    if (!SugarShadowDom.isSupported()) {
        return success();
    }
    checkOriginalEventTarget('open', success, failure);
});
bedrock_client_1.UnitTest.test('isOpenShadowHost on open shadow host', function () {
    (0, WithHelpers_1.withShadowElementInMode)('open', function (shadowRoot, innerDiv, shadowHost) { return function () {
        bedrock_client_1.Assert.eq('The open shadow host is an open shadow host', true, SugarShadowDom.isOpenShadowHost(shadowHost));
        bedrock_client_1.Assert.eq('The innerDiv is not an open shadow host', false, SugarShadowDom.isOpenShadowHost(innerDiv));
    }; });
});
bedrock_client_1.UnitTest.test('isOpenShadowHost on closed shadow host', function () {
    (0, WithHelpers_1.withShadowElementInMode)('closed', function (shadowRoot, innerDiv, shadowHost) { return function () {
        bedrock_client_1.Assert.eq('The closed shadow host is an open shadow host', false, SugarShadowDom.isOpenShadowHost(shadowHost));
        bedrock_client_1.Assert.eq('The innerDiv is not an open shadow host', false, SugarShadowDom.isOpenShadowHost(innerDiv));
    }; });
});
if (SugarShadowDom.isSupported()) {
    bedrock_client_1.UnitTest.test('withShadowElement gives us open and closed roots', function () {
        var roots = [];
        (0, WithHelpers_1.withShadowElement)(function (sr) {
            roots.push(sr);
        });
        bedrock_client_1.Assert.eq('open then closed', ['open', 'closed'], katamari_1.Arr.map(roots, function (r) { return r.dom.mode; }));
    });
}
//# sourceMappingURL=ShadowDomTest.js.map