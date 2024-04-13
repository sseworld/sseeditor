"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSafari = exports.isIE = exports.isIE11 = exports.isOpera = exports.isFirefox = exports.isChromium = exports.isEdge = void 0;
var isEdge = function (platform) {
    return platform.browser.isEdge();
};
exports.isEdge = isEdge;
var isChromium = function (platform) {
    return platform.browser.isChromium();
};
exports.isChromium = isChromium;
var isFirefox = function (platform) {
    return platform.browser.isFirefox();
};
exports.isFirefox = isFirefox;
var isIE11 = function (platform) {
    return isIE(platform) && platform.browser.version.major === 11;
};
exports.isIE11 = isIE11;
var isIE = function (platform) {
    return platform.browser.isIE();
};
exports.isIE = isIE;
var isSafari = function (platform) {
    return platform.browser.isSafari();
};
exports.isSafari = isSafari;
var isOpera = function (platform) {
    return platform.browser.isOpera();
};
exports.isOpera = isOpera;
//# sourceMappingURL=PlatformQuery.js.map