"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bedrock_client_1 = require("@ephox/bedrock-client");
var Attribute = require("ssephox/sugar/api/properties/Attribute");
var AttributeProperty_1 = require("ssephox/sugar/api/properties/AttributeProperty");
var EphoxElement_1 = require("ssephox/sugar/test/EphoxElement");
bedrock_client_1.UnitTest.test('AttributePropertyTest', function () {
    var attrName = 'custom';
    var attrValue = 'value';
    var init = (0, AttributeProperty_1.AttributeProperty)(attrName, attrValue);
    var rtlEl = (0, EphoxElement_1.default)('div');
    Attribute.set(rtlEl, 'custom', 'rtl');
    var ltrEl = (0, EphoxElement_1.default)('div');
    Attribute.set(ltrEl, 'custom', 'value');
    var link = (0, EphoxElement_1.default)('a');
    Attribute.set(link, 'href', '#');
    bedrock_client_1.Assert.eq('', false, init.is(link));
    bedrock_client_1.Assert.eq('', false, init.is(rtlEl));
    bedrock_client_1.Assert.eq('', true, init.is(ltrEl));
    init.remove(rtlEl);
    bedrock_client_1.Assert.eq('', Attribute.get(rtlEl, 'custom'), undefined);
    init.set(rtlEl);
    bedrock_client_1.Assert.eq('', Attribute.get(rtlEl, 'custom'), 'value');
    init.set(link);
    bedrock_client_1.Assert.eq('', Attribute.get(link, 'custom'), 'value');
    init.remove(link);
    bedrock_client_1.Assert.eq('', Attribute.get(link, 'custom'), undefined);
});
//# sourceMappingURL=AttributePropertyTest.js.map