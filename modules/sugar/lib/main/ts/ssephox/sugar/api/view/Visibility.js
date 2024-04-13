"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isVisible = exports.displayToggler = exports.toggler = void 0;
var katamari_1 = require("@ssephox/katamari");
var Css = require("../properties/Css");
var Toggler_1 = require("../properties/Toggler");
// This function is dangerous. Toggle behaviour is different depending on whether the element is in the DOM or not when it's created.
var visibilityToggler = function (element, property, hiddenValue, visibleValue) {
    var initial = Css.get(element, property);
    // old jquery-ism that this function depends on
    if (initial === undefined) {
        initial = '';
    }
    var value = initial === hiddenValue ? visibleValue : hiddenValue;
    var off = katamari_1.Fun.curry(Css.set, element, property, initial);
    var on = katamari_1.Fun.curry(Css.set, element, property, value);
    return (0, Toggler_1.Toggler)(off, on, false);
};
var toggler = function (element) {
    return visibilityToggler(element, 'visibility', 'hidden', 'visible');
};
exports.toggler = toggler;
var displayToggler = function (element, value) {
    return visibilityToggler(element, 'display', 'none', value);
};
exports.displayToggler = displayToggler;
var isHidden = function (dom) {
    return dom.offsetWidth <= 0 && dom.offsetHeight <= 0;
};
var isVisible = function (element) {
    return !isHidden(element.dom);
};
exports.isVisible = isVisible;
//# sourceMappingURL=Visibility.js.map