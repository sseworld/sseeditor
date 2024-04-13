"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.set = exports.isEditable = exports.closest = exports.getRaw = exports.get = void 0;
var katamari_1 = require("@ssephox/katamari");
var SugarBody = require("../node/SugarBody");
var SelectorFind = require("../search/SelectorFind");
var closest = function (target) {
    return SelectorFind.closest(target, '[contenteditable]');
};
exports.closest = closest;
var isEditable = function (element, assumeEditable) {
    if (assumeEditable === void 0) { assumeEditable = false; }
    if (SugarBody.inBody(element)) {
        return element.dom.isContentEditable;
    }
    else {
        // Find the closest contenteditable element and check if it's editable
        return closest(element).fold(katamari_1.Fun.constant(assumeEditable), function (editable) { return getRaw(editable) === 'true'; });
    }
};
exports.isEditable = isEditable;
var getRaw = function (element) {
    return element.dom.contentEditable;
};
exports.getRaw = getRaw;
var get = function (element) {
    return isEditable(element, false);
};
exports.get = get;
var set = function (element, editable) {
    element.dom.contentEditable = editable ? 'true' : 'false';
};
exports.set = set;
//# sourceMappingURL=ContentEditable.js.map