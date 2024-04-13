"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bedrock_client_1 = require("@ephox/bedrock-client");
var Insert = require("ssephox/sugar/api/dom/Insert");
var Remove = require("ssephox/sugar/api/dom/Remove");
var SugarBody = require("ssephox/sugar/api/node/SugarBody");
var Attribute = require("ssephox/sugar/api/properties/Attribute");
var Direction = require("ssephox/sugar/api/properties/Direction");
var EphoxElement_1 = require("ssephox/sugar/test/EphoxElement");
bedrock_client_1.UnitTest.test('DirectionTest', function () {
    var el = (0, EphoxElement_1.default)('div');
    var body = SugarBody.body();
    var appendToDom = function (element) {
        Insert.append(body, element);
    };
    var assertDirection = function (element, expectedDirection) {
        appendToDom(element);
        var dir = Direction.getDirection(element);
        bedrock_client_1.Assert.eq('', expectedDirection, dir);
        Remove.remove(element);
    };
    var assertOnDirection = function (element, isLeftReturnThis, isRightReturnThis, expectedOn) {
        appendToDom(element);
        var onDirection = Direction.onDirection(isLeftReturnThis, isRightReturnThis);
        bedrock_client_1.Assert.eq('', expectedOn, onDirection(element));
        Remove.remove(element);
    };
    assertDirection(el, 'ltr');
    assertOnDirection(el, 'isLeft', 'isRight', 'isLeft');
    var arabicElement = (0, EphoxElement_1.default)('div');
    Attribute.setAll(arabicElement, { lang: 'ar', dir: 'rtl' });
    assertDirection(arabicElement, 'rtl');
    assertOnDirection(arabicElement, 'isLeft', 'isRight', 'isRight');
});
//# sourceMappingURL=DirectionTest.js.map