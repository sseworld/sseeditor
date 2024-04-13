"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.closest = exports.ancestor = void 0;
var katamari_1 = require("@ssephox/katamari");
var SugarElement_1 = require("../node/SugarElement");
var ensureIsRoot = function (isRoot) { return katamari_1.Type.isFunction(isRoot) ? isRoot : katamari_1.Fun.never; };
var ancestor = function (scope, transform, isRoot) {
    var element = scope.dom;
    var stop = ensureIsRoot(isRoot);
    while (element.parentNode) {
        element = element.parentNode;
        var el = SugarElement_1.SugarElement.fromDom(element);
        var transformed = transform(el);
        if (transformed.isSome()) {
            return transformed;
        }
        else if (stop(el)) {
            break;
        }
    }
    return katamari_1.Optional.none();
};
exports.ancestor = ancestor;
var closest = function (scope, transform, isRoot) {
    var current = transform(scope);
    var stop = ensureIsRoot(isRoot);
    return current.orThunk(function () { return stop(scope) ? katamari_1.Optional.none() : ancestor(scope, transform, stop); });
};
exports.closest = closest;
//# sourceMappingURL=TransformFind.js.map