"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bedrock_client_1 = require("@ephox/bedrock-client");
var chai_1 = require("chai");
var SandHTMLElement = require("ssephox/sand/api/SandHTMLElement");
(0, bedrock_client_1.describe)('HtmlElementTest', function () {
    (0, bedrock_client_1.context)('isPrototypeOf', function () {
        (0, bedrock_client_1.it)('non elements should be false', function () {
            chai_1.assert.isFalse(SandHTMLElement.isPrototypeOf(null));
            chai_1.assert.isFalse(SandHTMLElement.isPrototypeOf(undefined));
            chai_1.assert.isFalse(SandHTMLElement.isPrototypeOf('a string'));
            chai_1.assert.isFalse(SandHTMLElement.isPrototypeOf({}));
        });
        (0, bedrock_client_1.it)('nodes should be false', function () {
            var text = document.createTextNode('text');
            var comment = document.createComment('comment');
            var frag = document.createDocumentFragment();
            chai_1.assert.isFalse(SandHTMLElement.isPrototypeOf(text));
            chai_1.assert.isFalse(SandHTMLElement.isPrototypeOf(comment));
            chai_1.assert.isFalse(SandHTMLElement.isPrototypeOf(frag));
        });
        (0, bedrock_client_1.it)('SVG elements should be false', function () {
            var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            chai_1.assert.isFalse(SandHTMLElement.isPrototypeOf(svg));
        });
        (0, bedrock_client_1.it)('same window elements should be true', function () {
            var div = document.createElement('div');
            var a = document.createElement('a');
            chai_1.assert.isTrue(SandHTMLElement.isPrototypeOf(div));
            chai_1.assert.isTrue(SandHTMLElement.isPrototypeOf(a));
        });
        (0, bedrock_client_1.it)('TINY-7374: different window elements should be true', function () {
            var span = document.createElement('span'); // HTMLSpanElement
            var a = document.createElement('a'); // HTMLAnchorElement
            var strong = document.createElement('strong'); // HTMLElement
            var iframe = document.createElement('iframe');
            document.body.appendChild(iframe);
            var iframeDoc = iframe.contentDocument;
            if (iframeDoc === null) {
                chai_1.assert.fail('Iframe document is not available');
                return;
            }
            iframeDoc.open();
            iframeDoc.write('<html><body></body></html>');
            iframeDoc.close();
            iframeDoc.body.appendChild(span);
            iframeDoc.body.appendChild(a);
            iframeDoc.body.appendChild(strong);
            chai_1.assert.isTrue(SandHTMLElement.isPrototypeOf(span));
            chai_1.assert.isTrue(SandHTMLElement.isPrototypeOf(a));
            chai_1.assert.isTrue(SandHTMLElement.isPrototypeOf(strong));
            document.body.removeChild(iframe);
        });
    });
});
//# sourceMappingURL=HtmlElementTest.js.map