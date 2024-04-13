"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.last = exports.first = void 0;
var katamari_1 = require("@ssephox/katamari");
var PredicateFind = require("../search/PredicateFind");
var Traverse = require("../search/Traverse");
var Awareness = require("./Awareness");
var first = function (element) {
    return PredicateFind.descendant(element, Awareness.isCursorPosition);
};
exports.first = first;
var last = function (element) {
    return descendantRtl(element, Awareness.isCursorPosition);
};
exports.last = last;
// Note, sugar probably needs some RTL traversals.
var descendantRtl = function (scope, predicate) {
    var descend = function (element) {
        var children = Traverse.children(element);
        for (var i = children.length - 1; i >= 0; i--) {
            var child = children[i];
            if (predicate(child)) {
                return katamari_1.Optional.some(child);
            }
            var res = descend(child);
            if (res.isSome()) {
                return res;
            }
        }
        return katamari_1.Optional.none();
    };
    return descend(scope);
};
//# sourceMappingURL=CursorPosition.js.map