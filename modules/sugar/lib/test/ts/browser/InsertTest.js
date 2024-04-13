"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bedrock_client_1 = require("@ephox/bedrock-client");
var Insert = require("ssephox/sugar/api/dom/Insert");
var Class = require("ssephox/sugar/api/properties/Class");
var Classes = require("ssephox/sugar/api/properties/Classes");
var Html = require("ssephox/sugar/api/properties/Html");
var Div_1 = require("ssephox/sugar/test/Div");
var EphoxElement_1 = require("ssephox/sugar/test/EphoxElement");
bedrock_client_1.UnitTest.test('InsertTest', function () {
    var container = (0, Div_1.default)();
    var span = (0, EphoxElement_1.default)('span');
    var ol = (0, EphoxElement_1.default)('ol');
    var li1 = (0, EphoxElement_1.default)('li');
    var li2 = (0, EphoxElement_1.default)('li');
    var li3 = (0, EphoxElement_1.default)('li');
    var li4 = (0, EphoxElement_1.default)('li');
    var li0 = (0, EphoxElement_1.default)('li');
    Classes.add(li2, ['second', 'third']);
    Class.add(li3, 'l3');
    Class.add(li4, 'l4');
    Class.add(li0, 'l0');
    var p = (0, EphoxElement_1.default)('p');
    var p2 = (0, EphoxElement_1.default)('p');
    Insert.append(container, p);
    Insert.append(container, p2);
    Insert.append(p, span);
    bedrock_client_1.Assert.eq('', '<p><span></span></p><p></p>', Html.get(container));
    Insert.before(p, ol);
    bedrock_client_1.Assert.eq('', '<ol></ol><p><span></span></p><p></p>', Html.get(container));
    Insert.append(ol, li1);
    Insert.after(li1, li2);
    Insert.after(li2, li4);
    bedrock_client_1.Assert.eq('', '<ol><li></li><li class="second third"></li><li class="l4"></li></ol><p><span></span></p><p></p>', Html.get(container));
    Insert.before(li4, li3);
    bedrock_client_1.Assert.eq('', '<ol><li></li><li class="second third"></li><li class="l3"></li><li class="l4"></li></ol><p><span></span></p><p></p>', Html.get(container));
    Insert.prepend(ol, li0);
    bedrock_client_1.Assert.eq('', '<ol><li class="l0"></li><li></li><li class="second third"></li><li class="l3"></li><li class="l4"></li></ol><p><span></span></p><p></p>', Html.get(container));
});
//# sourceMappingURL=InsertTest.js.map