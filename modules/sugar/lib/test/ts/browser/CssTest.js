"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bedrock_client_1 = require("@ephox/bedrock-client");
var katamari_1 = require("@ssephox/katamari");
var katamari_assertions_1 = require("@ssephox/katamari-assertions");
var sand_1 = require("@ssephox/sand");
var Insert = require("ssephox/sugar/api/dom/Insert");
var Remove = require("ssephox/sugar/api/dom/Remove");
var SugarBody = require("ssephox/sugar/api/node/SugarBody");
var Attribute = require("ssephox/sugar/api/properties/Attribute");
var Css = require("ssephox/sugar/api/properties/Css");
var Div_1 = require("ssephox/sugar/test/Div");
var MathElement_1 = require("ssephox/sugar/test/MathElement");
bedrock_client_1.UnitTest.test('CssTest', function () {
    var runChecks = function (connected) {
        var c = (0, Div_1.default)();
        var m = (0, MathElement_1.default)();
        if (connected) {
            Insert.append(SugarBody.body(), c);
        }
        Insert.append(SugarBody.body(), m);
        var check = function (k, v1, v2) {
            Css.set(c, k, v1);
            Css.set(m, k, v1); // Just checking that the element
            bedrock_client_1.Assert.eq('get', v1, Css.get(c, k));
            Css.set(c, k, v2);
            bedrock_client_1.Assert.eq('get', v2, Css.get(c, k));
        };
        check('background-color', 'rgb(10, 20, 30)', 'rgb(40, 50, 11)');
        check('display', 'none', 'block');
        Css.set(c, 'position', 'relative'); // so that z-index actually does something
        check('z-index', '-1', '2');
        var c2 = (0, Div_1.default)();
        Css.copy(c, c2);
        Css.copy(m, c2);
        // NOTE: Safari, Firefox 71+ and Chromium 102+ seem to support styles for math ml tags, so the Css.copy(m, c2) clobbers the previous style
        var browser = sand_1.PlatformDetection.detect().browser;
        if (browser.isSafari() || browser.isFirefox() && browser.version.major >= 71 || browser.isChromium() && browser.version.major >= 102) {
            Css.copy(c, c2);
        }
        Css.get(m, 'display');
        Css.getRaw(m, 'bogus');
        bedrock_client_1.Assert.eq('get', 'rgb(40, 50, 11)', Css.get(c2, 'background-color'));
        bedrock_client_1.Assert.eq('get', 'block', Css.get(c2, 'display'));
        // getRaw
        var d = (0, Div_1.default)();
        if (connected) {
            Insert.append(SugarBody.body(), d);
        }
        katamari_assertions_1.KAssert.eqNone('getRaw bogus', Css.getRaw(d, 'bogus'));
        bedrock_client_1.Assert.eq('getRaw display 1', true, Css.getRaw(d, 'display').isNone());
        Css.set(d, 'display', 'inline-block');
        bedrock_client_1.Assert.eq('getRaw display 2', true, Css.getRaw(d, 'display').isSome());
        bedrock_client_1.Assert.eq('getRaw display 3', 'inline-block', Css.getRaw(d, 'display').getOrDie('Optional expecting: inline-block'));
        Css.remove(d, 'display');
        bedrock_client_1.Assert.eq('getRaw display 4', true, Css.getRaw(d, 'display').isNone());
        bedrock_client_1.Assert.eq('has', false, Attribute.has(d, 'style'));
        Css.set(d, 'font-size', '12px');
        bedrock_client_1.Assert.eq('getRaw font-size 1', true, Css.getRaw(d, 'font-size').isSome());
        Css.remove(d, 'font-size');
        bedrock_client_1.Assert.eq('getRaw font-size 2', false, Css.getRaw(d, 'font-size').isSome());
        Css.set(d, 'background-color', 'rgb(12, 213, 12)');
        bedrock_client_1.Assert.eq('getRaw background-color', 'rgb(12, 213, 12)', Css.getRaw(d, 'background-color').getOrDie('Optional expecting: rgb(12,213,12)'));
        Css.remove(d, 'background-color');
        // getAllRaw
        var bulkStyles = {
            'display': 'inline-block',
            'font-size': '12px',
            'background-color': 'rgb(12, 213, 12)'
        };
        Css.setAll(d, bulkStyles);
        bedrock_client_1.Assert.eq('getAllRaw', bulkStyles, Css.getAllRaw(d));
        Attribute.remove(d, 'style');
        // validate
        bedrock_client_1.Assert.eq('isValidValue', true, Css.isValidValue('span', 'font-size', 'small'));
        bedrock_client_1.Assert.eq('isValidValue', true, Css.isValidValue('span', 'font-size', '12px'));
        bedrock_client_1.Assert.eq('isValidValue', false, Css.isValidValue('span', 'font-size', 'biggest'));
        bedrock_client_1.Assert.eq('isValidValue', true, Css.isValidValue('span', 'display', 'inline-block'));
        bedrock_client_1.Assert.eq('isValidValue', false, Css.isValidValue('span', 'display', 'on'));
        bedrock_client_1.Assert.eq('isValidValue', true, Css.isValidValue('span', 'background-color', '#232323'));
        bedrock_client_1.Assert.eq('isValidValue', false, Css.isValidValue('span', 'backgroundColor', '#2323'));
        bedrock_client_1.Assert.eq('isValidValue', false, Css.isValidValue('span', 'font-size', 'value'));
        bedrock_client_1.Assert.eq('isValidValue', true, Css.isValidValue('span', 'margin-top', '23px'));
        var play = (0, Div_1.default)();
        if (connected) {
            Insert.append(SugarBody.body(), play);
        }
        // ensure preserve works correctly when there are no styles
        Css.preserve(play, function (e) {
            Css.set(e, 'left', '0px');
        });
        if (!(Attribute.get(play, 'style') === '' || Attribute.get(play, 'style') === undefined)) {
            bedrock_client_1.Assert.fail('lack of styles should have been preserved, was "' + Attribute.get(play, 'style') + '"');
        }
        Css.setAll(play, {
            'left': '0px',
            'right': '0px',
            'font-size': '12px'
        });
        bedrock_client_1.Assert.eq('getRaw', true, Css.getRaw(play, 'font-size').isSome());
        Css.preserve(play, function (el) {
            Css.remove(el, 'font-size');
            bedrock_client_1.Assert.eq('getRaw', false, Css.getRaw(play, 'font-size').isSome());
        });
        bedrock_client_1.Assert.eq('Font size should have been preserved', true, Css.getRaw(play, 'font-size').isSome());
        Css.setOptions(play, {
            'left': katamari_1.Optional.none(),
            'right': katamari_1.Optional.none(),
            'top': katamari_1.Optional.some('0px'),
            'bottom': katamari_1.Optional.some('0px'),
            'font-size': katamari_1.Optional.none(),
            'font-family': katamari_1.Optional.some('Arial')
        });
        katamari_assertions_1.KAssert.eqNone('getRaw left', Css.getRaw(play, 'left'));
        katamari_assertions_1.KAssert.eqNone('getRaw right', Css.getRaw(play, 'right'));
        katamari_assertions_1.KAssert.eqNone('getRaw font-size', Css.getRaw(play, 'font-size'));
        katamari_assertions_1.KAssert.eqSome('getRaw top', '0px', Css.getRaw(play, 'top'));
        katamari_assertions_1.KAssert.eqSome('getRaw bottom', '0px', Css.getRaw(play, 'bottom'));
        katamari_assertions_1.KAssert.eqSome('getRaw font-family', 'Arial', Css.getRaw(play, 'font-family'));
        // final cleanup
        katamari_1.Arr.each([c, d, play], Remove.remove);
    };
    runChecks(true);
    runChecks(false);
});
//# sourceMappingURL=CssTest.js.map