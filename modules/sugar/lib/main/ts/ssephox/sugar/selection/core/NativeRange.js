"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toString = exports.isWithin = exports.getBounds = exports.getFirstRect = exports.cloneFragment = exports.deleteContents = exports.exactToNative = exports.relativeToNative = exports.selectNodeContentsUsing = exports.selectNodeContents = exports.selectNode = exports.replaceWith = exports.create = void 0;
var katamari_1 = require("@ssephox/katamari");
var SugarElement_1 = require("../../api/node/SugarElement");
var selectNode = function (win, element) {
    var rng = win.document.createRange();
    rng.selectNode(element.dom);
    return rng;
};
exports.selectNode = selectNode;
var selectNodeContents = function (win, element) {
    var rng = win.document.createRange();
    selectNodeContentsUsing(rng, element);
    return rng;
};
exports.selectNodeContents = selectNodeContents;
var selectNodeContentsUsing = function (rng, element) {
    return rng.selectNodeContents(element.dom);
};
exports.selectNodeContentsUsing = selectNodeContentsUsing;
var isWithin = function (outerRange, innerRange) {
    // Adapted from: http://stackoverflow.com/questions/5605401/insert-link-in-contenteditable-element
    return innerRange.compareBoundaryPoints(outerRange.END_TO_START, outerRange) < 1 && innerRange.compareBoundaryPoints(outerRange.START_TO_END, outerRange) > -1;
};
exports.isWithin = isWithin;
var create = function (win) {
    return win.document.createRange();
};
exports.create = create;
// NOTE: Mutates the range.
var setStart = function (rng, situ) {
    situ.fold(function (e) {
        rng.setStartBefore(e.dom);
    }, function (e, o) {
        rng.setStart(e.dom, o);
    }, function (e) {
        rng.setStartAfter(e.dom);
    });
};
var setFinish = function (rng, situ) {
    situ.fold(function (e) {
        rng.setEndBefore(e.dom);
    }, function (e, o) {
        rng.setEnd(e.dom, o);
    }, function (e) {
        rng.setEndAfter(e.dom);
    });
};
var replaceWith = function (rng, fragment) {
    // Note: this document fragment approach may not work on IE9.
    deleteContents(rng);
    rng.insertNode(fragment.dom);
};
exports.replaceWith = replaceWith;
var relativeToNative = function (win, startSitu, finishSitu) {
    var range = win.document.createRange();
    setStart(range, startSitu);
    setFinish(range, finishSitu);
    return range;
};
exports.relativeToNative = relativeToNative;
var exactToNative = function (win, start, soffset, finish, foffset) {
    var rng = win.document.createRange();
    rng.setStart(start.dom, soffset);
    rng.setEnd(finish.dom, foffset);
    return rng;
};
exports.exactToNative = exactToNative;
var deleteContents = function (rng) {
    rng.deleteContents();
};
exports.deleteContents = deleteContents;
var cloneFragment = function (rng) {
    var fragment = rng.cloneContents();
    return SugarElement_1.SugarElement.fromDom(fragment);
};
exports.cloneFragment = cloneFragment;
var toRect = function (rect) { return ({
    left: rect.left,
    top: rect.top,
    right: rect.right,
    bottom: rect.bottom,
    width: rect.width,
    height: rect.height
}); };
var getFirstRect = function (rng) {
    var rects = rng.getClientRects();
    // ASSUMPTION: The first rectangle is the start of the selection
    var rect = rects.length > 0 ? rects[0] : rng.getBoundingClientRect();
    return rect.width > 0 || rect.height > 0 ? katamari_1.Optional.some(rect).map(toRect) : katamari_1.Optional.none();
};
exports.getFirstRect = getFirstRect;
var getBounds = function (rng) {
    var rect = rng.getBoundingClientRect();
    return rect.width > 0 || rect.height > 0 ? katamari_1.Optional.some(rect).map(toRect) : katamari_1.Optional.none();
};
exports.getBounds = getBounds;
var toString = function (rng) { return rng.toString(); };
exports.toString = toString;
//# sourceMappingURL=NativeRange.js.map