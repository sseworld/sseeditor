"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bedrock_client_1 = require("@ephox/bedrock-client");
var katamari_1 = require("@ssephox/katamari");
var sand_1 = require("@ssephox/sand");
var Insert = require("ssephox/sugar/api/dom/Insert");
var Remove = require("ssephox/sugar/api/dom/Remove");
var DomEvent = require("ssephox/sugar/api/events/DomEvent");
var SugarBody = require("ssephox/sugar/api/node/SugarBody");
var SugarElement_1 = require("ssephox/sugar/api/node/SugarElement");
var Attribute = require("ssephox/sugar/api/properties/Attribute");
var Css = require("ssephox/sugar/api/properties/Css");
var Traverse = require("ssephox/sugar/api/search/Traverse");
var Scroll = require("ssephox/sugar/api/view/Scroll");
var SugarLocation = require("ssephox/sugar/api/view/SugarLocation");
bedrock_client_1.UnitTest.asynctest('LocationTest', function (success, failure) {
    var platform = sand_1.PlatformDetection.detect();
    var scrollBarWidth = Scroll.scrollBarWidth();
    var leftScrollBarWidth = function (doc) {
        // Tries to detect the width of the left scrollbar by checking the offsetLeft of the documentElement
        // Chrome adds the scrollbar to the left in rtl mode as of Chrome 70+
        return SugarLocation.relative(Traverse.documentElement(doc.body)).left;
    };
    var asserteq = function (expected, actual, message) {
        // I wish assert.eq printed expected and actual on failure
        var m = message === undefined ? '' : 'expected ' + expected + ', was ' + actual + ': ' + message;
        bedrock_client_1.Assert.eq(m, expected, actual);
    };
    var testOne = function (i, attrMap, next) {
        var iframe = SugarElement_1.SugarElement.fromHtml(i);
        Attribute.setAll(iframe, attrMap.iframe);
        var run = DomEvent.bind(iframe, 'load', function () {
            run.unbind();
            try {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                var iframeWin = iframe.dom.contentWindow;
                var iframeDoc_1 = iframeWin.document;
                var html = SugarElement_1.SugarElement.fromDom(iframeDoc_1.documentElement);
                var body = SugarElement_1.SugarElement.fromDom(iframeDoc_1.body);
                attrMap.html.each(katamari_1.Fun.curry(Attribute.setAll, html));
                attrMap.body.each(katamari_1.Fun.curry(Attribute.setAll, body));
                var doc = {
                    iframe: iframe,
                    rawWin: iframeWin,
                    rawDoc: SugarElement_1.SugarElement.fromDom(iframeDoc_1),
                    body: body,
                    rtl: iframeDoc_1.body.dir === 'rtl',
                    dir: Attribute.get(body, 'dir') || 'ltr',
                    byId: function (str) {
                        return katamari_1.Optional.from(iframeDoc_1.getElementById(str))
                            .map(SugarElement_1.SugarElement.fromDom)
                            .getOrDie('cannot find element with id ' + str);
                    }
                };
                checks(doc);
                Remove.remove(iframe);
                next();
            }
            catch (e) {
                // Remove.remove(iframe);
                failure(e);
            }
        });
        Insert.append(SugarBody.body(), iframe);
    };
    var ifr = '<iframe src="/project/@ephox/sugar/src/test/data/locationTest.html"></iframe>';
    testOne(ifr, {
        iframe: { id: 'vanilla', style: 'height:200px; width:500px; border: 1px dashed chartreuse;' },
        html: katamari_1.Optional.none(),
        body: katamari_1.Optional.some({ contenteditable: 'true', style: 'margin: 0; padding: 5px;' })
    }, function () {
        testOne(ifr, {
            iframe: { id: 'ifrRtl', style: 'height:200px; width:500px; border: 1px dashed turquoise;' },
            html: katamari_1.Optional.none(),
            body: katamari_1.Optional.some({ dir: 'rtl', contenteditable: 'true', style: 'margin: 0; padding: 5px;' })
        }, success);
    });
    var checks = function (doc) {
        katamari_1.Arr.each([
            baseChecks,
            disconnectedChecks,
            absoluteChecks,
            relativeChecks,
            staticChecks,
            tableChecks,
            fixedChecks, // recommend making these last, as they adjust the iframe scroll
            bodyChecks
        ], function (f) {
            f(doc);
        });
    };
    var baseChecks = function () {
        // these checks actually depend on the tunic stylesheet. They might not actually be useful.
        var body = SugarBody.body();
        var pos = SugarLocation.absolute(body);
        bedrock_client_1.Assert.eq('', 0, pos.top);
        bedrock_client_1.Assert.eq('', 0, pos.left);
        pos = SugarLocation.relative(body);
        bedrock_client_1.Assert.eq('', 0, pos.top); // JQuery doesn't return 0, but this makes more sense
        bedrock_client_1.Assert.eq('', 0, pos.left);
        pos = SugarLocation.viewport(body);
        bedrock_client_1.Assert.eq('', 0, pos.top);
        bedrock_client_1.Assert.eq('', 0, pos.left);
        // TINY-9203: due to Win11 FF adopting native hidden scrollbar behavior and current inability to distinguish between Win10 and Win11
        // (both os.version.major === 10), allow scrollbar to be either hidden or visible when on Win10/11 FF
        var noVisibleScrollbarBrowser = platform.os.isMacOS() || (platform.browser.isFirefox() && platform.os.isLinux()) || (platform.browser.isFirefox() && platform.os.isWindows() && platform.os.version.major >= 10);
        bedrock_client_1.Assert.eq('scroll bar width, got=' + scrollBarWidth, true, scrollBarWidth > 5 && scrollBarWidth < 50 || (noVisibleScrollbarBrowser && scrollBarWidth === 0));
    };
    var disconnectedChecks = function () {
        var div = SugarElement_1.SugarElement.fromTag('div');
        var pos = SugarLocation.absolute(div);
        bedrock_client_1.Assert.eq('', 0, pos.top);
        bedrock_client_1.Assert.eq('', 0, pos.left);
        pos = SugarLocation.relative(div);
        bedrock_client_1.Assert.eq('', 0, pos.top);
        bedrock_client_1.Assert.eq('', 0, pos.left);
        pos = SugarLocation.viewport(div);
        bedrock_client_1.Assert.eq('', 0, pos.top);
        bedrock_client_1.Assert.eq('', 0, pos.left);
    };
    var absoluteChecks = function (doc) {
        var leftScrollW = leftScrollBarWidth(doc);
        // This one has position absolute, but no values set initially
        Css.setAll(doc.byId('positionTest'), { top: '10px', left: '10px' });
        // GUESS: 1px differences from JQuery is due to the 1px margin on the body
        var tests = [
            {
                id: 'absolute-1',
                absolute: { top: 1, left: { ltr: 1, rtl: 1 + leftScrollW } },
                relative: { top: 1, left: { ltr: 1, rtl: 1 + leftScrollW } }, // JQuery returns 0/0
                viewport: { top: 1, left: { ltr: 1, rtl: 1 + leftScrollW } }
            },
            {
                id: 'absolute-1-1',
                absolute: { top: 5, left: { ltr: 5, rtl: 5 + leftScrollW } },
                relative: { top: 2, left: { ltr: 2, rtl: 2 } }, // JQuery returns 1/1
                viewport: { top: 5, left: { ltr: 5, rtl: 5 + leftScrollW } }
            },
            {
                id: 'absolute-1-1-1',
                absolute: { top: 9, left: { ltr: 9, rtl: 9 + leftScrollW } },
                relative: { top: 2, left: { ltr: 2, rtl: 2 } }, // JQuery returns 1/1
                viewport: { top: 9, left: { ltr: 9, rtl: 9 + leftScrollW } }
            },
            {
                id: 'absolute-2',
                absolute: { top: 20, left: { ltr: 20, rtl: 20 + leftScrollW } },
                relative: { top: 20, left: { ltr: 20, rtl: 20 + leftScrollW } }, // JQuery returns 19/19
                viewport: { top: 20, left: { ltr: 20, rtl: 20 + leftScrollW } }
            },
            {
                id: 'positionTest',
                absolute: { top: 10, left: { ltr: 10, rtl: 10 + leftScrollW } },
                relative: { top: 10, left: { ltr: 10, rtl: 10 + leftScrollW } },
                viewport: { top: 10, left: { ltr: 10, rtl: 10 + leftScrollW } }
            }
        ];
        runChecks(doc, tests);
    };
    var relativeChecks = function (doc) {
        var leftScrollW = leftScrollBarWidth(doc);
        // GUESS: 1px differences from JQuery is due to the 1px margin on the body
        var tests = [
            {
                id: 'relative-1',
                absolute: { top: 6, left: { ltr: 6, rtl: 380 - scrollBarWidth + leftScrollW } },
                relative: { top: 6, left: { ltr: 6, rtl: 380 - scrollBarWidth } }, // JQuery returns 6/6
                viewport: { top: 6, left: { ltr: 6, rtl: 380 - scrollBarWidth + leftScrollW } }
            },
            {
                id: 'relative-1-1',
                absolute: { top: 14, left: { ltr: 14, rtl: 372 - scrollBarWidth + leftScrollW } },
                relative: { top: 6, left: { ltr: 6, rtl: -10 } }, // JQuery returns 5/5
                viewport: { top: 14, left: { ltr: 14, rtl: 372 - scrollBarWidth + leftScrollW } }
            },
            {
                id: 'relative-1-1-1',
                absolute: { top: 22, left: { ltr: 22, rtl: 364 - scrollBarWidth + leftScrollW } },
                relative: { top: 6, left: { ltr: 6, rtl: -10 } }, // JQuery returns 5/5
                viewport: { top: 22, left: { ltr: 22, rtl: 364 - scrollBarWidth + leftScrollW } }
            },
            {
                id: 'relative-2',
                absolute: { top: 141, left: { ltr: 26, rtl: 400 - scrollBarWidth + leftScrollW } },
                relative: { top: 141, left: { ltr: 26, rtl: 400 - scrollBarWidth } }, // JQuery returns 141/26
                viewport: { top: 141, left: { ltr: 26, rtl: 400 - scrollBarWidth + leftScrollW } }
            },
            // This simulates a docked ego state for the toolbars
            {
                id: 'relative-toolbar-container',
                absolute: { top: 684, left: { ltr: 5, rtl: 395 - scrollBarWidth + leftScrollW } },
                relative: { top: 684, left: { ltr: 5, rtl: 395 - scrollBarWidth } },
                viewport: { top: 684, left: { ltr: 5, rtl: 395 - scrollBarWidth + leftScrollW } }
            },
            {
                id: 'relative-toolbar',
                absolute: { top: 684 - 40, left: { ltr: 5, rtl: 395 - scrollBarWidth + leftScrollW } },
                relative: { top: -40, left: { ltr: 0, rtl: 0 } },
                viewport: { top: 684 - 40, left: { ltr: 5, rtl: 395 - scrollBarWidth + leftScrollW } }
            }
        ];
        runChecks(doc, tests);
    };
    var staticChecks = function (doc) {
        var leftScrollW = leftScrollBarWidth(doc);
        var extraHeight = 230; // because all tests are in one page
        // GUESS: 1px differences from JQuery is due to the 1px margin on the body
        var tests = [
            {
                id: 'static-1',
                absolute: { top: extraHeight + 6, left: { ltr: 6, rtl: 380 - scrollBarWidth + leftScrollW } },
                relative: { top: extraHeight + 6, left: { ltr: 6, rtl: 380 - scrollBarWidth } }, // JQuery returns +6/6
                viewport: { top: extraHeight + 6, left: { ltr: 6, rtl: 380 - scrollBarWidth + leftScrollW } }
            },
            {
                id: 'static-1-1',
                absolute: { top: extraHeight + 14, left: { ltr: 14, rtl: 372 - scrollBarWidth + leftScrollW } },
                relative: { top: extraHeight + 14, left: { ltr: 14, rtl: 372 - scrollBarWidth } }, // JQuery returns +14/14
                viewport: { top: extraHeight + 14, left: { ltr: 14, rtl: 372 - scrollBarWidth + leftScrollW } }
            },
            {
                id: 'static-1-1-1',
                absolute: { top: extraHeight + 22, left: { ltr: 22, rtl: 364 - scrollBarWidth + leftScrollW } },
                relative: { top: extraHeight + 22, left: { ltr: 22, rtl: 364 - scrollBarWidth } }, // JQuery returns +22/22
                viewport: { top: extraHeight + 22, left: { ltr: 22, rtl: 364 - scrollBarWidth + leftScrollW } }
            },
            {
                id: 'static-2',
                absolute: { top: extraHeight + 121, left: { ltr: 6, rtl: 380 - scrollBarWidth + leftScrollW } },
                relative: { top: extraHeight + 121, left: { ltr: 6, rtl: 380 - scrollBarWidth } }, // JQuery returns +121/6
                viewport: { top: extraHeight + 121, left: { ltr: 6, rtl: 380 - scrollBarWidth + leftScrollW } }
            }
        ];
        runChecks(doc, tests);
    };
    var tableChecks = function (doc) {
        var extraHeight = 460; // because all tests are in one page
        var leftScrollW = leftScrollBarWidth(doc);
        // JQUERY BUG:
        // jQuery doesn't accept position:static elements as the offsetParent in relative calculations, so it uses the whole document.
        // We aren't replicating that.
        // GUESS: 1px differences from JQuery is due to the 1px margin on the body
        var tests = [
            {
                id: 'table-1',
                absolute: { top: extraHeight + 6, left: { ltr: 5, rtl: 171 - scrollBarWidth + leftScrollW } },
                relative: { top: extraHeight + 6, left: { ltr: 5, rtl: 171 - scrollBarWidth } },
                viewport: { top: extraHeight + 6, left: { ltr: 5, rtl: 171 - scrollBarWidth + leftScrollW } }
            },
            {
                id: 'th-1',
                absolute: { top: extraHeight + 10, left: { ltr: 9, rtl: 387 - scrollBarWidth + leftScrollW } },
                relative: { top: 4, left: { ltr: 4, rtl: 216 } }, // JQuery returns extraHeight + 11/10, but that's nonsense
                viewport: { top: extraHeight + 10, left: { ltr: 9, rtl: 387 - scrollBarWidth + leftScrollW } }
            },
            {
                id: 'th-3',
                absolute: { top: extraHeight + 10, left: { ltr: 221, rtl: 175 - scrollBarWidth + leftScrollW } },
                relative: { top: 4, left: { ltr: 216, rtl: 4 } }, // JQuery returns extraHeight + 11/222, but that's nonsense
                viewport: { top: extraHeight + 10, left: { ltr: 221, rtl: 175 - scrollBarWidth + leftScrollW } }
            },
            {
                id: 'td-1',
                absolute: { top: extraHeight + 116, left: { ltr: 9, rtl: 387 - scrollBarWidth + leftScrollW } },
                relative: { top: 110, left: { ltr: 4, rtl: 216 } }, // JQuery returns extraHeight + 117/10, but that's nonsense
                viewport: { top: extraHeight + 116, left: { ltr: 9, rtl: 387 - scrollBarWidth + leftScrollW } }
            },
            {
                id: 'td-3',
                absolute: { top: extraHeight + 116, left: { ltr: 221, rtl: 175 - scrollBarWidth + leftScrollW } },
                relative: { top: 110, left: { ltr: 216, rtl: 4 } }, // JQuery returns extraHeight + 117/222, but that's nonsense
                viewport: { top: extraHeight + 116, left: { ltr: 221, rtl: 175 - scrollBarWidth + leftScrollW } }
            }
        ];
        // Chrome has a weird 2px bug where the offsetTop of a table cell is 2px less than every other browser, even though
        // the difference between table.getBoundingClientRect() and cell.getBoundingClientRect() is correct.
        // I don't want to make every browser pay for Chrome's mistake in a scenario we don't need for TBIO, so we're living with it.
        // Firefox 71 has also started behaving the same as chrome but seems to be fixed in 124
        if (platform.browser.isChromium() || platform.browser.isFirefox() && platform.browser.version.major >= 71 && platform.browser.version.major < 124) {
            var chromeDifference_1 = -2;
            katamari_1.Arr.each(tests, function (t) {
                if (t.id !== 'table-1') {
                    // eslint-disable-next-line no-console
                    console.log('> Note - fix for Chrome bug - subtracting from relative top and left: ', chromeDifference_1);
                    t.relative.top += chromeDifference_1;
                    t.relative.left.ltr += chromeDifference_1;
                    t.relative.left.rtl += chromeDifference_1;
                }
            });
        }
        runChecks(doc, tests);
    };
    var fixedChecks = function (doc) {
        var leftScrollW = leftScrollBarWidth(doc);
        // GUESS: 1px differences from JQuery is due to the 1px margin on the body
        var noScroll = [
            {
                id: 'fixed-1',
                absolute: { top: 1, left: { ltr: 1, rtl: 1 + leftScrollW } },
                relative: { top: 1, left: { ltr: 1, rtl: 1 + leftScrollW } }, // JQuery returns 0/0
                viewport: { top: 1, left: { ltr: 1, rtl: 1 + leftScrollW } }
            },
            {
                id: 'fixed-2',
                absolute: { top: 21, left: { ltr: 21, rtl: 21 + leftScrollW } },
                relative: { top: 21, left: { ltr: 21, rtl: 21 + leftScrollW } }, // JQuery returns 20/20
                viewport: { top: 21, left: { ltr: 21, rtl: 21 + leftScrollW } }
            },
            {
                id: 'fixed-no-top-left',
                absolute: { top: 6, left: { ltr: 6, rtl: 380 - scrollBarWidth + leftScrollW } },
                relative: { top: 6, left: { ltr: 6, rtl: 380 - scrollBarWidth + leftScrollW } }, // JQuery returns 6/6
                viewport: { top: 6, left: { ltr: 6, rtl: 380 - scrollBarWidth + leftScrollW } }
            }
        ];
        // relative scroll
        var leftScroll = 1000;
        var topScroll = 2000;
        // GUESS: 1px differences from JQuery is due to the 1px margin on the body
        var withScroll = [
            {
                id: 'fixed-1',
                absolute: { top: topScroll + 1, left: { ltr: leftScroll + 1, rtl: 1 + leftScrollW } },
                relative: { top: 1, left: { ltr: 1, rtl: 1 + leftScrollW } }, // JQuery returns 0/0
                viewport: { top: 1, left: { ltr: 1, rtl: 1 + leftScrollW } }
            },
            {
                id: 'fixed-2',
                absolute: { top: topScroll + 21, left: { ltr: leftScroll + 21, rtl: 21 + leftScrollW } },
                relative: { top: 21, left: { ltr: 21, rtl: 21 + leftScrollW } }, // JQuery returns 20/20
                viewport: { top: 21, left: { ltr: 21, rtl: 21 + leftScrollW } }
            },
            {
                id: 'fixed-no-top-left',
                absolute: { top: topScroll + 6, left: { ltr: leftScroll + 6, rtl: 380 - scrollBarWidth + leftScrollW } },
                relative: { top: 6, left: { ltr: 6, rtl: 380 - scrollBarWidth + leftScrollW } }, // JQuery returns 6/6
                viewport: { top: 6, left: { ltr: 6, rtl: 380 - scrollBarWidth + leftScrollW } }
            }
        ];
        var afterSetPosition = [
            {
                id: 'fixed-no-top-left',
                absolute: { top: topScroll + 11, left: { ltr: leftScroll + 21, rtl: 21 + leftScrollW } },
                relative: { top: 11, left: { ltr: 21, rtl: 21 + leftScrollW } }, // JQuery returns 10/20
                viewport: { top: 11, left: { ltr: 21, rtl: 21 + leftScrollW } }
            }
        ];
        runChecks(doc, noScroll);
        var scr = Scroll.get(doc.rawDoc);
        bedrock_client_1.Assert.eq('expected 0, left is=' + scr.left, 0, scr.left);
        bedrock_client_1.Assert.eq('expected 0, top is ' + scr.top, 0, scr.top);
        Scroll.by(leftScroll, topScroll, doc.rawDoc);
        runChecks(doc, withScroll);
        Css.setAll(doc.byId('fixed-no-top-left'), { top: '10px', left: '20px' });
        runChecks(doc, afterSetPosition);
    };
    var bodyChecks = function (doc) {
        Scroll.to(1000, 1000, doc.rawDoc);
        var pos = SugarLocation.absolute(doc.body);
        bedrock_client_1.Assert.eq('', 0, pos.top);
        bedrock_client_1.Assert.eq('', 0, pos.left);
        pos = SugarLocation.relative(doc.body);
        bedrock_client_1.Assert.eq('', 0, pos.top);
        bedrock_client_1.Assert.eq('', 0, pos.left);
        pos = SugarLocation.viewport(doc.body);
        bedrock_client_1.Assert.eq('', 0, pos.top);
        bedrock_client_1.Assert.eq('', 0, pos.left);
    };
    /* Simple verification logic */
    var runChecks = function (doc, tests) {
        katamari_1.Arr.each(tests, function (t) {
            var div = doc.byId(t.id);
            var pos = SugarLocation.absolute(div);
            asserteq(t.absolute.top, pos.top, '.absolute().top  ' + t.id);
            asserteq(t.absolute.left[doc.dir], pos.left, '.absolute().left.' + doc.dir + ' ' + t.id);
            pos = SugarLocation.relative(div);
            asserteq(t.relative.top, pos.top, '.relative().top  ' + t.id);
            asserteq(t.relative.left[doc.dir], pos.left, '.relative().left.' + doc.dir + ' ' + t.id);
            pos = SugarLocation.viewport(div);
            asserteq(t.viewport.top, pos.top, '.viewport().top  ' + t.id);
            asserteq(t.viewport.left[doc.dir], pos.left, '.viewport().left.' + doc.dir + ' ' + t.id);
        });
    };
});
//# sourceMappingURL=LocationTest.js.map