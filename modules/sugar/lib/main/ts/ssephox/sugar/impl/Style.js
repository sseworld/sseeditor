"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSupported = void 0;
var katamari_1 = require("@ssephox/katamari");
// some elements, such as mathml, don't have style attributes
// others, such as angular elements, have style attributes that aren't a CSSStyleDeclaration
var isSupported = function (dom) {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    return dom.style !== undefined && katamari_1.Type.isFunction(dom.style.getPropertyValue);
};
exports.isSupported = isSupported;
//# sourceMappingURL=Style.js.map