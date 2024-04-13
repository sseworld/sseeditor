"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bedrock_client_1 = require("@ephox/bedrock-client");
var dispute_1 = require("@ephox/dispute");
var SugarElement_1 = require("ssephox/sugar/api/node/SugarElement");
var Head = require("ssephox/sugar/api/node/SugarHead");
var WithHelpers_1 = require("ssephox/sugar/test/WithHelpers");
bedrock_client_1.UnitTest.test('head in normal document', function () {
    bedrock_client_1.Assert.eq('head should be head', document.head, Head.getHead(SugarElement_1.SugarElement.fromDom(document)).dom, dispute_1.Testable.tStrict);
    bedrock_client_1.Assert.eq('head should be head', document.head, Head.head().dom, dispute_1.Testable.tStrict);
});
bedrock_client_1.UnitTest.test('head in iframe', function () {
    (0, WithHelpers_1.withIframe)(function (div, iframe, cw) {
        bedrock_client_1.Assert.eq('head should be iframe head', cw.document.head, Head.getHead(SugarElement_1.SugarElement.fromDom(cw.document)).dom, dispute_1.Testable.tStrict);
    });
});
//# sourceMappingURL=HeadTest.js.map