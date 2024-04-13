"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlatformDetection = void 0;
var DeviceType_1 = require("../detect/DeviceType");
var UaData = require("../detect/UaData");
var UaString = require("../detect/UaString");
var PlatformInfo_1 = require("../info/PlatformInfo");
var Browser_1 = require("./Browser");
var OperatingSystem_1 = require("./OperatingSystem");
var detect = function (userAgent, userAgentDataOpt, mediaMatch) {
    var browsers = PlatformInfo_1.PlatformInfo.browsers();
    var oses = PlatformInfo_1.PlatformInfo.oses();
    var browser = userAgentDataOpt
        .bind(function (userAgentData) { return UaData.detectBrowser(browsers, userAgentData); })
        .orThunk(function () { return UaString.detectBrowser(browsers, userAgent); })
        .fold(Browser_1.Browser.unknown, Browser_1.Browser.nu);
    var os = UaString.detectOs(oses, userAgent).fold(OperatingSystem_1.OperatingSystem.unknown, OperatingSystem_1.OperatingSystem.nu);
    var deviceType = (0, DeviceType_1.DeviceType)(os, browser, userAgent, mediaMatch);
    return {
        browser: browser,
        os: os,
        deviceType: deviceType,
    };
};
exports.PlatformDetection = {
    detect: detect,
};
//# sourceMappingURL=PlatformDetection.js.map