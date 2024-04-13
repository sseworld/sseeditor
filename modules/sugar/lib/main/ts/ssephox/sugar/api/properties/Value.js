"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = exports.set = void 0;
var get = function (element) {
    return element.dom.value;
};
exports.get = get;
var set = function (element, value) {
    if (value === undefined) {
        throw new Error('Value.set was undefined');
    }
    element.dom.value = value;
};
exports.set = set;
//# sourceMappingURL=Value.js.map