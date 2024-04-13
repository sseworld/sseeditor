"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scrollBarWidth = exports.setToElement = exports.intoViewIfNeeded = exports.intoView = exports.capture = exports.preserve = exports.by = exports.to = exports.get = void 0;
var katamari_1 = require("@ssephox/katamari");
var sand_1 = require("@ssephox/sand");
var Insert = require("../dom/Insert");
var Remove = require("../dom/Remove");
var SugarBody = require("../node/SugarBody");
var SugarElement_1 = require("../node/SugarElement");
var SugarLocation = require("./SugarLocation");
var SugarPosition_1 = require("./SugarPosition");
// get scroll position (x,y) relative to document _doc (or global if not supplied)
var get = function (_DOC) {
    var doc = _DOC !== undefined ? _DOC.dom : document;
    // ASSUMPTION: This is for cross-browser support, body works for Safari & EDGE, and when we have an iframe body scroller
    var x = doc.body.scrollLeft || doc.documentElement.scrollLeft;
    var y = doc.body.scrollTop || doc.documentElement.scrollTop;
    return (0, SugarPosition_1.SugarPosition)(x, y);
};
exports.get = get;
// Scroll content to (x,y) relative to document _doc (or global if not supplied)
var to = function (x, y, _DOC) {
    var doc = _DOC !== undefined ? _DOC.dom : document;
    var win = doc.defaultView;
    if (win) {
        win.scrollTo(x, y);
    }
};
exports.to = to;
// Scroll content by (x,y) relative to document _doc (or global if not supplied)
var by = function (x, y, _DOC) {
    var doc = _DOC !== undefined ? _DOC.dom : document;
    var win = doc.defaultView;
    if (win) {
        win.scrollBy(x, y);
    }
};
exports.by = by;
// Set the window scroll position to the element
var setToElement = function (win, element) {
    var pos = SugarLocation.absolute(element);
    var doc = SugarElement_1.SugarElement.fromDom(win.document);
    to(pos.left, pos.top, doc);
};
exports.setToElement = setToElement;
// call f() preserving the original scroll position relative to document doc
var preserve = function (doc, f) {
    var before = get(doc);
    f();
    var after = get(doc);
    if (before.top !== after.top || before.left !== after.left) {
        to(before.left, before.top, doc);
    }
};
exports.preserve = preserve;
// capture the current scroll location and provide save and restore methods
var capture = function (doc) {
    var previous = katamari_1.Optional.none();
    var save = function () {
        previous = katamari_1.Optional.some(get(doc));
    };
    // TODO: this is quite similar to the code in nomad.
    var restore = function () {
        previous.each(function (p) {
            to(p.left, p.top, doc);
        });
    };
    save();
    return {
        save: save, /* Saves the current page scroll position */
        restore: restore /* Restores the page scroll to its former position when invoked */
    };
};
exports.capture = capture;
// TBIO-4472 Safari 10 - Scrolling typeahead with keyboard scrolls page
var intoView = function (element, alignToTop) {
    var isSafari = sand_1.PlatformDetection.detect().browser.isSafari();
    // this method isn't in TypeScript
    if (isSafari && katamari_1.Type.isFunction(element.dom.scrollIntoViewIfNeeded)) {
        element.dom.scrollIntoViewIfNeeded(false); // false=align to nearest edge
    }
    else {
        element.dom.scrollIntoView(alignToTop); // true=to top, false=to bottom
    }
};
exports.intoView = intoView;
// If the element is above the container, or below the container, then scroll to the top or bottom
var intoViewIfNeeded = function (element, container) {
    var containerBox = container.dom.getBoundingClientRect();
    var elementBox = element.dom.getBoundingClientRect();
    if (elementBox.top < containerBox.top) {
        // element top is above the viewport top, scroll so it's at the top
        intoView(element, true);
    }
    else if (elementBox.bottom > containerBox.bottom) {
        // element bottom is below the viewport bottom, scroll so it's at the bottom
        intoView(element, false);
    }
};
exports.intoViewIfNeeded = intoViewIfNeeded;
// Return the scroll bar width (calculated by temporarily inserting an element into the dom)
var scrollBarWidth = function () {
    // From https://davidwalsh.name/detect-scrollbar-width
    var scrollDiv = SugarElement_1.SugarElement.fromHtml('<div style="width: 100px; height: 100px; overflow: scroll; position: absolute; top: -9999px;"></div>');
    Insert.after(SugarBody.body(), scrollDiv);
    var w = scrollDiv.dom.offsetWidth - scrollDiv.dom.clientWidth;
    Remove.remove(scrollDiv);
    return w;
};
exports.scrollBarWidth = scrollBarWidth;
//# sourceMappingURL=Scroll.js.map