"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrDie = void 0;
var katamari_1 = require("@ssephox/katamari");
var unsafe = function (name, scope) {
    return katamari_1.Resolve.resolve(name, scope);
};
var getOrDie = function (name, scope) {
    var actual = unsafe(name, scope);
    if (actual === undefined || actual === null) {
        throw new Error(name + " not available on this browser");
    }
    return actual;
};
exports.getOrDie = getOrDie;
//# sourceMappingURL=Global.js.map