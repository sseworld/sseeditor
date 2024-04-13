"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectOs = exports.detectBrowser = void 0;
var katamari_1 = require("@ssephox/katamari");
var Version_1 = require("./Version");
var detect = function (candidates, userAgent) {
    var agent = String(userAgent).toLowerCase();
    return katamari_1.Arr.find(candidates, function (candidate) {
        return candidate.search(agent);
    });
};
// They (browser and os) are the same at the moment, but they might
// not stay that way.
var detectBrowser = function (browsers, userAgent) {
    return detect(browsers, userAgent).map(function (browser) {
        var version = Version_1.Version.detect(browser.versionRegexes, userAgent);
        return {
            current: browser.name,
            version: version,
        };
    });
};
exports.detectBrowser = detectBrowser;
var detectOs = function (oses, userAgent) {
    return detect(oses, userAgent).map(function (os) {
        var version = Version_1.Version.detect(os.versionRegexes, userAgent);
        return {
            current: os.name,
            version: version,
        };
    });
};
exports.detectOs = detectOs;
//# sourceMappingURL=UaString.js.map