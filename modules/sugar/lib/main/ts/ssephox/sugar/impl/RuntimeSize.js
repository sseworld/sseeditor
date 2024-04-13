"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWidth = exports.getHeight = exports.getInnerWidth = exports.getInnerHeight = void 0;
var katamari_1 = require("@ssephox/katamari");
var Css = require("../api/properties/Css");
var toNumber = function (px, fallback) {
    return katamari_1.Strings.toFloat(px).getOr(fallback);
};
var getProp = function (element, name, fallback) {
    return toNumber(Css.get(element, name), fallback);
};
var calcContentBoxSize = function (element, size, upper, lower) {
    var paddingUpper = getProp(element, "padding-".concat(upper), 0);
    var paddingLower = getProp(element, "padding-".concat(lower), 0);
    var borderUpper = getProp(element, "border-".concat(upper, "-width"), 0);
    var borderLower = getProp(element, "border-".concat(lower, "-width"), 0);
    return size - paddingUpper - paddingLower - borderUpper - borderLower;
};
var getCalculatedHeight = function (element, boxSizing) {
    var dom = element.dom;
    var height = dom.getBoundingClientRect().height || dom.offsetHeight;
    return boxSizing === 'border-box' ? height : calcContentBoxSize(element, height, 'top', 'bottom');
};
var getCalculatedWidth = function (element, boxSizing) {
    var dom = element.dom;
    var width = dom.getBoundingClientRect().width || dom.offsetWidth;
    return boxSizing === 'border-box' ? width : calcContentBoxSize(element, width, 'left', 'right');
};
var getHeight = function (element) {
    return getProp(element, 'height', element.dom.offsetHeight);
};
exports.getHeight = getHeight;
var getWidth = function (element) {
    return getProp(element, 'width', element.dom.offsetWidth);
};
exports.getWidth = getWidth;
var getInnerHeight = function (element) {
    return getCalculatedHeight(element, 'content-box');
};
exports.getInnerHeight = getInnerHeight;
var getInnerWidth = function (element) {
    return getCalculatedWidth(element, 'content-box');
};
exports.getInnerWidth = getInnerWidth;
//# sourceMappingURL=RuntimeSize.js.map