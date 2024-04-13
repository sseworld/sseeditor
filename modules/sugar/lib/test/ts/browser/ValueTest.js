"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bedrock_client_1 = require("@ephox/bedrock-client");
var SugarElement_1 = require("ssephox/sugar/api/node/SugarElement");
var Value = require("ssephox/sugar/api/properties/Value");
bedrock_client_1.UnitTest.test('ValueTest', function () {
    var ta = SugarElement_1.SugarElement.fromHtml('<textarea>sometexthere</textarea>');
    bedrock_client_1.Assert.eq('', 'sometexthere', Value.get(ta));
    Value.set(ta, 'one');
    bedrock_client_1.Assert.eq('', 'one', ta.dom.value);
    bedrock_client_1.Assert.eq('', 'one', Value.get(ta));
    var success = false;
    try {
        Value.set(ta, undefined);
        success = true;
    }
    catch (e) {
        // expected
    }
    if (success) {
        bedrock_client_1.Assert.fail('setting undefined did not fail');
    }
});
//# sourceMappingURL=ValueTest.js.map