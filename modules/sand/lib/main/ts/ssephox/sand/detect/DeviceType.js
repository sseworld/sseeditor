"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceType = void 0;
var katamari_1 = require("@ssephox/katamari");
var DeviceType = function (os, browser, userAgent, mediaMatch) {
    var isiPad = os.isiOS() && /ipad/i.test(userAgent) === true;
    var isiPhone = os.isiOS() && !isiPad;
    var isMobile = os.isiOS() || os.isAndroid();
    var isTouch = isMobile || mediaMatch("(pointer:coarse)");
    var isTablet = isiPad || (!isiPhone && isMobile && mediaMatch("(min-device-width:768px)"));
    var isPhone = isiPhone || (isMobile && !isTablet);
    var iOSwebview = browser.isSafari() && os.isiOS() && /safari/i.test(userAgent) === false;
    var isDesktop = !isPhone && !isTablet && !iOSwebview;
    return {
        isiPad: katamari_1.Fun.constant(isiPad),
        isiPhone: katamari_1.Fun.constant(isiPhone),
        isTablet: katamari_1.Fun.constant(isTablet),
        isPhone: katamari_1.Fun.constant(isPhone),
        isTouch: katamari_1.Fun.constant(isTouch),
        isAndroid: os.isAndroid,
        isiOS: os.isiOS,
        isWebView: katamari_1.Fun.constant(iOSwebview),
        isDesktop: katamari_1.Fun.constant(isDesktop),
    };
};
exports.DeviceType = DeviceType;
//# sourceMappingURL=DeviceType.js.map