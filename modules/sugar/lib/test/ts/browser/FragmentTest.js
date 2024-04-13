"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bedrock_client_1 = require("@ephox/bedrock-client");
var Insert = require("ssephox/sugar/api/dom/Insert");
var SugarElement_1 = require("ssephox/sugar/api/node/SugarElement");
var Fragment = require("ssephox/sugar/api/node/SugarFragment");
var Html = require("ssephox/sugar/api/properties/Html");
bedrock_client_1.UnitTest.test('FragmentTest', function () {
    var fragment = Fragment.fromElements([
        SugarElement_1.SugarElement.fromHtml('<span>Hi</span>'),
        SugarElement_1.SugarElement.fromTag('br'),
        SugarElement_1.SugarElement.fromHtml('<p>One</p>')
    ]);
    var container = SugarElement_1.SugarElement.fromTag('div');
    Insert.append(container, fragment);
    bedrock_client_1.Assert.eq('', '<span>Hi</span><br><p>One</p>', Html.get(container));
});
//# sourceMappingURL=FragmentTest.js.map