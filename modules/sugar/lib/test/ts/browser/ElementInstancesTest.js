"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bedrock_client_1 = require("@ephox/bedrock-client");
var katamari_1 = require("@ssephox/katamari");
var SugarElement_1 = require("ssephox/sugar/api/node/SugarElement");
var SugarElementInstances_1 = require("ssephox/sugar/api/node/SugarElementInstances");
var tOptional = katamari_1.OptionalInstances.tOptional;
bedrock_client_1.UnitTest.test('SugarElement testable/eq', function () {
    var span1 = SugarElement_1.SugarElement.fromTag('span');
    bedrock_client_1.Assert.eq('span === span', span1, span1, (0, SugarElementInstances_1.tElement)());
    var span2 = SugarElement_1.SugarElement.fromDom(span1.dom);
    bedrock_client_1.Assert.eq('spans should be equal when they refer to the same underlying element', span1, span2, (0, SugarElementInstances_1.tElement)());
    var span3 = SugarElement_1.SugarElement.fromTag('span');
    bedrock_client_1.Assert.eq('different spans should be inequal', false, (0, SugarElementInstances_1.tElement)().eq(span1, span3));
    bedrock_client_1.Assert.eq('different spans should be inequal', false, (0, SugarElementInstances_1.eqElement)().eq(span1, span3));
});
bedrock_client_1.UnitTest.test('TINY-6151: SugarElement testable/eq - options', function () {
    var el1 = katamari_1.Optional.some(SugarElement_1.SugarElement.fromTag('div'));
    // Before TINY-6151, tElement was a value - a Testable<DomElement> - and statements like below wouldn't compile.
    // We changed it to be a polymorphic function.
    bedrock_client_1.Assert.eq('same', el1, el1, tOptional((0, SugarElementInstances_1.tElement)()));
});
//# sourceMappingURL=ElementInstancesTest.js.map