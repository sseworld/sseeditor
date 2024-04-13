"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.override = exports.detect = void 0;
var katamari_1 = require("@ssephox/katamari");
var PlatformDetection_1 = require("../core/PlatformDetection");
var mediaMatch = function (query) { return window.matchMedia(query).matches; };
// IMPORTANT: Must be in a thunk, otherwise rollup thinks calling this immediately
// causes side effects and won't tree shake this away
// Note: navigator.userAgentData is not part of the native typescript types yet
var platform = katamari_1.Thunk.cached(function () { return PlatformDetection_1.PlatformDetection.detect(navigator.userAgent, katamari_1.Optional.from((navigator.userAgentData)), mediaMatch); });
var detect = function () { return platform(); };
exports.detect = detect;
var override = function (overrides) {
    platform = katamari_1.Fun.constant(__assign(__assign({}, (0, exports.detect)()), overrides));
};
exports.override = override;
//# sourceMappingURL=PlatformDetection.js.map