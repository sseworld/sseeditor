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
var Scroll = require("ssephox/sugar/api/view/Scroll");
var SugarLocation = require("ssephox/sugar/api/view/SugarLocation");
var Width = require("ssephox/sugar/api/view/Width");
bedrock_client_1.UnitTest.asynctest('ScrollTest', function (success, failure) {
    var platform = sand_1.PlatformDetection.detect();
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
                    html: html,
                    rtl: iframeDoc_1.body.dir === 'rtl',
                    dir: Attribute.get(body, 'dir') || 'ltr',
                    byId: function (str) {
                        return katamari_1.Optional.from(iframeDoc_1.getElementById(str))
                            .map(SugarElement_1.SugarElement.fromDom)
                            .getOrDie('cannot find element with id ' + str);
                    }
                };
                runTests(doc);
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
    var ifr = '<iframe src="/project/@ephox/sugar/src/test/data/scrollTest.html"></iframe>';
    testOne(ifr, {
        iframe: { id: 'vanilla', style: 'height:200px; width:500px; border: 7px dotted chartreuse;' },
        html: katamari_1.Optional.none(),
        body: katamari_1.Optional.some({ contenteditable: 'true', style: 'margin: 0; padding: 5px;' })
    }, function () {
        testOne(ifr, {
            iframe: { id: 'rtl', style: 'height:200px; width:500px; border: 7px solid blueviolet;' },
            html: katamari_1.Optional.none(),
            body: katamari_1.Optional.some({ dir: 'rtl', contenteditable: 'true', style: 'margin: 0; padding: 5px;' })
        }, success);
    });
    var within = function (a, b, eps) { return Math.abs(a - b) <= eps; };
    // check current scroll position is at (x,y) (or within +/- (epsX, epsY))
    var scrollCheck = function (x, y, epsX, epsY, doc, msg) {
        Css.reflow(doc.body);
        var scr = Scroll.get(doc.rawDoc);
        bedrock_client_1.Assert.eq(msg + ' (' + doc.dir + ') Expected scrollCheck x=' + x + ', got=' + scr.left + ', eps=' + epsX, true, within(x, scr.left, epsX));
        bedrock_client_1.Assert.eq(msg + ' (' + doc.dir + ') Expected scrollCheck y=' + y + ', got=' + scr.top + ', eps=' + epsY, true, within(y, scr.top, epsY));
    };
    // scroll to (x,y) and check position
    var scrollTo = function (x, y, doc) {
        Scroll.to(x, y, doc.rawDoc);
        scrollCheck(x, y, 0, 0, doc, 'scrollTo(' + x + ',' + y + ')');
    };
    // set the scroll to location of element 'el' and check position
    var setToElement = function (doc, el, x, y, epsX, epsY, msg) {
        Scroll.setToElement(doc.rawWin, el);
        scrollCheck(x, y, epsX, epsY, doc, msg);
    };
    var scrollBy = function (x, y, doc, msg) {
        var scr0 = Scroll.get(doc.rawDoc);
        Scroll.by(x, y, doc.rawDoc);
        scrollCheck(scr0.left + x, scr0.top + y, 0, 0, doc, 'scrollBy(' + x + ',' + y + '): ' + msg);
    };
    var runTests = function (doc) {
        var mar0 = Css.get(doc.html, 'margin');
        var bod0 = Css.get(doc.body, 'border');
        var bodyBorder = parseInt(bod0 || '', 10) || 0;
        var mar = parseInt(mar0 || '', 10) || 0;
        var hgt = doc.body.dom.scrollHeight;
        var scrollBarWidth = Scroll.scrollBarWidth();
        var cEl = doc.byId('centre1');
        var center = SugarLocation.absolute(cEl);
        var cX = Math.round(center.left);
        var cY = Math.round(center.top);
        // TINY-9203: due to Win11 FF adopting native hidden scrollbar behavior and current inability to distinguish between Win10 and Win11
        // (both os.version.major === 10), allow scrollbar to be either hidden or visible when on Win10/11 FF
        var noVisibleScrollbarBrowser = platform.os.isMacOS() || (platform.browser.isFirefox() && platform.os.isLinux()) || (platform.browser.isFirefox() && platform.os.isWindows() && platform.os.version.major >= 10);
        bedrock_client_1.Assert.eq('scroll bar width, got=' + scrollBarWidth, true, scrollBarWidth > 5 && scrollBarWidth < 50 || (noVisibleScrollbarBrowser && scrollBarWidth === 0));
        scrollCheck(0, 0, 0, 0, doc, 'start pos');
        var cPos = SugarLocation.absolute(cEl);
        setToElement(doc, cEl, cPos.left, cPos.top, 1, 1, 'set to centre el');
        // scroll text of the centre cell into view (right-aligned in RTL mode)
        var x = cX + (doc.rtl ? (Width.get(cEl) - Width.get(doc.iframe)) : 0);
        scrollTo(x, cY, doc); // scroll back to centre
        scrollBy(-50, 30, doc, 'scrollBy/1');
        scrollBy(50, -30, doc, 'scrollBy/2');
        scrollCheck(x, cY, 0, 0, doc, 'reset/2');
        // scroll to top el
        var pos = SugarLocation.absolute(doc.byId('top1'));
        setToElement(doc, doc.byId('top1'), pos.left, pos.top, 0, 0, 'set to top');
        scrollTo(x, cY, doc); // scroll back to centre
        // scroll to bottom el
        var bot1Pos = SugarLocation.absolute(doc.byId('top1'));
        var bot = hgt + 2 * bodyBorder + 2 * mar - (doc.rawWin.innerHeight - scrollBarWidth); // content height minus viewport-excluding-the-bottom-scrollbar
        setToElement(doc, doc.byId('bot1'), bot1Pos.left, bot, 0, 20, 'set to bottom');
        scrollTo(x, cY, doc); // scroll back to centre
        Scroll.preserve(doc.rawDoc, function () {
            scrollBy(100, 100, doc, 'scroll 1'); // scroll some where else
        });
        scrollCheck(x, cY, 0, 0, doc, 'preserve'); // scroll back at centre
        var c1 = Scroll.capture(doc.rawDoc);
        scrollBy(100, 100, doc, 'scroll 2'); // scroll some where else
        c1.restore();
        scrollCheck(x, cY, 0, 0, doc, 'restore #1');
        scrollBy(-100, -100, doc, 'scroll 3');
        c1.save();
        scrollBy(50, 50, doc, 'scroll 4');
        c1.restore();
        scrollCheck(x - 100, cY - 100, 0, 0, doc, 'restore #2');
    };
});
//# sourceMappingURL=ScrollTest.js.map