"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.closest = exports.descendant = exports.child = exports.sibling = exports.ancestor = exports.any = void 0;
var SelectorFind = require("./SelectorFind");
var any = function (selector) {
    return SelectorFind.first(selector).isSome();
};
exports.any = any;
var ancestor = function (scope, selector, isRoot) {
    return SelectorFind.ancestor(scope, selector, isRoot).isSome();
};
exports.ancestor = ancestor;
var sibling = function (scope, selector) {
    return SelectorFind.sibling(scope, selector).isSome();
};
exports.sibling = sibling;
var child = function (scope, selector) {
    return SelectorFind.child(scope, selector).isSome();
};
exports.child = child;
var descendant = function (scope, selector) {
    return SelectorFind.descendant(scope, selector).isSome();
};
exports.descendant = descendant;
var closest = function (scope, selector, isRoot) {
    return SelectorFind.closest(scope, selector, isRoot).isSome();
};
exports.closest = closest;
//# sourceMappingURL=SelectorExists.js.map