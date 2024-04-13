"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.is = exports.contains = exports.member = exports.isEqualNode = exports.eq = void 0;
var katamari_1 = require("@ssephox/katamari");
var Selectors = require("../search/Selectors");
var eq = function (e1, e2) {
    return e1.dom === e2.dom;
};
exports.eq = eq;
var isEqualNode = function (e1, e2) {
    return e1.dom.isEqualNode(e2.dom);
};
exports.isEqualNode = isEqualNode;
var member = function (element, elements) {
    return katamari_1.Arr.exists(elements, katamari_1.Fun.curry(eq, element));
};
exports.member = member;
// Returns: true if node e1 contains e2, otherwise false.
// (returns false if e1===e2: A node does not contain itself).
var contains = function (e1, e2) {
    var d1 = e1.dom;
    var d2 = e2.dom;
    return d1 === d2 ? false : d1.contains(d2);
};
exports.contains = contains;
var is = Selectors.is;
exports.is = is;
//# sourceMappingURL=Compare.js.map