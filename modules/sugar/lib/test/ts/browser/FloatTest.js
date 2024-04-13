"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bedrock_client_1 = require("@ephox/bedrock-client");
var Insert = require("ssephox/sugar/api/dom/Insert");
var Remove = require("ssephox/sugar/api/dom/Remove");
var SugarBody = require("ssephox/sugar/api/node/SugarBody");
var SugarElement_1 = require("ssephox/sugar/api/node/SugarElement");
var Css = require("ssephox/sugar/api/properties/Css");
var Float = require("ssephox/sugar/api/properties/Float");
var MathElement_1 = require("ssephox/sugar/test/MathElement");
bedrock_client_1.UnitTest.test('FloatTest', function () {
    var image = SugarElement_1.SugarElement.fromTag('table');
    var m = (0, MathElement_1.default)();
    bedrock_client_1.Assert.eq('', null, Float.getRaw(image));
    Float.getRaw(m);
    Insert.append(SugarBody.body(), image);
    Insert.append(SugarBody.body(), m);
    Css.setAll(image, {
        'margin-left': 'auto',
        'margin-right': 'auto'
    });
    bedrock_client_1.Assert.eq('', 'center', Float.divine(image).getOrDie());
    Float.divine(m);
    Float.getRaw(m);
    Css.remove(m, 'margin-right');
    bedrock_client_1.Assert.eq('', false, Float.isCentered(m));
    Css.set(m, 'float', 'none');
    bedrock_client_1.Assert.eq('', true, Float.isCentered(image));
    Css.remove(image, 'margin-left');
    Css.remove(image, 'margin-right');
    bedrock_client_1.Assert.eq('', 'none', Float.divine(image).getOrDie());
    Css.set(image, 'float', 'none');
    bedrock_client_1.Assert.eq('', 'none', Float.divine(image).getOrDie());
    bedrock_client_1.Assert.eq('', 'none', Float.getRaw(image));
    Css.set(image, 'float', 'right');
    bedrock_client_1.Assert.eq('', 'right', Float.divine(image).getOrDie());
    bedrock_client_1.Assert.eq('', false, Float.isCentered(image));
    Float.setCentered(image);
    bedrock_client_1.Assert.eq('', true, Float.isCentered(image));
    Remove.remove(image);
});
//# sourceMappingURL=FloatTest.js.map