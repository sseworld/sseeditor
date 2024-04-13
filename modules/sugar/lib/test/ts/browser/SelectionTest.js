"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bedrock_client_1 = require("@ephox/bedrock-client");
var Compare = require("ssephox/sugar/api/dom/Compare");
var Hierarchy = require("ssephox/sugar/api/dom/Hierarchy");
var InsertAll = require("ssephox/sugar/api/dom/InsertAll");
var Remove = require("ssephox/sugar/api/dom/Remove");
var SugarBody = require("ssephox/sugar/api/node/SugarBody");
var SugarElement_1 = require("ssephox/sugar/api/node/SugarElement");
var SugarElements = require("ssephox/sugar/api/node/SugarElements");
var Html = require("ssephox/sugar/api/properties/Html");
var Traverse = require("ssephox/sugar/api/search/Traverse");
var SimSelection_1 = require("ssephox/sugar/api/selection/SimSelection");
var Situ_1 = require("ssephox/sugar/api/selection/Situ");
var WindowSelection = require("ssephox/sugar/api/selection/WindowSelection");
bedrock_client_1.UnitTest.test('Browser Test: SelectionTest', function () {
    var p1 = SugarElement_1.SugarElement.fromHtml('<p>This is the <strong>first</strong> paragraph</p>');
    var p2 = SugarElement_1.SugarElement.fromHtml('<p>This is the <em>second</em> paragraph</p>');
    var p1text = Hierarchy.follow(p1, [0]).getOrDie('Looking for text in p1');
    var p2text = Hierarchy.follow(p2, [0]).getOrDie('Looking for text in p1');
    InsertAll.append(SugarBody.body(), [p1, p2]);
    var setSelection = function (start, soffset, finish, foffset) {
        WindowSelection.setExact(window, start, soffset, finish, foffset);
    };
    var assertNoSelection = function (label) {
        WindowSelection.getExact(window).each(function (_sel) {
            bedrock_client_1.Assert.fail('There should not be a selection yet: ' + label);
        });
    };
    var assertSelection = function (label, expStart, expSoffset, expFinish, expFoffset) {
        WindowSelection.getExact(window).fold(function () {
            bedrock_client_1.Assert.fail('After setting selection ' + label + ', could not find a selection');
        }, function (sel) {
            bedrock_client_1.Assert.eq(function () { return 'Start container should be: ' + Html.getOuter(expStart) + '\n' + label; }, true, Compare.eq(sel.start, expStart));
            bedrock_client_1.Assert.eq('', expSoffset, sel.soffset);
            bedrock_client_1.Assert.eq(function () { return 'Finish container should be ' + Html.getOuter(expFinish) + '\n' + label; }, true, Compare.eq(sel.finish, expFinish));
            bedrock_client_1.Assert.eq('', expFoffset, sel.foffset);
        });
    };
    WindowSelection.clear(window);
    assertNoSelection('There should not be a selection yet');
    setSelection(p1text, 1, p2text, 1);
    assertSelection('(p1text, 1) -> (p2text, 2)', p1text, 1, p2text, 1);
    setSelection(p2text, 2, p1text, 3);
    assertSelection('(p2text, 2) -> (p1text, 3)', p2text, 2, p1text, 3);
    var assertFragmentHtml = function (expected, fragment) {
        var div = SugarElement_1.SugarElement.fromTag('div');
        InsertAll.append(div, Traverse.children(fragment));
        bedrock_client_1.Assert.eq('', expected, Html.get(div));
    };
    var p1Selected = WindowSelection.forElement(window, p1);
    var clone = WindowSelection.clone(window, SimSelection_1.SimSelection.exactFromRange(p1Selected));
    assertFragmentHtml('This is the <strong>first</strong> paragraph', clone);
    WindowSelection.replace(window, SimSelection_1.SimSelection.exactFromRange(p1Selected), SugarElements.fromHtml('<a>link</a><span>word</span>'));
    bedrock_client_1.Assert.eq('', '<a>link</a><span>word</span>', Html.get(p1));
    WindowSelection.deleteAt(window, SimSelection_1.SimSelection.exact(Hierarchy.follow(p1, [0, 0]).getOrDie('looking for text in a'), 'li'.length, Hierarchy.follow(p1, [1, 0]).getOrDie('looking for text in span'), 'wor'.length));
    bedrock_client_1.Assert.eq('', '<a>li</a><span>d</span>', Html.get(p1));
    Remove.remove(p1);
    Remove.remove(p2);
    var assertRng = function (selection, expStart, expSoffset, expFinish, expFoffset) {
        var r = WindowSelection.toNative(selection);
        bedrock_client_1.Assert.eq(function () { return 'Start Container should be: ' + Html.getOuter(expStart); }, expStart.dom, r.startContainer);
        bedrock_client_1.Assert.eq('Start offset should be: ' + expSoffset, expSoffset, r.startOffset);
        bedrock_client_1.Assert.eq(function () { return 'End Container should be: ' + Html.getOuter(expFinish); }, expFinish.dom, r.endContainer);
        bedrock_client_1.Assert.eq('End offset should be: ' + expFoffset, expFoffset, r.endOffset);
        return r;
    };
    var exact = SimSelection_1.SimSelection.exact(p1text, 1, p2text, 1);
    assertRng(exact, p1text, 1, p2text, 1);
    var startSitu = Situ_1.Situ.on(p1text, 1);
    var finishSitu = Situ_1.Situ.on(p2text, 1);
    var relative = SimSelection_1.SimSelection.relative(startSitu, finishSitu);
    var rng = assertRng(relative, p1text, 1, p2text, 1);
    var domRng = SimSelection_1.SimSelection.domRange(rng);
    assertRng(domRng, p1text, 1, p2text, 1);
});
//# sourceMappingURL=SelectionTest.js.map