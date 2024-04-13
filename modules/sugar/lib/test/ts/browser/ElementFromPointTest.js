"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bedrock_client_1 = require("@ephox/bedrock-client");
var katamari_1 = require("@ssephox/katamari");
var katamari_assertions_1 = require("@ssephox/katamari-assertions");
var Compare = require("ssephox/sugar/api/dom/Compare");
var Insert = require("ssephox/sugar/api/dom/Insert");
var Remove = require("ssephox/sugar/api/dom/Remove");
var SugarBody = require("ssephox/sugar/api/node/SugarBody");
var SugarElement_1 = require("ssephox/sugar/api/node/SugarElement");
var Css = require("ssephox/sugar/api/properties/Css");
var Div_1 = require("ssephox/sugar/test/Div");
bedrock_client_1.UnitTest.test('ElementFromPointTest', function () {
    var a = (0, Div_1.default)();
    var bg = (0, Div_1.default)();
    var placeElm = function (elm, x, y, w, h) {
        Css.setAll(elm, {
            position: 'fixed',
            left: x + 'px',
            top: y + 'px',
            width: w + 'px',
            height: h + 'px',
            background: 'red'
        });
    };
    var getAt = function (elm, placeX, placeY, testX, testY) {
        placeElm(elm, placeX, placeY, 100, 50);
        return SugarElement_1.SugarElement.fromPoint(SugarElement_1.SugarElement.fromDom(document), testX, testY);
    };
    var checkMatch = function (p, placeX, placeY, expectedElm, testX, testY) {
        var actualElm = getAt(p, placeX, placeY, testX, testY).getOrDie('Should be some element.');
        // debugger
        bedrock_client_1.Assert.eq('Should be expected element', true, Compare.eq(expectedElm, actualElm));
    };
    var checkNone = function (p, placeX, placeY, testX, testY) {
        katamari_assertions_1.KAssert.eqNone('Should be none', getAt(p, placeX, placeY, testX, testY));
    };
    katamari_1.Arr.each([bg, a], function (elm) {
        Insert.append(SugarBody.body(), elm);
    });
    placeElm(bg, 0, 0, 200, 200);
    checkMatch(a, 10, 10, a, 20, 20);
    checkMatch(a, 10, 10, a, 20, 59);
    checkMatch(a, 10, 10, a, 109, 59);
    checkMatch(a, 10, 10, bg, 110, 60);
    checkMatch(a, 10, 20, bg, 10, 10);
    checkMatch(a, 20, 10, bg, 10, 10);
    checkMatch(a, 20, 20, bg, 10, 10);
    checkNone(a, 0, 0, -1000, -1000);
    katamari_1.Arr.each([bg, a], Remove.remove);
});
//# sourceMappingURL=ElementFromPointTest.js.map