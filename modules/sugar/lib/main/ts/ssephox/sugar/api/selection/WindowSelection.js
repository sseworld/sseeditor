"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCollapsed = exports.getAsString = exports.findWithin = exports.getAtPoint = exports.getBounds = exports.getFirstRect = exports.forElement = exports.deleteAt = exports.replace = exports.clone = exports.clear = exports.setToElement = exports.toNative = exports.setRelative = exports.get = exports.getExact = exports.setExact = void 0;
var katamari_1 = require("@ssephox/katamari");
var NativeRange = require("../../selection/core/NativeRange");
var SelectionDirection = require("../../selection/core/SelectionDirection");
var CaretRange = require("../../selection/query/CaretRange");
var Within = require("../../selection/query/Within");
var Prefilter = require("../../selection/quirks/Prefilter");
var Compare = require("../dom/Compare");
var DocumentPosition = require("../dom/DocumentPosition");
var SugarElement_1 = require("../node/SugarElement");
var SugarFragment = require("../node/SugarFragment");
var SimRange_1 = require("./SimRange");
var SimSelection_1 = require("./SimSelection");
var getNativeSelection = function (win) { return katamari_1.Optional.from(win.getSelection()); };
var doSetNativeRange = function (win, rng) {
    getNativeSelection(win).each(function (selection) {
        selection.removeAllRanges();
        selection.addRange(rng);
    });
};
var doSetRange = function (win, start, soffset, finish, foffset) {
    var rng = NativeRange.exactToNative(win, start, soffset, finish, foffset);
    doSetNativeRange(win, rng);
};
var findWithin = function (win, selection, selector) {
    return Within.find(win, selection, selector);
};
exports.findWithin = findWithin;
var setLegacyRtlRange = function (win, selection, start, soffset, finish, foffset) {
    selection.collapse(start.dom, soffset);
    selection.extend(finish.dom, foffset);
};
var setRangeFromRelative = function (win, relative) {
    return SelectionDirection.diagnose(win, relative).match({
        ltr: function (start, soffset, finish, foffset) {
            doSetRange(win, start, soffset, finish, foffset);
        },
        rtl: function (start, soffset, finish, foffset) {
            getNativeSelection(win).each(function (selection) {
                // If this selection is backwards, then we need to use extend.
                if (selection.setBaseAndExtent) {
                    selection.setBaseAndExtent(start.dom, soffset, finish.dom, foffset);
                }
                else if (selection.extend) {
                    // This try catch is for older browsers (Firefox 52) as they're sometimes unable to handle setting backwards selections using selection.extend and error out.
                    try {
                        setLegacyRtlRange(win, selection, start, soffset, finish, foffset);
                    }
                    catch (e) {
                        // If it does fail, try again with ltr.
                        doSetRange(win, finish, foffset, start, soffset);
                    }
                }
                else {
                    doSetRange(win, finish, foffset, start, soffset);
                }
            });
        }
    });
};
var setExact = function (win, start, soffset, finish, foffset) {
    var relative = Prefilter.preprocessExact(start, soffset, finish, foffset);
    setRangeFromRelative(win, relative);
};
exports.setExact = setExact;
var setRelative = function (win, startSitu, finishSitu) {
    var relative = Prefilter.preprocessRelative(startSitu, finishSitu);
    setRangeFromRelative(win, relative);
};
exports.setRelative = setRelative;
var toNative = function (selection) {
    var win = SimSelection_1.SimSelection.getWin(selection).dom;
    var getDomRange = function (start, soffset, finish, foffset) { return NativeRange.exactToNative(win, start, soffset, finish, foffset); };
    var filtered = Prefilter.preprocess(selection);
    return SelectionDirection.diagnose(win, filtered).match({
        ltr: getDomRange,
        rtl: getDomRange
    });
};
exports.toNative = toNative;
// NOTE: We are still reading the range because it gives subtly different behaviour
// than using the anchorNode and focusNode. I'm not sure if this behaviour is any
// better or worse; it's just different.
var readRange = function (selection) {
    if (selection.rangeCount > 0) {
        var firstRng = selection.getRangeAt(0);
        var lastRng = selection.getRangeAt(selection.rangeCount - 1);
        return katamari_1.Optional.some(SimRange_1.SimRange.create(SugarElement_1.SugarElement.fromDom(firstRng.startContainer), firstRng.startOffset, SugarElement_1.SugarElement.fromDom(lastRng.endContainer), lastRng.endOffset));
    }
    else {
        return katamari_1.Optional.none();
    }
};
var doGetExact = function (selection) {
    if (selection.anchorNode === null || selection.focusNode === null) {
        return readRange(selection);
    }
    else {
        var anchor = SugarElement_1.SugarElement.fromDom(selection.anchorNode);
        var focus_1 = SugarElement_1.SugarElement.fromDom(selection.focusNode);
        // if this returns true anchor is _after_ focus, so we need a custom selection object to maintain the RTL selection
        return DocumentPosition.after(anchor, selection.anchorOffset, focus_1, selection.focusOffset) ? katamari_1.Optional.some(SimRange_1.SimRange.create(anchor, selection.anchorOffset, focus_1, selection.focusOffset)) : readRange(selection);
    }
};
var setToElement = function (win, element, selectNodeContents) {
    if (selectNodeContents === void 0) { selectNodeContents = true; }
    var rngGetter = selectNodeContents ? NativeRange.selectNodeContents : NativeRange.selectNode;
    var rng = rngGetter(win, element);
    doSetNativeRange(win, rng);
};
exports.setToElement = setToElement;
var forElement = function (win, element) {
    var rng = NativeRange.selectNodeContents(win, element);
    return SimRange_1.SimRange.create(SugarElement_1.SugarElement.fromDom(rng.startContainer), rng.startOffset, SugarElement_1.SugarElement.fromDom(rng.endContainer), rng.endOffset);
};
exports.forElement = forElement;
var getExact = function (win) {
    // We want to retrieve the selection as it is.
    return getNativeSelection(win)
        .filter(function (sel) { return sel.rangeCount > 0; })
        .bind(doGetExact);
};
exports.getExact = getExact;
// TODO: Test this.
var get = function (win) {
    return getExact(win).map(function (range) { return SimSelection_1.SimSelection.exact(range.start, range.soffset, range.finish, range.foffset); });
};
exports.get = get;
var getFirstRect = function (win, selection) {
    var rng = SelectionDirection.asLtrRange(win, selection);
    return NativeRange.getFirstRect(rng);
};
exports.getFirstRect = getFirstRect;
var getBounds = function (win, selection) {
    var rng = SelectionDirection.asLtrRange(win, selection);
    return NativeRange.getBounds(rng);
};
exports.getBounds = getBounds;
var getAtPoint = function (win, x, y) {
    return CaretRange.fromPoint(win, x, y);
};
exports.getAtPoint = getAtPoint;
var getAsString = function (win, selection) {
    var rng = SelectionDirection.asLtrRange(win, selection);
    return NativeRange.toString(rng);
};
exports.getAsString = getAsString;
var clear = function (win) {
    getNativeSelection(win).each(function (selection) { return selection.removeAllRanges(); });
};
exports.clear = clear;
var clone = function (win, selection) {
    var rng = SelectionDirection.asLtrRange(win, selection);
    return NativeRange.cloneFragment(rng);
};
exports.clone = clone;
var replace = function (win, selection, elements) {
    var rng = SelectionDirection.asLtrRange(win, selection);
    var fragment = SugarFragment.fromElements(elements, win.document);
    NativeRange.replaceWith(rng, fragment);
};
exports.replace = replace;
var deleteAt = function (win, selection) {
    var rng = SelectionDirection.asLtrRange(win, selection);
    NativeRange.deleteContents(rng);
};
exports.deleteAt = deleteAt;
var isCollapsed = function (start, soffset, finish, foffset) {
    return Compare.eq(start, finish) && soffset === foffset;
};
exports.isCollapsed = isCollapsed;
//# sourceMappingURL=WindowSelection.js.map