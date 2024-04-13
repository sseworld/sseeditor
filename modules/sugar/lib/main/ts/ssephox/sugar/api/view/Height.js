"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setMax = exports.getRuntime = exports.getOuter = exports.getInner = exports.get = exports.set = void 0;
var Dimension_1 = require("../../impl/Dimension");
var RuntimeSize = require("../../impl/RuntimeSize");
var SugarBody = require("../node/SugarBody");
var Css = require("../properties/Css");
var api = (0, Dimension_1.Dimension)('height', function (element) {
    // getBoundingClientRect gives better results than offsetHeight for tables with captions on Firefox
    var dom = element.dom;
    return SugarBody.inBody(element) ? dom.getBoundingClientRect().height : dom.offsetHeight;
});
var set = function (element, h) { return api.set(element, h); };
exports.set = set;
var get = function (element) { return api.get(element); };
exports.get = get;
var getOuter = function (element) { return api.getOuter(element); };
exports.getOuter = getOuter;
var getInner = RuntimeSize.getInnerHeight;
exports.getInner = getInner;
var getRuntime = RuntimeSize.getHeight;
exports.getRuntime = getRuntime;
var setMax = function (element, value) {
    // These properties affect the absolute max-height, they are not counted natively, we want to include these properties.
    var inclusions = ['margin-top', 'border-top-width', 'padding-top', 'padding-bottom', 'border-bottom-width', 'margin-bottom'];
    var absMax = api.max(element, value, inclusions);
    Css.set(element, 'max-height', absMax + 'px');
};
exports.setMax = setMax;
//# sourceMappingURL=Height.js.map