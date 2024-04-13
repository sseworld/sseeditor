"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bedrock_client_1 = require("@ephox/bedrock-client");
var Insert = require("ssephox/sugar/api/dom/Insert");
var Remove = require("ssephox/sugar/api/dom/Remove");
var SugarBody = require("ssephox/sugar/api/node/SugarBody");
var Css = require("ssephox/sugar/api/properties/Css");
var Height = require("ssephox/sugar/api/view/Height");
var Width = require("ssephox/sugar/api/view/Width");
var Div_1 = require("ssephox/sugar/test/Div");
bedrock_client_1.UnitTest.test('SizeTest', function () {
    var c = (0, Div_1.default)();
    var checker = function (cssProp, api) {
        var checkExc = function (expected, f) {
            bedrock_client_1.Assert.throwsError('', f, expected);
        };
        var exact = function () { return Css.getRaw(c, cssProp).getOrDie('value was not set'); };
        api.set(c, 100);
        bedrock_client_1.Assert.eq('', 100, api.get(c));
        checkExc(cssProp + '.set accepts only positive integer values. Value was 100%', function () {
            api.set(c, '100%');
        });
        checkExc(cssProp + '.set accepts only positive integer values. Value was 100px', function () {
            api.set(c, '100px');
        });
        bedrock_client_1.Assert.eq('', '100px', exact());
        Css.set(c, cssProp, '85%');
        bedrock_client_1.Assert.eq('', '85%', exact());
        if (SugarBody.inBody(c)) {
            // percentage height is calculated as zero, but percentage width works just fine
            if (cssProp === 'height') {
                bedrock_client_1.Assert.eq('', 0, api.get(c));
            }
            else {
                bedrock_client_1.Assert.eq('', true, api.get(c) > 0);
            }
        }
        Css.set(c, cssProp, '30px');
        bedrock_client_1.Assert.eq('', 30, api.get(c));
        bedrock_client_1.Assert.eq('', '30px', exact());
    };
    checker('height', Height);
    checker('width', Width);
    Insert.append(SugarBody.body(), c);
    checker('height', Height);
    checker('width', Width);
    Remove.remove(c);
});
//# sourceMappingURL=SizeTest.js.map