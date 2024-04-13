"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bedrock_client_1 = require("@ephox/bedrock-client");
var Hierarchy = require("ssephox/sugar/api/dom/Hierarchy");
var SugarElement_1 = require("ssephox/sugar/api/node/SugarElement");
var Html = require("ssephox/sugar/api/properties/Html");
var Prefilter = require("ssephox/sugar/selection/quirks/Prefilter");
bedrock_client_1.UnitTest.test('Browser Test: PrefilterTest', function () {
    var root = SugarElement_1.SugarElement.fromHtml('<div>' +
        '<span>dog</span>' +
        '<br>' +
        '<img>' +
        '<span>cat</span>' +
        '</div>');
    var toString = function (situ) { return situ.fold(function (b) { return 'before(' + Html.getOuter(b) + ')'; }, function (e, o) { return 'on(' + Html.getOuter(e) + ', ' + o + ')'; }, function (a) { return 'after(' + Html.getOuter(a) + ')'; }); };
    var check = function (label, expected, elementPath, offset) {
        var element = Hierarchy.follow(root, elementPath).getOrDie('Test: ' + label + '. Could not find the element path within root: ' + elementPath);
        var actual = Prefilter.beforeSpecial(element, offset);
        var actualS = toString(actual);
        bedrock_client_1.Assert.eq('Test: ' + label + '. Was: ' + actualS + ', but expected: ' + expected, expected, actualS);
    };
    check('div 0', 'on(<div><span>dog</span><br><img><span>cat</span></div>, 0)', [], 0);
    check('div > span, 0', 'on(<span>dog</span>, 0)', [0], 0);
    check('div > span, 1', 'on(<span>dog</span>, 1)', [0], 1);
    check('div > br, 0', 'before(<br>)', [1], 0);
    check('div > br, 1', 'after(<br>)', [1], 1);
    check('div > img,  0', 'before(<img>)', [2], 0);
    check('div > img,  1', 'after(<img>)', [2], 1);
    check('div > span3, 0', 'on(<span>cat</span>, 0)', [3], 0);
    check('div > span3, 1', 'on(<span>cat</span>, 1)', [3], 1);
});
//# sourceMappingURL=PrefilterTest.js.map