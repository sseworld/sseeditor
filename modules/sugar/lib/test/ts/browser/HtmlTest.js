"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bedrock_client_1 = require("@ephox/bedrock-client");
var Insert = require("ssephox/sugar/api/dom/Insert");
var Html = require("ssephox/sugar/api/properties/Html");
var Div_1 = require("ssephox/sugar/test/Div");
bedrock_client_1.UnitTest.test('HtmlTest', function () {
    // checks that Html.getOuter does not fiddle with the dom
    var c = (0, Div_1.default)();
    var container = (0, Div_1.default)();
    Insert.append(container, c);
    bedrock_client_1.Assert.eq('', '<div></div>', Html.getOuter(c));
    bedrock_client_1.Assert.eq('getOuter must not change the DOM', true, c.dom.parentNode === container.dom);
    var content = '<p>stuff</p>';
    Html.set(c, content);
    bedrock_client_1.Assert.eq('', content, c.dom.innerHTML);
    bedrock_client_1.Assert.eq('', content, Html.get(c));
});
//# sourceMappingURL=HtmlTest.js.map