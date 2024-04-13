"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bedrock_client_1 = require("@ephox/bedrock-client");
var katamari_assertions_1 = require("@ssephox/katamari-assertions");
var SugarElement_1 = require("ssephox/sugar/api/node/SugarElement");
var SugarNode = require("ssephox/sugar/api/node/SugarNode");
var NodeValue_1 = require("ssephox/sugar/impl/NodeValue");
bedrock_client_1.UnitTest.test('NodeValue Test', function () {
    var nodeValueThrowsForWrongElement = function () {
        // NodeValue throws for wrong element
        bedrock_client_1.Assert.throws('should have thrown', function () {
            (0, NodeValue_1.NodeValue)(SugarNode.isComment, 'comment').get(SugarElement_1.SugarElement.fromHtml('<span />'));
        });
        bedrock_client_1.Assert.throws('should have thrown', function () {
            (0, NodeValue_1.NodeValue)(SugarNode.isText, 'text').get(SugarElement_1.SugarElement.fromHtml('<div />'));
        });
        bedrock_client_1.Assert.throws('should have thrown', function () {
            var n = SugarElement_1.SugarElement.fromDom(document.createComment('Llamas are bigger than frogs.'));
            (0, NodeValue_1.NodeValue)(SugarNode.isElement, 'tt').get(n);
        });
    };
    var nodeValueIsEmptyForElement = function () {
        var div = SugarElement_1.SugarElement.fromHtml('<div />');
        bedrock_client_1.Assert.eq('eq', '', (0, NodeValue_1.NodeValue)(SugarNode.isElement, 'div').get(div));
        katamari_assertions_1.KAssert.eqNone('eq', (0, NodeValue_1.NodeValue)(SugarNode.isElement, 'div').getOption(div));
    };
    var nodeValueForTextElement = function () {
        var t = 'Llamas. Llamas everywhere.';
        var n = SugarElement_1.SugarElement.fromText(t);
        bedrock_client_1.Assert.eq('eq', t, (0, NodeValue_1.NodeValue)(SugarNode.isText, 'text').get(n));
        katamari_assertions_1.KAssert.eqSome('eq', t, (0, NodeValue_1.NodeValue)(SugarNode.isText, 'text').getOption(n));
    };
    var nodeValueForCommentElement = function () {
        var t = 'arbitrary content';
        var n = SugarElement_1.SugarElement.fromDom(document.createComment(t));
        bedrock_client_1.Assert.eq('eq', t, (0, NodeValue_1.NodeValue)(SugarNode.isComment, 'comment').get(n));
        katamari_assertions_1.KAssert.eqSome('eq', t, (0, NodeValue_1.NodeValue)(SugarNode.isComment, 'comment').getOption(n));
    };
    var setNodeValueForTextElement = function () {
        var n = SugarElement_1.SugarElement.fromText('Llamas. Llamas everywhere.');
        (0, NodeValue_1.NodeValue)(SugarNode.isText, 'text').set(n, 'patronus');
        bedrock_client_1.Assert.eq('eq', 'patronus', (0, NodeValue_1.NodeValue)(SugarNode.isText, 'text').get(n));
    };
    var setNodeValueForCommentElement = function () {
        var n = SugarElement_1.SugarElement.fromDom(document.createComment('arbitrary content'));
        (0, NodeValue_1.NodeValue)(SugarNode.isComment, 'comment').set(n, '&&*#*(@');
        bedrock_client_1.Assert.eq('eq', '&&*#*(@', (0, NodeValue_1.NodeValue)(SugarNode.isComment, 'comment').get(n));
    };
    nodeValueThrowsForWrongElement();
    nodeValueIsEmptyForElement();
    nodeValueForTextElement();
    nodeValueForCommentElement();
    setNodeValueForTextElement();
    setNodeValueForCommentElement();
});
//# sourceMappingURL=NodeValueTest.js.map