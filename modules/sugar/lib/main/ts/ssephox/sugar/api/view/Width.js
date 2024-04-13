"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setMax = exports.getRuntime = exports.getOuter = exports.getInner = exports.get = exports.set = void 0;
var Dimension_1 = require("../../impl/Dimension");
var RuntimeSize = require("../../impl/RuntimeSize");
var Css = require("../properties/Css");
var api = (0, Dimension_1.Dimension)('width', function (element) {
    // IMO passing this function is better than using dom['offset' + 'width']
    return element.dom.offsetWidth;
});
var set = function (element, h) { return api.set(element, h); };
exports.set = set;
var get = function (element) { return api.get(element); };
exports.get = get;
var getOuter = function (element) { return api.getOuter(element); };
exports.getOuter = getOuter;
var getInner = RuntimeSize.getInnerWidth;
exports.getInner = getInner;
var getRuntime = RuntimeSize.getWidth;
exports.getRuntime = getRuntime;
var setMax = function (element, value) {
    // These properties affect the absolute max-height, they are not counted natively, we want to include these properties.
    var inclusions = ['margin-left', 'border-left-width', 'padding-left', 'padding-right', 'border-right-width', 'margin-right'];
    var absMax = api.max(element, value, inclusions);
    Css.set(element, 'max-width', absMax + 'px');
};
exports.setMax = setMax;
//# sourceMappingURL=Width.js.map