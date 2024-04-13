"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bedrock_client_1 = require("@ephox/bedrock-client");
var katamari_assertions_1 = require("@ssephox/katamari-assertions");
var InsertAll = require("ssephox/sugar/api/dom/InsertAll");
var SugarElement_1 = require("ssephox/sugar/api/node/SugarElement");
var Checked = require("ssephox/sugar/api/properties/Checked");
var Value = require("ssephox/sugar/api/properties/Value");
bedrock_client_1.UnitTest.test('CheckedTest', function () {
    var container = SugarElement_1.SugarElement.fromTag('div');
    var alpha = SugarElement_1.SugarElement.fromHtml('<input type="radio" value="alpha"></input>');
    var beta = SugarElement_1.SugarElement.fromHtml('<input type="radio" value="beta"></input>');
    var gamma = SugarElement_1.SugarElement.fromHtml('<input type="radio" value="gamma"></input>');
    InsertAll.append(container, [alpha, beta, gamma]);
    katamari_assertions_1.KAssert.eqNone('eq', Checked.find(container));
    bedrock_client_1.Assert.eq('Alpha checked value should be false', false, Checked.get(alpha));
    Checked.set(beta, true);
    bedrock_client_1.Assert.eq('Beta checked value should be true', true, Checked.get(beta));
    katamari_assertions_1.KAssert.eqSome('eq', 'beta', Checked.find(container).map(Value.get));
    Checked.set(alpha, true);
    bedrock_client_1.Assert.eq('Alpha checked value should be true', true, Checked.get(alpha));
    katamari_assertions_1.KAssert.eqSome('eq', 'alpha', Checked.find(container).map(Value.get));
});
//# sourceMappingURL=CheckedTest.js.map