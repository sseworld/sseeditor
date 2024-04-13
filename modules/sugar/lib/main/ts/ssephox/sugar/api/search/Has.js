"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.descendant = exports.child = exports.sibling = exports.anyAncestor = exports.ancestor = void 0;
var katamari_1 = require("@ssephox/katamari");
var Compare = require("../dom/Compare");
var PredicateExists = require("./PredicateExists");
var ancestor = function (element, target) {
    return PredicateExists.ancestor(element, katamari_1.Fun.curry(Compare.eq, target));
};
exports.ancestor = ancestor;
var anyAncestor = function (element, targets) {
    return katamari_1.Arr.exists(targets, function (target) { return ancestor(element, target); });
};
exports.anyAncestor = anyAncestor;
var sibling = function (element, targets) {
    return PredicateExists.sibling(element, function (elem) { return katamari_1.Arr.exists(targets, katamari_1.Fun.curry(Compare.eq, elem)); });
};
exports.sibling = sibling;
var child = function (element, target) {
    return PredicateExists.child(element, katamari_1.Fun.curry(Compare.eq, target));
};
exports.child = child;
var descendant = function (element, target) {
    return PredicateExists.descendant(element, katamari_1.Fun.curry(Compare.eq, target));
};
exports.descendant = descendant;
//# sourceMappingURL=Has.js.map