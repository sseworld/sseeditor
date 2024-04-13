"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.descendants = exports.children = exports.siblings = exports.ancestors = exports.all = void 0;
var katamari_1 = require("@ssephox/katamari");
var SugarBody = require("../node/SugarBody");
var Traverse = require("./Traverse");
// maybe TraverseWith, similar to traverse but with a predicate?
var all = function (predicate) {
    return descendants(SugarBody.body(), predicate);
};
exports.all = all;
var ancestors = function (scope, predicate, isRoot) {
    return katamari_1.Arr.filter(Traverse.parents(scope, isRoot), predicate);
};
exports.ancestors = ancestors;
var siblings = function (scope, predicate) {
    return katamari_1.Arr.filter(Traverse.siblings(scope), predicate);
};
exports.siblings = siblings;
var children = function (scope, predicate) {
    return katamari_1.Arr.filter(Traverse.children(scope), predicate);
};
exports.children = children;
var descendants = function (scope, predicate) {
    var result = [];
    // Recurse.toArray() might help here
    katamari_1.Arr.each(Traverse.children(scope), function (x) {
        if (predicate(x)) {
            result = result.concat([x]);
        }
        result = result.concat(descendants(x, predicate));
    });
    return result;
};
exports.descendants = descendants;
//# sourceMappingURL=PredicateFilter.js.map