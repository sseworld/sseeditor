"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.find = exports.set = exports.get = void 0;
var SelectorFind = require("../search/SelectorFind");
var set = function (element, status) {
    element.dom.checked = status;
};
exports.set = set;
var get = function (element) {
    return element.dom.checked;
};
exports.get = get;
// :checked selector requires IE9
// http://www.quirksmode.org/css/selectors/#t60
var find = function (parent) {
    return SelectorFind.descendant(parent, 'input:checked');
};
exports.find = find;
//# sourceMappingURL=Checked.js.map