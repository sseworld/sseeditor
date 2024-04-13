"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bedrock_client_1 = require("@ephox/bedrock-client");
var InsertAll = require("ssephox/sugar/api/dom/InsertAll");
var Remove = require("ssephox/sugar/api/dom/Remove");
var SugarBody = require("ssephox/sugar/api/node/SugarBody");
var SugarElement_1 = require("ssephox/sugar/api/node/SugarElement");
var SimSelection_1 = require("ssephox/sugar/api/selection/SimSelection");
var WindowSelection = require("ssephox/sugar/api/selection/WindowSelection");
bedrock_client_1.UnitTest.test('Browser Test: SelectionRectanglesTest', function () {
    var p1 = SugarElement_1.SugarElement.fromHtml('<p>This is the <strong>first</strong> paragraph</p>');
    var p2 = SugarElement_1.SugarElement.fromHtml('<p>This is the <em>second</em> paragraph</p>');
    InsertAll.append(SugarBody.body(), [p1, p2]);
    var selP1 = SimSelection_1.SimSelection.exact(p1, 0, p1, 1);
    var selP2 = SimSelection_1.SimSelection.exact(p2, 0, p2, 1);
    var rect1 = WindowSelection.getFirstRect(window, selP1).getOrDie('There should be a rectangle for paragraph 1');
    var rect2 = WindowSelection.getFirstRect(window, selP2).getOrDie('There should be a rectangle for paragraph 2');
    bedrock_client_1.Assert.eq('Rect 1 should be above Rect 2. (1) was ' + rect1.top + ', and (2) was ' + rect2.top, true, rect1.top < rect2.top);
    var bounds1 = WindowSelection.getBounds(window, selP1).getOrDie('There should be bounds for paragraph 1');
    var bounds2 = WindowSelection.getBounds(window, selP2).getOrDie('There should be bounds for paragraph 2');
    bedrock_client_1.Assert.eq('Bounds 1 should be above bound 2. (1) was ' + bounds1.top + ', and (2)' + ' was ' + bounds2.top, true, bounds1.top < bounds2.top);
    Remove.remove(p1);
    Remove.remove(p2);
});
//# sourceMappingURL=SelectionRectanglesTest.js.map