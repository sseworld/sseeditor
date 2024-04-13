"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bedrock_client_1 = require("@ephox/bedrock-client");
var katamari_1 = require("@ssephox/katamari");
var InsertAll = require("ssephox/sugar/api/dom/InsertAll");
var Remove = require("ssephox/sugar/api/dom/Remove");
var SugarBody = require("ssephox/sugar/api/node/SugarBody");
var SugarElement_1 = require("ssephox/sugar/api/node/SugarElement");
var SugarNode = require("ssephox/sugar/api/node/SugarNode");
var Html = require("ssephox/sugar/api/properties/Html");
var SimSelection_1 = require("ssephox/sugar/api/selection/SimSelection");
var WindowSelection = require("ssephox/sugar/api/selection/WindowSelection");
bedrock_client_1.UnitTest.test('Browser Test: SelectionTest', function () {
    var p1 = SugarElement_1.SugarElement.fromHtml('<p>This is the <strong>first</strong> paragraph</p>');
    var p2 = SugarElement_1.SugarElement.fromHtml('<p>This is the <em>second</em> paragraph</p>');
    InsertAll.append(SugarBody.body(), [p1, p2]);
    var assertWithin = function (expected, outer) {
        WindowSelection.setToElement(window, outer);
        WindowSelection.getExact(window).fold(function () {
            bedrock_client_1.Assert.fail('Selection should be wrapping: ' + Html.getOuter(outer));
        }, function (sel) {
            katamari_1.Obj.each(expected, function (num, tag) {
                var actual = WindowSelection.findWithin(window, SimSelection_1.SimSelection.exact(sel.start, sel.soffset, sel.finish, sel.foffset), tag);
                bedrock_client_1.Assert.eq('Incorrect number of ' + tag + ' tags.\n' + 'Expected: ' + num + ', but was: ' + actual.length, num, actual.length);
                bedrock_client_1.Assert.eq('All tags must be: ' + tag, true, katamari_1.Arr.forall(actual, function (a) { return SugarNode.name(a) === tag; }));
            });
        });
    };
    assertWithin({
        strong: 1,
        em: 0
    }, p1);
    assertWithin({
        strong: 0,
        em: 1
    }, p2);
    Remove.remove(p1);
    Remove.remove(p2);
});
//# sourceMappingURL=SelectionWithinTest.js.map