"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bedrock_client_1 = require("@ephox/bedrock-client");
var SugarElement_1 = require("ssephox/sugar/api/node/SugarElement");
bedrock_client_1.UnitTest.test('ElementTest', function () {
    var checkErr = function (f, node) {
        try {
            f(node);
        }
        catch (e) {
            // expected
            return;
        }
        bedrock_client_1.Assert.fail('function did not throw an error');
    };
    var checkEl = function (f, el, expt) {
        var element = f(el);
        bedrock_client_1.Assert.eq('', true, expt === element.dom);
    };
    checkErr(SugarElement_1.SugarElement.fromDom, undefined);
    checkErr(SugarElement_1.SugarElement.fromDom, null);
    checkEl(SugarElement_1.SugarElement.fromDom, document.body, document.body);
});
//# sourceMappingURL=ElementTest.js.map