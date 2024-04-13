"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.focusInside = exports.search = exports.active = exports.blur = exports.focus = exports.hasFocus = void 0;
var katamari_1 = require("@ssephox/katamari");
var SugarDocument = require("../node/SugarDocument");
var SugarElement_1 = require("../node/SugarElement");
var SugarShadowDom = require("../node/SugarShadowDom");
var focus = function (element, preventScroll) {
    if (preventScroll === void 0) { preventScroll = false; }
    return element.dom.focus({ preventScroll: preventScroll });
};
exports.focus = focus;
var blur = function (element) {
    return element.dom.blur();
};
exports.blur = blur;
var hasFocus = function (element) {
    var root = SugarShadowDom.getRootNode(element).dom;
    return element.dom === root.activeElement;
};
exports.hasFocus = hasFocus;
// Note: assuming that activeElement will always be a HTMLElement (maybe we should add a runtime check?)
var active = function (root) {
    if (root === void 0) { root = SugarDocument.getDocument(); }
    return katamari_1.Optional.from(root.dom.activeElement).map(SugarElement_1.SugarElement.fromDom);
};
exports.active = active;
/** Focus the specified element, unless one of its descendents already has focus. */
var focusInside = function (element) {
    var alreadyFocusedInside = search(element).isSome();
    if (!alreadyFocusedInside) {
        focus(element);
    }
};
exports.focusInside = focusInside;
/**
 * Return the descendant element that has focus.
 * Use instead of SelectorFind.descendant(container, ':focus')
 *  because the :focus selector relies on keyboard focus.
 */
var search = function (element) {
    return active(SugarShadowDom.getRootNode(element))
        .filter(function (e) { return element.dom.contains(e.dom); });
};
exports.search = search;
//# sourceMappingURL=Focus.js.map