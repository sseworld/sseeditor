"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bedrock_client_1 = require("@ephox/bedrock-client");
var Compare = require("ssephox/sugar/api/dom/Compare");
var Link = require("ssephox/sugar/api/dom/Link");
var SugarElement_1 = require("ssephox/sugar/api/node/SugarElement");
bedrock_client_1.UnitTest.test('LinkTest', function () {
    var realDoc = SugarElement_1.SugarElement.fromDom(document);
    var headNodes = document.head.children.length;
    var firstLink = Link.addStylesheet('fake://url1/');
    var secondLink = Link.addStylesheet('fake://url2/', realDoc);
    var assertStylesheetLink = function (raw, url) {
        bedrock_client_1.Assert.eq('', url, raw.href);
        bedrock_client_1.Assert.eq('', 'stylesheet', raw.rel);
        bedrock_client_1.Assert.eq('', 'text/css', raw.type);
    };
    bedrock_client_1.Assert.eq('', 2, document.head.children.length - headNodes);
    // counting headNodes as "zero"
    var url1 = document.head.children[headNodes];
    var url2 = document.head.children[headNodes + 1];
    bedrock_client_1.Assert.eq('first link element was not equal', true, Compare.eq(firstLink, SugarElement_1.SugarElement.fromDom(url1)));
    bedrock_client_1.Assert.eq('second link element was not equal', true, Compare.eq(secondLink, SugarElement_1.SugarElement.fromDom(url2)));
    assertStylesheetLink(url1, 'fake://url1/');
    assertStylesheetLink(url2, 'fake://url2/');
    document.head.removeChild(url1);
    document.head.removeChild(url2);
});
//# sourceMappingURL=LinkTest.js.map