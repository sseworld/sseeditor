"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.descendants = exports.children = exports.siblings = exports.ancestors = exports.all = void 0;
var PredicateFilter = require("./PredicateFilter");
var Selectors = require("./Selectors");
var all = function (selector) {
    return Selectors.all(selector);
};
exports.all = all;
// For all of the following:
//
// jQuery does siblings of firstChild. IE9+ supports scope.dom.children (similar to Traverse.children but elements only).
// Traverse should also do this (but probably not by default).
//
var ancestors = function (scope, selector, isRoot) {
    // It may surprise you to learn this is exactly what JQuery does
    // TODO: Avoid all this wrapping and unwrapping
    return PredicateFilter.ancestors(scope, function (e) { return Selectors.is(e, selector); }, isRoot);
};
exports.ancestors = ancestors;
var siblings = function (scope, selector) {
    // It may surprise you to learn this is exactly what JQuery does
    // TODO: Avoid all the wrapping and unwrapping
    return PredicateFilter.siblings(scope, function (e) { return Selectors.is(e, selector); });
};
exports.siblings = siblings;
var children = function (scope, selector) {
    // It may surprise you to learn this is exactly what JQuery does
    // TODO: Avoid all the wrapping and unwrapping
    return PredicateFilter.children(scope, function (e) { return Selectors.is(e, selector); });
};
exports.children = children;
var descendants = function (scope, selector) {
    return Selectors.all(selector, scope);
};
exports.descendants = descendants;
//# sourceMappingURL=SelectorFilter.js.map