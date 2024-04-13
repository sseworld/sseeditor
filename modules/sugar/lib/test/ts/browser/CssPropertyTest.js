"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bedrock_client_1 = require("@ephox/bedrock-client");
var Css = require("ssephox/sugar/api/properties/Css");
var CssProperty_1 = require("ssephox/sugar/api/properties/CssProperty");
var EphoxElement_1 = require("ssephox/sugar/test/EphoxElement");
bedrock_client_1.UnitTest.test('CssProperty', function () {
    var propertyName = 'text-align';
    var propertyValue = 'center';
    var init = (0, CssProperty_1.CssProperty)(propertyName, propertyValue);
    var el = (0, EphoxElement_1.default)('div');
    var propertyIsNot = function (elm, propName, propValue) {
        bedrock_client_1.Assert.eq('', false, init.is(elm));
        bedrock_client_1.Assert.eq('Expected ' + elm.dom + ' to not have property ' + propName + ' set to ' + propValue, false, Css.get(elm, propName) === propValue);
    };
    var propertyIs = function (elm, propName, propValue) {
        bedrock_client_1.Assert.eq('This is failing because ' + elm.dom + ' should have ' + propName + ':' + propValue + '. But found: ' + Css.get(elm, propName), true, init.is(elm));
        bedrock_client_1.Assert.eq('Expected ' + elm.dom + ' to have property ' + propName + ' set to ' + propValue, true, Css.get(elm, propName) === propValue);
    };
    propertyIsNot(el, propertyName, propertyValue);
    init.set(el);
    propertyIs(el, propertyName, propertyValue);
    init.remove(el);
    propertyIsNot(el, propertyName, propertyValue);
});
//# sourceMappingURL=CssPropertyTest.js.map