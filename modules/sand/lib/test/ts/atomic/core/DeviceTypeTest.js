"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bedrock_client_1 = require("@ephox/bedrock-client");
var katamari_1 = require("@ssephox/katamari");
var chai_1 = require("chai");
var PlatformDetection_1 = require("ssephox/sand/core/PlatformDetection");
(0, bedrock_client_1.describe)('DeviceTypeTest', function () {
    var getPlatform = function (userAgent) {
        return PlatformDetection_1.PlatformDetection.detect(userAgent, katamari_1.Optional.none(), katamari_1.Fun.never);
    };
    var checkTablet = function (expected, userAgent) {
        var platform = getPlatform(userAgent);
        chai_1.assert.equal(expected, platform.deviceType.isTablet(), 'Tablet incorrect: ' + userAgent);
    };
    var checkiPad = function (expected, userAgent) {
        var platform = getPlatform(userAgent);
        chai_1.assert.equal(expected, platform.deviceType.isiPad(), 'iPad incorrect: ' + userAgent);
    };
    var checkiPhone = function (expected, userAgent) {
        var platform = getPlatform(userAgent);
        chai_1.assert.equal(expected, platform.deviceType.isiPhone(), 'iPhone incorrect: ' + userAgent);
    };
    var checkIsWebView = function (expected, userAgent) {
        var platform = getPlatform(userAgent);
        chai_1.assert.equal(expected, platform.deviceType.isWebView(), 'WebView incorrect: ' + userAgent);
    };
    var checkDesktop = function (expected, userAgent) {
        var platform = getPlatform(userAgent);
        chai_1.assert.equal(expected, platform.deviceType.isDesktop(), 'desktop incorrect: ' + userAgent);
    };
    (0, bedrock_client_1.it)('iPad iOS10 wkWebview', function () {
        var userAgent = 'Mozilla/5.0 (iPad; CPU OS 10_0 like Mac OS X) AppleWebKit/602.1.40 (KHTML, like Gecko) Mobile/14A5309d';
        checkiPad(true, userAgent);
        checkiPhone(false, userAgent);
        checkTablet(true, userAgent);
        checkIsWebView(true, userAgent);
    });
    (0, bedrock_client_1.it)('iPad iOS10 Safari', function () {
        var userAgent = 'Mozilla/5.0 (iPad; CPU OS 10_0 like Mac OS X) AppleWebKit/602.1.40 (KHTML, like Gecko) Version/10.0 Mobile/14A5309d Safari/602.1';
        checkiPad(true, userAgent);
        checkiPhone(false, userAgent);
        checkTablet(true, userAgent);
        checkIsWebView(false, userAgent);
    });
    (0, bedrock_client_1.it)('iPad iOS 9 wkWebview ~ same UA as iPad Pro', function () {
        var userAgent = 'Mozilla/5.0 (iPad; CPU OS 9_3_2 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Mobile/13F69';
        checkiPad(true, userAgent);
        checkiPhone(false, userAgent);
        checkTablet(true, userAgent);
        checkIsWebView(true, userAgent);
    });
    (0, bedrock_client_1.it)('iPad iOS 9 Safari ~ same UA as iPad Pro', function () {
        var userAgent = 'Mozilla/5.0 (iPad; CPU OS 9_3_2 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13F69 Safari/601.1';
        checkiPad(true, userAgent);
        checkiPhone(false, userAgent);
        checkTablet(true, userAgent);
        checkIsWebView(false, userAgent);
    });
    (0, bedrock_client_1.it)('iPhone iOS 9 Safari', function () {
        var userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_3_3 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13G34 Safari/601.1';
        checkiPad(false, userAgent);
        checkiPhone(true, userAgent);
        checkTablet(false, userAgent);
        checkIsWebView(false, userAgent);
    });
    (0, bedrock_client_1.it)('iPhone iOS 13 Safari', function () {
        var userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.1 Mobile/15E148 Safari/604.1';
        checkiPad(false, userAgent);
        checkiPhone(true, userAgent);
        checkTablet(false, userAgent);
        checkIsWebView(false, userAgent);
        checkDesktop(false, userAgent);
    });
    (0, bedrock_client_1.it)('iPad iPadOS 13 Safari', function () {
        var userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.1 Safari/605.1.15';
        checkiPad(false, userAgent);
        checkiPhone(false, userAgent);
        checkTablet(false, userAgent);
        checkIsWebView(false, userAgent);
        checkDesktop(true, userAgent);
    });
});
//# sourceMappingURL=DeviceTypeTest.js.map