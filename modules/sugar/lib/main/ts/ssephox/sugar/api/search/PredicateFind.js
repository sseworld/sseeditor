"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
exports.descendant = exports.child = exports.sibling = exports.closest = exports.ancestor = exports.first = void 0;
var katamari_1 = require("@ssephox/katamari");
var ClosestOrAncestor_1 = require("../../impl/ClosestOrAncestor");
var Compare = require("../dom/Compare");
var SugarBody = require("../node/SugarBody");
var SugarElement_1 = require("../node/SugarElement");
var first = function (predicate) {
    return descendant(SugarBody.body(), predicate);
};
exports.first = first;
var ancestor = function (scope, predicate, isRoot) {
    var element = scope.dom;
    var stop = katamari_1.Type.isFunction(isRoot) ? isRoot : katamari_1.Fun.never;
    while (element.parentNode) {
        element = element.parentNode;
        var el = SugarElement_1.SugarElement.fromDom(element);
        if (predicate(el)) {
            return katamari_1.Optional.some(el);
        }
        else if (stop(el)) {
            break;
        }
    }
    return katamari_1.Optional.none();
};
exports.ancestor = ancestor;
var closest = function (scope, predicate, isRoot) {
    // This is required to avoid ClosestOrAncestor passing the predicate to itself
    var is = function (s, test) { return test(s); };
    return (0, ClosestOrAncestor_1.default)(is, ancestor, scope, predicate, isRoot);
};
exports.closest = closest;
var sibling = function (scope, predicate) {
    var element = scope.dom;
    if (!element.parentNode) {
        return katamari_1.Optional.none();
    }
    return child(SugarElement_1.SugarElement.fromDom(element.parentNode), function (x) { return !Compare.eq(scope, x) && predicate(x); });
};
exports.sibling = sibling;
var child = function (scope, predicate) {
    var pred = function (node) { return predicate(SugarElement_1.SugarElement.fromDom(node)); };
    var result = katamari_1.Arr.find(scope.dom.childNodes, pred);
    return result.map(SugarElement_1.SugarElement.fromDom);
};
exports.child = child;
var descendant = function (scope, predicate) {
    var descend = function (node) {
        // tslint:disable-next-line:prefer-for-of
        for (var i = 0; i < node.childNodes.length; i++) {
            var child_1 = SugarElement_1.SugarElement.fromDom(node.childNodes[i]);
            if (predicate(child_1)) {
                return katamari_1.Optional.some(child_1);
            }
            var res = descend(node.childNodes[i]);
            if (res.isSome()) {
                return res;
            }
        }
        return katamari_1.Optional.none();
    };
    return descend(scope.dom);
};
exports.descendant = descendant;
//# sourceMappingURL=PredicateFind.js.map