"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bedrock_client_1 = require("@ephox/bedrock-client");
var katamari_1 = require("@ssephox/katamari");
var NodeTypes = require("ssephox/sugar/api/node/NodeTypes");
var SugarElement_1 = require("ssephox/sugar/api/node/SugarElement");
var SugarNode = require("ssephox/sugar/api/node/SugarNode");
var Traverse = require("ssephox/sugar/api/search/Traverse");
var EphoxElement_1 = require("ssephox/sugar/test/EphoxElement");
bedrock_client_1.UnitTest.test('NodeTest', function () {
    var check = function (node, nodeType, nodeName, nodeValue, isElement, isText, isDocument) {
        bedrock_client_1.Assert.eq('', nodeType, SugarNode.type(node));
        bedrock_client_1.Assert.eq('', nodeName, SugarNode.name(node));
        bedrock_client_1.Assert.eq('', nodeValue, SugarNode.value(node));
        bedrock_client_1.Assert.eq('', isElement, SugarNode.isElement(node));
        bedrock_client_1.Assert.eq('', isText, SugarNode.isText(node));
        bedrock_client_1.Assert.eq('', isDocument, SugarNode.isDocument(node));
    };
    check((0, EphoxElement_1.default)('p'), NodeTypes.ELEMENT, 'p', null, true, false, false);
    check(SugarElement_1.SugarElement.fromDom(document.createTextNode('gobble')), NodeTypes.TEXT, '#text', 'gobble', false, true, false);
    check(SugarElement_1.SugarElement.fromDom(document), NodeTypes.DOCUMENT, '#document', null, false, false, true);
    var checkIs = function (expected, predicate, inputs) {
        var actual = katamari_1.Arr.map(inputs, function (raw) {
            var element = SugarElement_1.SugarElement.fromHtml(raw);
            var input = Traverse.firstChild(element).getOrDie();
            return predicate(input);
        });
        bedrock_client_1.Assert.eq('', expected, actual);
    };
    var data = ['<div>Hello</div>', '<div><span>Hello</span></div>', '<div><!-- I am a comment --></div>'];
    checkIs([true, false, false], SugarNode.isText, data);
    checkIs([false, false, true], SugarNode.isComment, data);
    checkIs([false, true, false], SugarNode.isElement, data);
});
//# sourceMappingURL=NodeTest.js.map