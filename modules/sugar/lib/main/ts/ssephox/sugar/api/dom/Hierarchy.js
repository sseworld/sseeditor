"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.follow = exports.path = void 0;
var katamari_1 = require("@ssephox/katamari");
var Traverse = require("../search/Traverse");
var Compare = require("./Compare");
/*
 * The exported functions in this module are:
 * a) path: Generates a list of child indices from the ancestor to the descendant
 * b) follow: Follows a path of child indices from an ancestor to reach a descendant
 */
var up = function (descendant, stopper) {
    if (stopper(descendant)) {
        return katamari_1.Optional.some([]);
    }
    else {
        return Traverse.parent(descendant).bind(function (parent) {
            return Traverse.findIndex(descendant).bind(function (index) { return up(parent, stopper)
                .map(function (rest) { return rest.concat([index]); }); });
        });
    }
};
var path = function (ancestor, descendant) {
    var stopper = katamari_1.Fun.curry(Compare.eq, ancestor);
    return Compare.eq(ancestor, descendant) ? katamari_1.Optional.some([]) : up(descendant, stopper);
};
exports.path = path;
var follow = function (ancestor, descendantPath) {
    if (descendantPath.length === 0) {
        return katamari_1.Optional.some(ancestor);
    }
    else {
        return Traverse.child(ancestor, descendantPath[0]).bind(function (child) { return follow(child, descendantPath.slice(1)); });
    }
};
exports.follow = follow;
//# sourceMappingURL=Hierarchy.js.map