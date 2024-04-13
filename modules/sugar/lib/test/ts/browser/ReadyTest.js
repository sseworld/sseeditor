"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bedrock_client_1 = require("@ephox/bedrock-client");
var Ready = require("ssephox/sugar/api/events/Ready");
bedrock_client_1.UnitTest.test('ReadyTest', function () {
    // This isn't really a test. By definition, tests are run after document load.
    // We can't easily test the actual Ready event, but we can verify it works after document load
    var called = 0;
    Ready.document(function () {
        called++;
    });
    bedrock_client_1.Assert.eq('', 1, called);
});
//# sourceMappingURL=ReadyTest.js.map