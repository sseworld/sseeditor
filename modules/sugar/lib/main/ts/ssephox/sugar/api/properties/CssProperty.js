"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CssProperty = void 0;
var Css = require("./Css");
var CssProperty = function (property, value) {
    var is = function (element) {
        return Css.get(element, property) === value;
    };
    var remove = function (element) {
        return Css.remove(element, property);
    };
    var set = function (element) {
        return Css.set(element, property, value);
    };
    return {
        is: is,
        remove: remove,
        set: set
    };
};
exports.CssProperty = CssProperty;
//# sourceMappingURL=CssProperty.js.map