"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSmallAndroid = exports.isLargeDesktop = exports.isSmallTouch = exports.isLargeTouch = exports.isLarge = exports.choice = exports.isTouch = void 0;
var katamari_1 = require("@ssephox/katamari");
var sand_1 = require("@ssephox/sand");
var platform = sand_1.PlatformDetection.detect();
var isTouch = platform.deviceType.isTouch;
exports.isTouch = isTouch;
var isAndroid = platform.deviceType.isAndroid;
// TODO: Work out what these values are supposed to be.
var MINIMUM_LARGE_WIDTH = 620;
var MINIMUM_LARGE_HEIGHT = 700;
// window.screen.width and window.screen.height do not change with the orientation,
// however window.screen.availableWidth and window.screen.availableHeight,
// do change according to the orientation.
var isOfSize = function (width, height) {
    return window.screen.width >= width && window.screen.height >= height;
};
var choice = function (options, fallback) {
    var target = katamari_1.Arr.foldl(options, function (b, option) { return b.orThunk(function () {
        return option.predicate() ? katamari_1.Optional.some(option.value()) : katamari_1.Optional.none();
    }); }, katamari_1.Optional.none());
    return target.getOr(fallback);
};
exports.choice = choice;
var isLargeTouch = function () {
    return isOfSize(MINIMUM_LARGE_WIDTH, MINIMUM_LARGE_HEIGHT) && isTouch();
};
exports.isLargeTouch = isLargeTouch;
var isLargeDesktop = function () {
    return isOfSize(MINIMUM_LARGE_WIDTH, MINIMUM_LARGE_HEIGHT) && !isTouch();
};
exports.isLargeDesktop = isLargeDesktop;
var isSmallTouch = function () {
    return !isOfSize(MINIMUM_LARGE_WIDTH, MINIMUM_LARGE_HEIGHT) && isTouch();
};
exports.isSmallTouch = isSmallTouch;
var isLarge = function () {
    return isOfSize(MINIMUM_LARGE_WIDTH, MINIMUM_LARGE_HEIGHT);
};
exports.isLarge = isLarge;
var isSmallAndroid = function () {
    return isSmallTouch() && isAndroid();
};
exports.isSmallAndroid = isSmallAndroid;
//# sourceMappingURL=Platform.js.map