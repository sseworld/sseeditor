"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bedrock_client_1 = require("@ephox/bedrock-client");
var SugarElement_1 = require("ssephox/sugar/api/node/SugarElement");
var OnNode = require("ssephox/sugar/api/properties/OnNode");
bedrock_client_1.UnitTest.test('OnNodeTest', function () {
    var element = SugarElement_1.SugarElement.fromTag('div');
    var addAlpha = OnNode.addClass('alpha');
    var addBeta = OnNode.addClass('beta');
    var removeAll = OnNode.removeClasses(['alpha', 'beta']);
    var removeAlpha = OnNode.removeClass('alpha');
    var hasAlpha = OnNode.hasClass('alpha');
    var hasBeta = OnNode.hasClass('beta');
    bedrock_client_1.Assert.eq('', false, hasAlpha(element));
    addAlpha(element);
    bedrock_client_1.Assert.eq('', true, hasAlpha(element));
    bedrock_client_1.Assert.eq('', false, hasBeta(element));
    removeAlpha(element);
    bedrock_client_1.Assert.eq('', false, hasAlpha(element));
    addAlpha(element);
    bedrock_client_1.Assert.eq('', true, hasAlpha(element));
    addBeta(element);
    bedrock_client_1.Assert.eq('', true, hasBeta(element));
    removeAll(element);
    bedrock_client_1.Assert.eq('', false, hasAlpha(element));
    bedrock_client_1.Assert.eq('', false, hasBeta(element));
});
//# sourceMappingURL=OnNodeTest.js.map