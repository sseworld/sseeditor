"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bedrock_client_1 = require("@ephox/bedrock-client");
var katamari_1 = require("@ssephox/katamari");
var Css = require("ssephox/sugar/api/properties/Css");
var Div_1 = require("ssephox/sugar/test/Div");
bedrock_client_1.UnitTest.test('CssTransfer', function () {
    var alpha = function () {
        var r = (0, Div_1.default)();
        Css.setAll(r, {
            'display': 'inline',
            'background-color': 'blue'
        });
        return r;
    };
    var beta = function () {
        var r = (0, Div_1.default)();
        Css.setAll(r, {
            display: 'block',
            border: '1px solid black'
        });
        return r;
    };
    var gamma = function () {
        var r = (0, Div_1.default)();
        Css.setAll(r, {
            'background-color': 'red'
        });
        return r;
    };
    var check = function (expectedPresent, expectedAbsent, source, destination, styles) {
        Css.transfer(source, destination, styles);
        katamari_1.Arr.each(expectedAbsent, function (k) {
            if (Css.getRaw(destination, k).isSome()) {
                bedrock_client_1.Assert.fail('Result should not have style: ' + k);
            }
        });
        katamari_1.Obj.each(expectedPresent, function (v, k) {
            var value = Css.getRaw(destination, k).getOrDie('Result should have style: ' + k);
            bedrock_client_1.Assert.eq('', v, value);
        });
    };
    check({
        'display': 'block',
        'background-color': 'blue',
        'border': '1px solid black'
    }, ['text-align'], alpha(), beta(), ['display', 'background-color']);
    check({
        'display': 'block',
        'background-color': 'blue',
        'border': '1px solid black'
    }, ['text-align'], alpha(), beta(), ['background-color']);
    check({
        display: 'block',
        border: '1px solid black'
    }, ['background-color'], alpha(), beta(), ['display']);
    check({
        'display': 'inline',
        'background-color': 'red'
    }, [], alpha(), gamma(), ['display']);
    check({
        'background-color': 'red'
    }, ['display'], alpha(), gamma(), []);
    check({
        'display': 'block',
        'border': '1px solid black',
        'background-color': 'red'
    }, [], beta(), gamma(), ['display', 'border', 'background-color']);
    check({
        'display': 'block',
        'background-color': 'red'
    }, ['border'], beta(), gamma(), ['display', 'background-color']);
});
//# sourceMappingURL=CssTransferTest.js.map