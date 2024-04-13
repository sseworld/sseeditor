"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDirection = exports.onDirection = void 0;
var Css = require("./Css");
var onDirection = function (isLtr, isRtl) { return function (element) {
    return getDirection(element) === 'rtl' ? isRtl : isLtr;
}; };
exports.onDirection = onDirection;
var getDirection = function (element) {
    return Css.get(element, 'direction') === 'rtl' ? 'rtl' : 'ltr';
};
exports.getDirection = getDirection;
//# sourceMappingURL=Direction.js.map