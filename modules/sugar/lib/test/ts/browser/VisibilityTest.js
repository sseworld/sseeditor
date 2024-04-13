"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bedrock_client_1 = require("@ephox/bedrock-client");
var katamari_1 = require("@ssephox/katamari");
var Insert = require("ssephox/sugar/api/dom/Insert");
var Remove = require("ssephox/sugar/api/dom/Remove");
var SugarBody = require("ssephox/sugar/api/node/SugarBody");
var Css = require("ssephox/sugar/api/properties/Css");
var Visibility = require("ssephox/sugar/api/view/Visibility");
var Div_1 = require("ssephox/sugar/test/Div");
bedrock_client_1.UnitTest.test('VisibilityTest', function () {
    var c = (0, Div_1.default)();
    bedrock_client_1.Assert.eq('', false, Visibility.isVisible(c));
    Insert.append(SugarBody.body(), c);
    bedrock_client_1.Assert.eq('', true, Visibility.isVisible(c));
    Css.set(c, 'display', 'none');
    bedrock_client_1.Assert.eq('', false, Visibility.isVisible(c));
    // TODO: Disabled since it is flaking on Chrome sometimes it's hidden sometimes its not. #TINY-10485
    // const s = SugarElement.fromTag('span');
    // Assert.eq('', false, Visibility.isVisible(s));
    //
    // Insert.append(SugarBody.body(), s);
    // const expected = PlatformDetection.detect().browser.isFirefox();
    // Assert.eq('', expected, Visibility.isVisible(s)); // tricked you! height and width are zero == hidden
    var d = (0, Div_1.default)();
    Insert.append(c, d);
    bedrock_client_1.Assert.eq('', false, Visibility.isVisible(d));
    Css.remove(c, 'display');
    bedrock_client_1.Assert.eq('', true, Visibility.isVisible(d));
    bedrock_client_1.Assert.eq('', true, Visibility.isVisible(c));
    katamari_1.Arr.each([c, d], Remove.remove);
});
//# sourceMappingURL=VisibilityTest.js.map