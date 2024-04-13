"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Browser = void 0;
var katamari_1 = require("@ssephox/katamari");
var Version_1 = require("../detect/Version");
var edge = "Edge";
var chromium = "Chromium";
var ie = "IE";
var opera = "Opera";
var firefox = "Firefox";
var safari = "Safari";
var unknown = function () {
    return nu({
        current: undefined,
        version: Version_1.Version.unknown(),
    });
};
var nu = function (info) {
    var current = info.current;
    var version = info.version;
    var isBrowser = function (name) { return function () { return current === name; }; };
    return {
        current: current,
        version: version,
        isEdge: isBrowser(edge),
        isChromium: isBrowser(chromium),
        // NOTE: isIe just looks too weird
        isIE: isBrowser(ie),
        isOpera: isBrowser(opera),
        isFirefox: isBrowser(firefox),
        isSafari: isBrowser(safari),
    };
};
exports.Browser = {
    unknown: unknown,
    nu: nu,
    edge: katamari_1.Fun.constant(edge),
    chromium: katamari_1.Fun.constant(chromium),
    ie: katamari_1.Fun.constant(ie),
    opera: katamari_1.Fun.constant(opera),
    firefox: katamari_1.Fun.constant(firefox),
    safari: katamari_1.Fun.constant(safari),
};
//# sourceMappingURL=Browser.js.map