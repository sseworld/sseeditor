"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bedrock_client_1 = require("@ephox/bedrock-client");
var sand_1 = require("@ssephox/sand");
var Compare = require("ssephox/sugar/api/dom/Compare");
var Hierarchy = require("ssephox/sugar/api/dom/Hierarchy");
var Insert = require("ssephox/sugar/api/dom/Insert");
var Remove = require("ssephox/sugar/api/dom/Remove");
var SugarBody = require("ssephox/sugar/api/node/SugarBody");
var SugarElement_1 = require("ssephox/sugar/api/node/SugarElement");
var Attribute = require("ssephox/sugar/api/properties/Attribute");
var Class = require("ssephox/sugar/api/properties/Class");
var Html = require("ssephox/sugar/api/properties/Html");
var SimSelection_1 = require("ssephox/sugar/api/selection/SimSelection");
var Situ_1 = require("ssephox/sugar/api/selection/Situ");
var WindowSelection = require("ssephox/sugar/api/selection/WindowSelection");
bedrock_client_1.UnitTest.test('WindowSelectionTest', function () {
    var container = SugarElement_1.SugarElement.fromTag('div');
    Class.add(container, 'window-selection-test');
    Attribute.set(container, 'contenteditable', 'true');
    var body = SugarBody.body();
    Insert.append(body, container);
    Html.set(container, '<p>This <strong>world</strong> is not <strong>w<em>ha</em>t</strong> I<br><br>wanted</p><p><br>And even more</p>');
    var find = function (path) { return Hierarchy.follow(container, path).getOrDie('invalid path'); };
    var detection = sand_1.PlatformDetection.detect();
    var detector = function (variants) {
        if (detection.browser.isFirefox() && variants.firefox !== undefined) {
            return variants.firefox;
        }
        else if (detection.browser.isSafari() && variants.safari !== undefined) {
            return variants.safari;
        }
        else if (detection.browser.isChromium() && variants.chromium !== undefined) {
            return variants.chromium;
        }
        else {
            return variants.fallback;
        }
    };
    var checkSelection = function (label, variants, start, finish) {
        var expected = detector(variants);
        WindowSelection.setRelative(window, start, finish);
        var actual = WindowSelection.getExact(window).getOrDie('No selection after selection');
        var expStart = find(expected.start);
        var expFinish = find(expected.finish);
        bedrock_client_1.Assert.eq('Start element different', true, Compare.eq(expStart, actual.start));
        bedrock_client_1.Assert.eq('Finish element different', true, Compare.eq(expFinish, actual.finish));
        bedrock_client_1.Assert.eq('', expected.soffset, actual.soffset);
        bedrock_client_1.Assert.eq('', expected.foffset, actual.foffset);
    };
    var checkUniCodeSelection = function (content) {
        Remove.empty(container);
        Html.set(container, content);
        return checkSelection;
    };
    var checkStringAt = function (label, expectedStr, start, finish) {
        // dont need to set a selection range, just extract the Situ.on() element/offset pair
        var actual = WindowSelection.getAsString(window, SimSelection_1.SimSelection.relative(start, finish));
        bedrock_client_1.Assert.eq('Actual was not expected [' + expectedStr + '|' + actual + ']', expectedStr, actual);
    };
    checkSelection('LTR selection (o)', {
        // '<p>This <strong>w[o]rld</strong> is not <strong>w<em>ha</em>t</strong> I<br><br>wanted</p><p><br>And even more</p>';
        fallback: {
            start: [0, 1, 0],
            soffset: 'w'.length,
            finish: [0, 1, 0],
            foffset: 'wo'.length
        }
    }, Situ_1.Situ.on(find([0, 1, 0]), 'w'.length), Situ_1.Situ.on(find([0, 1, 0]), 'wo'.length));
    checkSelection('RTL selection: (o)', {
        // '<p>This <strong>w]o[rld</strong> is not <strong>w<em>ha</em>t</strong> I<br><br>wanted</p><p><br>And even more</p>';
        fallback: {
            start: [0, 1, 0],
            soffset: 'wo'.length,
            finish: [0, 1, 0],
            foffset: 'w'.length
        }
    }, Situ_1.Situ.on(find([0, 1, 0]), 'wo'.length), Situ_1.Situ.on(find([0, 1, 0]), 'w'.length));
    checkSelection('RTL selection (orld)', {
        // '<p>This <strong>w]orld</strong>[ is not <strong>w<em>ha</em>t</strong> I<br><br>wanted</p><p><br>And even more</p>';
        firefox: {
            start: [0],
            soffset: 2,
            finish: [0, 1, 0],
            foffset: 'w'.length
        },
        chromium: {
            start: [0],
            soffset: 2,
            finish: [0, 1, 0],
            foffset: 'w'.length
        },
        safari: {
            start: [0],
            soffset: 2,
            finish: [0, 1, 0],
            foffset: 'w'.length
        },
        fallback: {
            start: [0, 1, 0],
            soffset: 'world'.length,
            finish: [0, 1, 0],
            foffset: 'w'.length
        }
    }, Situ_1.Situ.before(find([0, 2])), Situ_1.Situ.on(find([0, 1, 0]), 'w'.length));
    checkSelection('LTR selection (This world is not what I wanted)', {
        // '<p>[This <strong>world</strong> is not <strong>w<em>ha</em>t</strong> I<br><br>wanted]</p><p><br>And even more</p>';
        fallback: {
            start: [0],
            soffset: 0,
            finish: [0],
            foffset: 7
        }
    }, Situ_1.Situ.on(find([0]), 0), Situ_1.Situ.on(find([0]), 7));
    checkSelection('RTL SimSelection (This world is not what I wanted)', {
        // '<p>]This <strong>world</strong> is not <strong>w<em>ha</em>t</strong> I<br><br>wanted[</p><p><br>And even more</p>';
        fallback: {
            start: [0],
            soffset: 7,
            finish: [0],
            foffset: 0
        },
        chromium: {
            start: [0],
            soffset: 7,
            finish: [0],
            foffset: 0
        }
    }, Situ_1.Situ.on(find([0]), 7), Situ_1.Situ.on(find([0]), 0));
    checkSelection('LTR selection (t I)', {
        fallback: {
            start: [0, 3, 1],
            soffset: 1,
            finish: [0],
            foffset: 6
        }
    }, Situ_1.Situ.after(find([0, 3, 1, 0])), Situ_1.Situ.before(find([0, 6])));
    checkSelection('RTL SimSelection (t I)', {
        // '<p>This <strong>world</strong> is not <strong>w<em>ha]</em>t</strong> I<br><br>[wanted</p><p><br>And even more</p>';
        fallback: {
            finish: [0, 3, 2],
            foffset: ''.length,
            start: [0],
            soffset: 6
        },
        firefox: {
            finish: [0, 3, 1],
            foffset: 1,
            start: [0],
            soffset: 6
        },
        chromium: {
            finish: [0, 3, 1],
            foffset: 1,
            start: [0],
            soffset: 6
        },
        safari: {
            finish: [0, 3, 1],
            foffset: 1,
            start: [0],
            soffset: 6
        },
        spartan: {
            finish: [0, 3, 1],
            foffset: 1,
            start: [0],
            soffset: 6
        }
    }, Situ_1.Situ.before(find([0, 6])), Situ_1.Situ.after(find([0, 3, 1, 0])));
    checkStringAt('LTR stringAt (This world is not what I)', 
    // checkSelection above has error in what it thinks 0/7 is:
    //   expects:    '<p>[This <strong>world</strong> is not <strong>w<em>ha</em>t</strong> I<br><br>wanted]</p><p><br>And even more</p>';
    //   but actual: '<p>[This <strong>world</strong> is not <strong>w<em>ha</em>t</strong> I<br>]<br>wanted</p><p><br>And even more</p>';
    'This world is not what I', Situ_1.Situ.on(find([0]), 0), Situ_1.Situ.on(find([0]), 7));
    checkStringAt('RTL SimSelection (This world is not what I)', 'This world is not what I', Situ_1.Situ.on(find([0]), 7), Situ_1.Situ.on(find([0]), 0));
    // Test that proves safari will always normalise a selection to the end leaf
    // when we set the selection to the span, then get selection, all browsers will return the span
    // safari will return the textnode inside the span if one exists.
    checkUniCodeSelection('<span>\uFEFF<span>')('TBIO-3883: Unicode position', {
        fallback: {
            start: [0],
            soffset: 0,
            finish: [0],
            foffset: 0
        }
    }, Situ_1.Situ.on(find([0]), 0), Situ_1.Situ.on(find([0]), 0));
    checkUniCodeSelection('<span>^<span>')('TBIO-3883: Any Character', {
        fallback: {
            start: [0],
            soffset: 0,
            finish: [0],
            foffset: 0
        }
    }, Situ_1.Situ.on(find([0]), 0), Situ_1.Situ.on(find([0]), 0));
    Remove.remove(container);
});
//# sourceMappingURL=SelectionRangeTest.js.map