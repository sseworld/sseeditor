"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.descendant = exports.child = exports.sibling = exports.closest = exports.ancestor = exports.any = void 0;
var PredicateFind = require("./PredicateFind");
var any = function (predicate) {
    return PredicateFind.first(predicate).isSome();
};
exports.any = any;
var ancestor = function (scope, predicate, isRoot) {
    return PredicateFind.ancestor(scope, predicate, isRoot).isSome();
};
exports.ancestor = ancestor;
var closest = function (scope, predicate, isRoot) {
    return PredicateFind.closest(scope, predicate, isRoot).isSome();
};
exports.closest = closest;
var sibling = function (scope, predicate) {
    return PredicateFind.sibling(scope, predicate).isSome();
};
exports.sibling = sibling;
var child = function (scope, predicate) {
    return PredicateFind.child(scope, predicate).isSome();
};
exports.child = child;
var descendant = function (scope, predicate) {
    return PredicateFind.descendant(scope, predicate).isSome();
};
exports.descendant = descendant;
//# sourceMappingURL=PredicateExists.js.map