"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.supports = exports.toggle = exports.remove = exports.add = exports.get = void 0;
var katamari_1 = require("@ssephox/katamari");
var AttrList = require("../api/properties/AttrList");
// IE11 Can return undefined for a classList on elements such as math, so we make sure it's not undefined before attempting to use it.
var supports = function (element) { return element.dom.classList !== undefined; };
exports.supports = supports;
var get = function (element) { return AttrList.read(element, 'class'); };
exports.get = get;
var add = function (element, clazz) { return AttrList.add(element, 'class', clazz); };
exports.add = add;
var remove = function (element, clazz) { return AttrList.remove(element, 'class', clazz); };
exports.remove = remove;
var toggle = function (element, clazz) {
    if (katamari_1.Arr.contains(get(element), clazz)) {
        return remove(element, clazz);
    }
    else {
        return add(element, clazz);
    }
};
exports.toggle = toggle;
//# sourceMappingURL=ClassList.js.map