"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bedrock_client_1 = require("@ephox/bedrock-client");
var Insert = require("ssephox/sugar/api/dom/Insert");
var Remove = require("ssephox/sugar/api/dom/Remove");
var SugarBody = require("ssephox/sugar/api/node/SugarBody");
var Class = require("ssephox/sugar/api/properties/Class");
var Css = require("ssephox/sugar/api/properties/Css");
var Visibility = require("ssephox/sugar/api/view/Visibility");
var Div_1 = require("ssephox/sugar/test/Div");
bedrock_client_1.UnitTest.test('TogglerTest', function () {
    var runCheck = function (toggler, check) {
        check(false);
        toggler.toggle();
        check(true);
        toggler.toggle();
        check(false);
        toggler.on();
        bedrock_client_1.Assert.eq('', true, toggler.isOn());
        check(true);
        toggler.on();
        bedrock_client_1.Assert.eq('', true, toggler.isOn());
        check(true);
        toggler.off();
        bedrock_client_1.Assert.eq('', false, toggler.isOn());
        check(false);
        toggler.off();
        bedrock_client_1.Assert.eq('', false, toggler.isOn());
        check(false);
        toggler.on();
        toggler.off();
        bedrock_client_1.Assert.eq('', false, toggler.isOn());
        check(false);
    };
    // this is all due for a good refactoring
    var checkClass = function (has) {
        bedrock_client_1.Assert.eq('', has, Class.has(c, 'blob'));
    };
    var c = (0, Div_1.default)();
    runCheck(Class.toggler(c, 'blob'), checkClass);
    c = (0, Div_1.default)();
    Insert.append(SugarBody.body(), c);
    runCheck(Class.toggler(c, 'blob'), checkClass);
    Remove.remove(c);
    // CSS toggles are silly - we should delete this and do it in a way that does not require detection
    var checkDisplayBlockRemoved = function (has) {
        var v = has ? 'none' : 'block';
        bedrock_client_1.Assert.eq('', v, Css.get(c, 'display'));
    };
    // behaviour when not connected and not specified - which the link dialog relies on
    c = (0, Div_1.default)();
    var vis = Visibility.displayToggler(c, 'block');
    Insert.append(SugarBody.body(), c);
    runCheck(vis, checkDisplayBlockRemoved);
    Remove.remove(c);
    var checkDisplayBlockNone = function (has) {
        var v = has ? 'block' : 'none';
        bedrock_client_1.Assert.eq('', v, Css.get(c, 'display'));
    };
    // normal behaviour
    c = (0, Div_1.default)();
    Css.set(c, 'display', 'none');
    runCheck(Visibility.displayToggler(c, 'block'), checkDisplayBlockNone);
    Insert.append(SugarBody.body(), c);
    runCheck(Visibility.displayToggler(c, 'block'), checkDisplayBlockNone);
    Remove.remove(c);
    var checkVisibilityVisibleRemoved = function (has) {
        var v = has ? 'hidden' : 'visible';
        bedrock_client_1.Assert.eq('', v, Css.get(c, 'visibility'));
    };
    // behaviour when not connected and not specified
    c = (0, Div_1.default)();
    vis = Visibility.toggler(c);
    Insert.append(SugarBody.body(), c);
    runCheck(vis, checkVisibilityVisibleRemoved);
    Remove.remove(c);
    var checkVisibilityVisibleHidden = function (has) {
        var v = has ? 'visible' : 'hidden';
        bedrock_client_1.Assert.eq('', v, Css.get(c, 'visibility'));
    };
    // normal behaviour
    c = (0, Div_1.default)();
    Css.set(c, 'visibility', 'hidden');
    runCheck(Visibility.toggler(c), checkVisibilityVisibleHidden);
    Insert.append(SugarBody.body(), c);
    runCheck(Visibility.toggler(c), checkVisibilityVisibleHidden);
    Remove.remove(c);
});
//# sourceMappingURL=TogglerTest.js.map