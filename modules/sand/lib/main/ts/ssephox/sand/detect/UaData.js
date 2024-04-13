"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectBrowser = void 0;
var katamari_1 = require("@ssephox/katamari");
var Version_1 = require("./Version");
var detectBrowser = function (browsers, userAgentData) {
    return katamari_1.Arr.findMap(userAgentData.brands, function (uaBrand) {
        var lcBrand = uaBrand.brand.toLowerCase();
        return katamari_1.Arr.find(browsers, function (browser) { var _a; return lcBrand === ((_a = browser.brand) === null || _a === void 0 ? void 0 : _a.toLowerCase()); }).map(function (info) { return ({
            current: info.name,
            version: Version_1.Version.nu(parseInt(uaBrand.version, 10), 0),
        }); });
    });
};
exports.detectBrowser = detectBrowser;
//# sourceMappingURL=UaData.js.map