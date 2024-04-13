"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bedrock_client_1 = require("@ephox/bedrock-client");
var SugarElement_1 = require("ssephox/sugar/api/node/SugarElement");
var SugarText = require("ssephox/sugar/api/node/SugarText");
var TextContent = require("ssephox/sugar/api/properties/TextContent");
bedrock_client_1.UnitTest.test('TextContentTest', function () {
    var element = SugarElement_1.SugarElement.fromHtml('<p>Hello <strong>World!</strong></p>');
    bedrock_client_1.Assert.eq('', 'Hello World!', TextContent.get(element));
    TextContent.set(element, 'My text value');
    bedrock_client_1.Assert.eq('', 'My text value', TextContent.get(element));
    var textnode = SugarElement_1.SugarElement.fromText('This is just text');
    bedrock_client_1.Assert.eq('', 'This is just text', TextContent.get(textnode));
    TextContent.set(textnode, 'new text value');
    bedrock_client_1.Assert.eq('', 'new text value', TextContent.get(textnode));
    bedrock_client_1.Assert.eq('', 'new text value', SugarText.get(textnode));
    var comment = SugarElement_1.SugarElement.fromDom(document.createComment('commenting checking'));
    bedrock_client_1.Assert.eq('', 'commenting checking', TextContent.get(comment));
    TextContent.set(comment, 'new comment value');
    bedrock_client_1.Assert.eq('', 'new comment value', TextContent.get(comment));
});
//# sourceMappingURL=TextContentTest.js.map