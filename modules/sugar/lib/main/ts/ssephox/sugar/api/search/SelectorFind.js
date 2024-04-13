"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.closest = exports.descendant = exports.child = exports.sibling = exports.ancestor = exports.first = void 0;
var ClosestOrAncestor_1 = require("../../impl/ClosestOrAncestor");
var PredicateFind = require("./PredicateFind");
var Selectors = require("./Selectors");
// TODO: An internal SelectorFilter module that doesn't SugarElement.fromDom() everything
var first = function (selector) {
    return Selectors.one(selector);
};
exports.first = first;
var ancestor = function (scope, selector, isRoot) {
    return PredicateFind.ancestor(scope, function (e) { return Selectors.is(e, selector); }, isRoot);
};
exports.ancestor = ancestor;
var sibling = function (scope, selector) {
    return PredicateFind.sibling(scope, function (e) { return Selectors.is(e, selector); });
};
exports.sibling = sibling;
var child = function (scope, selector) {
    return PredicateFind.child(scope, function (e) { return Selectors.is(e, selector); });
};
exports.child = child;
var descendant = function (scope, selector) {
    return Selectors.one(selector, scope);
};
exports.descendant = descendant;
// Returns Some(closest ancestor element (sugared)) matching 'selector' up to isRoot, or None() otherwise
var closest = function (scope, selector, isRoot) {
    var is = function (element, selector) { return Selectors.is(element, selector); };
    return (0, ClosestOrAncestor_1.default)(is, ancestor, scope, selector, isRoot);
};
exports.closest = closest;
//# sourceMappingURL=SelectorFind.js.map