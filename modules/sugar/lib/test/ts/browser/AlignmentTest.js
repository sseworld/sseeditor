"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bedrock_client_1 = require("@ephox/bedrock-client");
var Insert = require("ssephox/sugar/api/dom/Insert");
var Remove = require("ssephox/sugar/api/dom/Remove");
var SugarBody = require("ssephox/sugar/api/node/SugarBody");
var SugarElement_1 = require("ssephox/sugar/api/node/SugarElement");
var Alignment = require("ssephox/sugar/api/properties/Alignment");
var Attribute = require("ssephox/sugar/api/properties/Attribute");
var Traverse = require("ssephox/sugar/api/search/Traverse");
var EphoxElement_1 = require("ssephox/sugar/test/EphoxElement");
bedrock_client_1.UnitTest.test('AlignmentTest', function () {
    var body = SugarBody.body();
    var createDirectionalP = function (direction) {
        var divEl = (0, EphoxElement_1.default)('div');
        var par = (0, EphoxElement_1.default)('p');
        Attribute.setAll(divEl, { dir: direction });
        Insert.append(body, divEl);
        Insert.append(divEl, par);
        return par;
    };
    var check = function (element, property, value, expected) {
        var res = Alignment.hasAlignment(element, property, value);
        bedrock_client_1.Assert.eq('', expected, res);
        Traverse.parent(element).each(Remove.remove);
    };
    var rtlP = createDirectionalP('rtl');
    check(rtlP, 'text-align', 'left', false);
    var rtlIsRight = createDirectionalP('rtl');
    check(rtlIsRight, 'text-align', 'right', true);
    /* should never be checking alignment on a text node */
    check(SugarElement_1.SugarElement.fromText('Bacon eatsum'), 'text-align', 'left', false);
});
//# sourceMappingURL=AlignmentTest.js.map