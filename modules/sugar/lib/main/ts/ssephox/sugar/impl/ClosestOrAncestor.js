"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var katamari_1 = require("@ssephox/katamari");
exports.default = (function (is, ancestor, scope, a, isRoot) {
    if (is(scope, a)) {
        return katamari_1.Optional.some(scope);
    }
    else if (katamari_1.Type.isFunction(isRoot) && isRoot(scope)) {
        return katamari_1.Optional.none();
    }
    else {
        return ancestor(scope, a, isRoot);
    }
});
//# sourceMappingURL=ClosestOrAncestor.js.map