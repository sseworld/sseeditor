"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPrototypeOf = void 0;
var katamari_1 = require("@ssephox/katamari");
var Global = require("../util/Global");
var getPrototypeOf = Object.getPrototypeOf;
/*
 * IE9 and above
 *
 * MDN no use on this one, but here's the link anyway:
 * https://developer.mozilla.org/en/docs/Web/API/HTMLElement
 */
var sandHTMLElement = function (scope) {
    return Global.getOrDie("HTMLElement", scope);
};
var isPrototypeOf = function (x) {
    // use Resolve to get the window object for x and just return undefined if it can't find it.
    // undefined scope later triggers using the global window.
    var scope = katamari_1.Resolve.resolve("ownerDocument.defaultView", x);
    // TINY-7374: We can't rely on looking at the owner window HTMLElement as the element may have
    // been constructed in a different window and then appended to the current window document.
    return (katamari_1.Type.isObject(x) &&
        (sandHTMLElement(scope).prototype.isPrototypeOf(x) ||
            /^HTML\w*Element$/.test(getPrototypeOf(x).constructor.name)));
};
exports.isPrototypeOf = isPrototypeOf;
//# sourceMappingURL=SandHTMLElement.js.map