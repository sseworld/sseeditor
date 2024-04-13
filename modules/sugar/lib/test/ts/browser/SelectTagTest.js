"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bedrock_client_1 = require("@ephox/bedrock-client");
var katamari_assertions_1 = require("@ssephox/katamari-assertions");
var SugarElement_1 = require("ssephox/sugar/api/node/SugarElement");
var Select = require("ssephox/sugar/api/tag/SelectTag");
bedrock_client_1.UnitTest.test('SelectTagTest', function () {
    var select = SugarElement_1.SugarElement.fromHtml('<select><option selected="selected" value="myvalue">valx</option><option value="non selected">valy</option></select>');
    var selectVal = Select.getValue(select);
    katamari_assertions_1.KAssert.eqSome('eq', 'myvalue', selectVal);
    var emptySelect = SugarElement_1.SugarElement.fromHtml('<select></select>');
    var emptySelectVal = Select.getValue(emptySelect);
    katamari_assertions_1.KAssert.eqNone('eq', emptySelectVal);
});
//# sourceMappingURL=SelectTagTest.js.map