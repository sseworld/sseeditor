"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttributeProperty = void 0;
var Attribute = require("./Attribute");
var AttributeProperty = function (attribute, value) {
    var is = function (element) {
        return Attribute.get(element, attribute) === value;
    };
    var remove = function (element) {
        return Attribute.remove(element, attribute);
    };
    var set = function (element) {
        return Attribute.set(element, attribute, value);
    };
    return {
        is: is,
        remove: remove,
        set: set
    };
};
exports.AttributeProperty = AttributeProperty;
//# sourceMappingURL=AttributeProperty.js.map