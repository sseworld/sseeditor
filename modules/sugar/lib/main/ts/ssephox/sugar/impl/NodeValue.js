"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeValue = void 0;
var katamari_1 = require("@ssephox/katamari");
var NodeValue = function (is, name) {
    var get = function (element) {
        if (!is(element)) {
            throw new Error('Can only get ' + name + ' value of a ' + name + ' node');
        }
        return getOption(element).getOr('');
    };
    var getOption = function (element) {
        return is(element) ? katamari_1.Optional.from(element.dom.nodeValue) : katamari_1.Optional.none();
    };
    var set = function (element, value) {
        if (!is(element)) {
            throw new Error('Can only set raw ' + name + ' value of a ' + name + ' node');
        }
        element.dom.nodeValue = value;
    };
    return {
        get: get,
        getOption: getOption,
        set: set
    };
};
exports.NodeValue = NodeValue;
//# sourceMappingURL=NodeValue.js.map