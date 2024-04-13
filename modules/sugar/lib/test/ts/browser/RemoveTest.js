"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bedrock_client_1 = require("@ephox/bedrock-client");
var Insert = require("ssephox/sugar/api/dom/Insert");
var Remove = require("ssephox/sugar/api/dom/Remove");
var SugarBody = require("ssephox/sugar/api/node/SugarBody");
var SugarElement_1 = require("ssephox/sugar/api/node/SugarElement");
var Class = require("ssephox/sugar/api/properties/Class");
var Classes = require("ssephox/sugar/api/properties/Classes");
var Html = require("ssephox/sugar/api/properties/Html");
var Traverse = require("ssephox/sugar/api/search/Traverse");
var Div_1 = require("ssephox/sugar/test/Div");
var EphoxElement_1 = require("ssephox/sugar/test/EphoxElement");
bedrock_client_1.UnitTest.test('RemoveTest', function () {
    var runChecks = function (connected) {
        var container = (0, Div_1.default)();
        var span = (0, EphoxElement_1.default)('span');
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
        if (connected) {
            Insert.append(SugarBody.body(), container);
        }
        bedrock_client_1.Assert.eq('', '<p><span></span></p><p></p>', Html.get(container));
        Remove.remove(p2);
        bedrock_client_1.Assert.eq('', '<p><span></span></p>', Html.get(container));
        Insert.append(container, p2);
        bedrock_client_1.Assert.eq('', '<p><span></span></p><p></p>', Html.get(container));
        Remove.remove(span);
        bedrock_client_1.Assert.eq('', '<p></p><p></p>', Html.get(container));
        Remove.empty(container);
        // regular empty check
        bedrock_client_1.Assert.eq('', '', Html.get(container));
        bedrock_client_1.Assert.eq('', 0, Traverse.children(container).length);
        // after inserting an empty text node, empty doesn't always mean empty!
        Insert.append(container, SugarElement_1.SugarElement.fromText(''));
        Remove.empty(container);
        bedrock_client_1.Assert.eq('', '', Html.get(container));
        bedrock_client_1.Assert.eq('', 0, Traverse.children(container).length);
        Remove.remove(container);
    };
    runChecks(false);
    runChecks(true);
});
//# sourceMappingURL=RemoveTest.js.map