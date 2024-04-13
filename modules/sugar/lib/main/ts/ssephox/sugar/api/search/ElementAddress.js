"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.descendantsInAncestor = exports.selectorsInParent = exports.indexInParent = exports.indexOf = exports.childOf = void 0;
var katamari_1 = require("@ssephox/katamari");
var Compare = require("../dom/Compare");
var PredicateFind = require("./PredicateFind");
var SelectorFilter = require("./SelectorFilter");
var SelectorFind = require("./SelectorFind");
var Traverse = require("./Traverse");
var inAncestor = function (ancestor, descendants, element, index) { return ({
    ancestor: ancestor,
    descendants: descendants,
    element: element,
    index: index
}); };
var inParent = function (parent, children, element, index) { return ({
    parent: parent,
    children: children,
    element: element,
    index: index
}); };
var childOf = function (element, ancestor) {
    return PredicateFind.closest(element, function (elem) {
        return Traverse.parent(elem).exists(function (parent) { return Compare.eq(parent, ancestor); });
    });
};
exports.childOf = childOf;
var indexInParent = function (element) {
    return Traverse.parent(element).bind(function (parent) {
        var children = Traverse.children(parent);
        return indexOf(children, element).map(function (index) { return inParent(parent, children, element, index); });
    });
};
exports.indexInParent = indexInParent;
var indexOf = function (elements, element) {
    return katamari_1.Arr.findIndex(elements, katamari_1.Fun.curry(Compare.eq, element));
};
exports.indexOf = indexOf;
var selectorsInParent = function (element, selector) {
    return Traverse.parent(element).bind(function (parent) {
        var children = SelectorFilter.children(parent, selector);
        return indexOf(children, element).map(function (index) { return inParent(parent, children, element, index); });
    });
};
exports.selectorsInParent = selectorsInParent;
var descendantsInAncestor = function (element, ancestorSelector, descendantSelector) {
    return SelectorFind.closest(element, ancestorSelector).bind(function (ancestor) {
        var descendants = SelectorFilter.descendants(ancestor, descendantSelector);
        return indexOf(descendants, element).map(function (index) { return inAncestor(ancestor, descendants, element, index); });
    });
};
exports.descendantsInAncestor = descendantsInAncestor;
//# sourceMappingURL=ElementAddress.js.map