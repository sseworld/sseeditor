"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bedrock_client_1 = require("@ephox/bedrock-client");
var Compare = require("ssephox/sugar/api/dom/Compare");
var InsertAll = require("ssephox/sugar/api/dom/InsertAll");
var SugarElement_1 = require("ssephox/sugar/api/node/SugarElement");
var Html = require("ssephox/sugar/api/properties/Html");
var Awareness = require("ssephox/sugar/api/selection/Awareness");
var CursorPosition = require("ssephox/sugar/api/selection/CursorPosition");
var Edge = require("ssephox/sugar/api/selection/Edge");
bedrock_client_1.UnitTest.test('Browser Test: CursorPositionTest', function () {
    var container = SugarElement_1.SugarElement.fromTag('div');
    var child1 = SugarElement_1.SugarElement.fromText('');
    var child2 = SugarElement_1.SugarElement.fromText(' ');
    var child3 = SugarElement_1.SugarElement.fromTag('span');
    var child3a = SugarElement_1.SugarElement.fromText('3a');
    var child3b = SugarElement_1.SugarElement.fromText('3b');
    var child3c = SugarElement_1.SugarElement.fromText('');
    var child3d = SugarElement_1.SugarElement.fromTag('br');
    var child3e = SugarElement_1.SugarElement.fromText('');
    InsertAll.append(child3, [child3a, child3b, child3c, child3d, child3e]);
    var child4 = SugarElement_1.SugarElement.fromTag('br');
    var child5 = SugarElement_1.SugarElement.fromText('');
    InsertAll.append(container, [child1, child2, child3, child4, child5]);
    var checkFirst = function (label, expected, root) {
        var actual = CursorPosition.first(root).getOrDie('No cursor position found for: ' + label);
        bedrock_client_1.Assert.eq(function () { return 'Incorrect element. \nExpected: ' + Html.getOuter(expected) + '\nWas: ' + Html.getOuter(actual); }, true, Compare.eq(expected, actual));
    };
    var checkLast = function (label, expected, root) {
        var actual = CursorPosition.last(root).getOrDie('No cursor position found for: ' + label);
        bedrock_client_1.Assert.eq(function () { return 'Incorrect element. \nExpected: ' + Html.getOuter(expected) + '\nWas: ' + Html.getOuter(actual); }, true, Compare.eq(expected, actual));
    };
    checkFirst('First of container (should skip empty container)', child3a, container);
    checkFirst('First of span', child3a, child3);
    checkLast('Last of container (should be <br>)', child4, container);
    checkLast('Last of span (should be <br>)', child3d, child3);
    bedrock_client_1.Assert.eq('', 5, Awareness.getEnd(container));
    bedrock_client_1.Assert.eq('', 2, Awareness.getEnd(child3a));
    bedrock_client_1.Assert.eq('', 1, Awareness.getEnd(SugarElement_1.SugarElement.fromTag('img')));
    bedrock_client_1.Assert.eq('', true, Awareness.isEnd(container, 5));
    bedrock_client_1.Assert.eq('', false, Awareness.isEnd(container, 4));
    bedrock_client_1.Assert.eq('', true, Awareness.isStart(container, 0));
    bedrock_client_1.Assert.eq('', false, Awareness.isStart(container, 1));
    bedrock_client_1.Assert.eq('', true, Edge.isAtLeftEdge(container, child3a, 0));
    bedrock_client_1.Assert.eq('', false, Edge.isAtLeftEdge(container, child2, 1));
    // INVESTIGATE: Not sure if offset here should be 0 or 1.
    bedrock_client_1.Assert.eq('', true, Edge.isAtRightEdge(container, child4, 0));
    var container2 = SugarElement_1.SugarElement.fromTag('p');
    var child2_1 = SugarElement_1.SugarElement.fromHtml('<span contenteditable="false">AAA</span>');
    var child2_2 = SugarElement_1.SugarElement.fromText('BBB');
    var child2_3 = SugarElement_1.SugarElement.fromHtml('<span contenteditable="false">CCC</span>');
    InsertAll.append(container2, [child2_1, child2_2, child2_3]);
    checkFirst('First of container2 should be first CEF', child2_1, container2);
    checkLast('Last of container2 should be last CEF', child2_3, container2);
});
//# sourceMappingURL=CursorPositionTest.js.map