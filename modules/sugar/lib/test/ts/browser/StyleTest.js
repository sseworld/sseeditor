"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bedrock_client_1 = require("@ephox/bedrock-client");
var Style = require("ssephox/sugar/impl/Style");
bedrock_client_1.UnitTest.test('SizeTest', function () {
    var fakeElement = {
        style: {}
    };
    bedrock_client_1.Assert.eq('', false, Style.isSupported(fakeElement));
});
//# sourceMappingURL=StyleTest.js.map